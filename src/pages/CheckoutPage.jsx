import { useState, useEffect, useMemo } from 'react';
import API_BASE from '../config/api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_dummy');

// Self-correcting API base URL to prevent browser cache/environment mismatch
let resolvedApiBase = API_BASE || '';
if (resolvedApiBase.endsWith('/')) {
  resolvedApiBase = resolvedApiBase.slice(0, -1);
}
if (resolvedApiBase.startsWith('http') && !resolvedApiBase.endsWith('/api') && !resolvedApiBase.includes('/api/')) {
  resolvedApiBase = `${resolvedApiBase}/api`;
}


const Input = ({ label, id, value, onChange, placeholder, type = 'text', autoComplete }) => (
  <div className="form-group">
    <label className="form-label" htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="form-input"
      required
      autoComplete={autoComplete}
    />
  </div>
);

// This sub-component must live inside the Elements provider to use stripe hooks
function CheckoutPaymentModal({ form, totalAmount, onCancel, orderData, clearCart, navigate, isProcessing, setIsProcessing }) {
  const { t } = useLanguage();
  const c = t.checkout || {};
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState('');

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMsg('');
    const token = localStorage.getItem('token');

    try {
      // Confirm the PaymentElement
      const paymentResult = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-summary`,
          payment_method_data: {
            billing_details: {
              name: form.name,
              email: form.email,
              phone: form.phone,
            }
          }
        },
        redirect: 'if_required' // Process in-line without full page reload where possible
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (paymentResult.paymentIntent.status !== 'succeeded') {
        throw new Error('Payment was not completed successfully.');
      }

      // Confirm Order details in MongoDB backend
      const resVerify = await fetch(`${resolvedApiBase}/orders/confirm-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          paymentIntentId: paymentResult.paymentIntent.id,
          ...orderData
        })
      });

      if (!resVerify.ok) {
        if (resVerify.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error(c.sessionExpired || 'Session expired. Please log in again.');
          onCancel();
          navigate('/account?redirect=/checkout');
          return;
        }
        throw new Error('Payment verification on server failed');
      }
      const verifiedOrder = await resVerify.json();

      const localOrder = {
        orderNum: verifiedOrder.trackingNumber || verifiedOrder._id,
        customer: form,
        items: orderData.items,
        subtotal: orderData.totalAmount - 4.90, // Shipping is 4.90
        total: orderData.totalAmount,
        date: new Date().toISOString()
      };
      localStorage.setItem('sto_last_order', JSON.stringify(localOrder));
      clearCart();
      onCancel();
      navigate('/order-summary');

    } catch (err) {
      toast.error(err.message);
      setErrorMsg(err.message || 'Payment failed. Please try again.');
      onCancel();
      navigate(`/payment-failed?error=${encodeURIComponent(err.message || 'Transaction was declined')}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleConfirmPayment}>
      {/* Error alert banner for failed/declined transactions */}
      {errorMsg && (
        <div style={{
          background: '#FFF5F5',
          border: '1px solid #FEB2B2',
          color: '#C53030',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 500,
          marginBottom: '20px',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          boxShadow: '0 2px 8px rgba(197, 48, 48, 0.08)'
        }}>
          <span style={{ fontSize: '16px', lineHeight: '1' }}>⚠️</span>
          <div style={{ flex: 1, lineHeight: '1.4' }}>
            <strong>Your payment failed:</strong> {errorMsg} Please check your card details or try a different card.
          </div>
        </div>
      )}

      {/* Dynamic Payment Element supporting Apple Pay, Google Pay, Cards, Klarna, local transfers, etc. */}
      <div style={{ marginBottom: '28px', textAlign: 'left' }}>
        <label className="form-label" style={{ fontSize: '11px', fontWeight: 600, color: '#0F2F24', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Select Payment Method
        </label>
        <div style={styles.modalStripeCardContainer}>
          <PaymentElement options={{ layout: 'tabs' }} />
        </div>
      </div>

      {/* Action Button */}
      <button 
        type="submit" 
        disabled={isProcessing || !stripe} 
        className="btn btn-primary" 
        style={{ width: '100%', padding: '16px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '52px', border: 'none', background: '#0F2F24', color: '#fff', cursor: 'pointer', borderRadius: '8px' }}
      >
        {isProcessing ? (
          <>
            <span style={styles.spinner}></span>
            Processing Secure Payment...
          </>
        ) : (
          <>
            <Lock size={15} />
            Pay €{totalAmount.toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
}

function CheckoutPageContent() {
  const { language, t } = useLanguage();
  const c = t.checkout || {};
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = 4.90;

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('sto_shipping_info');
    if (saved) return JSON.parse(saved);
    return { email: '', name: '', address: '', city: 'Vantaa', postal: '01300', country: c.countries?.[0] || 'Finland', phone: '' };
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const elementsOptions = useMemo(() => ({
    clientSecret,
    locale: language === 'fi' ? 'fi' : 'en'
  }), [clientSecret, language]);

  const set = (k, v) => {
    setForm(f => {
      const newForm = { ...f, [k]: v };
      localStorage.setItem('sto_shipping_info', JSON.stringify(newForm));
      return newForm;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/account?redirect=/checkout');
    }
  }, [navigate]);

  // Submit shipping form, call API to create PaymentIntent, then launch popup Elements modal
  const handleOpenPaymentModal = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error(c.loginToPlace || 'Please log in to place an order.');
      navigate('/account?redirect=/checkout');
      return;
    }

    setIsCreatingIntent(true);
    const totalAmount = subtotal + shipping;

    try {
      const resOrder = await fetch(`${resolvedApiBase}/orders/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: totalAmount })
      });

      if (!resOrder.ok) {
        if (resOrder.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error(c.sessionExpired || 'Session expired. Please log in again to place an order.');
          navigate('/account?redirect=/checkout');
          return;
        }
        throw new Error('Failed to start secure payment session.');
      }
      const data = await resOrder.json();
      setClientSecret(data.clientSecret);
      setShowPaymentModal(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsCreatingIntent(false);
    }
  };

  return (
    <main style={{ paddingTop: '80px', background: '#FAFAF8', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Inject custom spin animation dynamically */}
      <style>{`
        @keyframes modal-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* ── Checkout responsive layout ────────────────────── */
        .res-grid-checkout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 64px;
          align-items: start;
        }
        .city-postal-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .checkout-summary-sticky {
          position: sticky;
          top: 100px;
        }

        @media (max-width: 1100px) {
          .res-grid-checkout {
            grid-template-columns: 1fr 340px;
            gap: 40px;
          }
        }

        @media (max-width: 860px) {
          .res-grid-checkout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .checkout-summary-sticky {
            position: relative;
            top: 0;
            order: -1; /* show summary first on mobile */
          }
        }

        @media (max-width: 480px) {
          .city-postal-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .res-grid-checkout {
            gap: 28px;
          }
          .checkout-pay-card-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 8px;
          }
        }

        /* ── Payment modal mobile fix ───────────────────────── */
        .checkout-modal-inner {
          background: #ffffff;
          border-radius: 24px;
          padding: 36px 40px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 24px 60px rgba(15, 47, 36, 0.16);
          border: 1px solid #eae7e1;
          position: relative;
          overflow-y: auto;
          max-height: 90vh;
        }
        @media (max-width: 600px) {
          .checkout-modal-inner {
            padding: 28px 20px 32px;
            border-radius: 20px 20px 0 0;
            max-height: 92vh;
            margin-bottom: 0;
          }
          .checkout-modal-backdrop {
            align-items: flex-end !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="container" style={{ maxWidth: '1100px', paddingTop: '48px' }}>
        <header style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={styles.title}>{c.title}</h1>
          <p style={styles.sub}>{c.sub}</p>
        </header>

        <div className="res-grid-checkout">
          {/* Left: Shipping Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleOpenPaymentModal}>
              {/* Contact */}
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>{c.contact}</h2>
              </div>
              <Input label={c.email} id="email" value={form.email} onChange={v => set('email', v)} placeholder="you@example.com" type="email" autoComplete="email" />
              <Input label={c.phone || 'Mobile Number'} id="phone" value={form.phone} onChange={v => set('phone', v)} placeholder="+358 00 000 0000" type="tel" autoComplete="tel" />

              {/* Shipping */}
              <div style={{ ...styles.sectionHeader, marginTop: '32px' }}>
                <h2 style={styles.sectionTitle}>{c.shipping}</h2>
              </div>
              <Input label={c.name} id="name" value={form.name} onChange={v => set('name', v)} placeholder={c.name} autoComplete="name" />
              <Input label={c.address} id="address" value={form.address} onChange={v => set('address', v)} placeholder={c.address} autoComplete="street-address" />
              <div className="city-postal-row">
                <Input label={c.city} id="city" value={form.city} onChange={v => set('city', v)} placeholder={c.city} autoComplete="address-level2" />
                <Input label={c.postal} id="postal" value={form.postal} onChange={v => set('postal', v)} placeholder="00000" autoComplete="postal-code" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="country">{c.country}</label>
                <select id="country" className="form-input" value={form.country} onChange={e => set('country', e.target.value)}>
                  {(c.countries || ['Finland', 'Sweden', 'Norway']).map(country => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>

              {/* Payment Preview Box */}
              <div style={{ ...styles.sectionHeader, marginTop: '32px' }}>
                <h2 style={styles.sectionTitle}>{c.payment}</h2>
              </div>
              <div style={styles.payCard}>
                <div style={styles.payCardHeader} className="checkout-pay-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CreditCard size={22} style={{ color: '#0F2F24' }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '16px', fontWeight: 700, color: '#0F2F24' }}>
                      Stripe Secure Payment
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', background: '#0F2F24', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontWeight: 600, whiteSpace: 'nowrap' }}>Secure Popup</span>
                </div>
                <div style={{ fontSize: '14px', color: '#6b6b6b', lineHeight: '1.5', margin: '4px 0' }}>
                  Clicking <strong>{c.place || 'COMPLETE PURCHASE'}</strong> will open a secure card checkout dialog popup to complete the transaction.
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }} 
                type="submit" 
                disabled={isCreatingIntent}
                className="btn btn-primary" 
                style={{ width: '100%', padding: '18px', fontSize: '16px', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                {isCreatingIntent ? (
                  <>
                    <span style={styles.spinner}></span>
                    Initializing Secure Checkout...
                  </>
                ) : (
                  c.place || 'COMPLETE PURCHASE'
                )}
              </motion.button>

              <div style={styles.secureTitleBox}>
                <Lock size={20} style={{ color: '#0F2F24', strokeWidth: 2.5 }} />
                <span>{c.secure || 'Secure SSL Encrypted Checkout'}</span>
              </div>

              <div style={styles.secureDescBox}>
                <p style={styles.secureDesc}>
                  {c.secureDesc && c.secureDesc.includes('.') ? (
                    <>
                      {c.secureDesc.substring(0, c.secureDesc.indexOf('.') + 1)}
                      <span style={{ display: 'block', marginTop: '12px' }}>
                        {c.secureDesc.substring(c.secureDesc.indexOf('.') + 1).trim()}
                      </span>
                    </>
                  ) : (
                    c.secureDesc || 'Your payment details are protected with bank-grade security protocols.'
                  )}
                </p>
              </div>
            </form>
          </motion.div>

          {/* Right: Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="checkout-summary-sticky">
            <div style={styles.summary}>
              <h2 style={styles.summaryTitle}>{c.summary || 'Order Summary'}</h2>

              <div style={styles.summaryItems}>
                {items.map((item, idx) => (
                  <div key={`${item.id || item._id}-${idx}`} style={styles.summaryItem}>
                    <div style={styles.summaryImg}>
                      <img src={item.image || 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=200&q=80'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={styles.productQty}>{item.qty}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={styles.summaryItemName}>{item.translations?.[language]?.name || item.name}</div>
                    </div>
                    <div style={styles.summaryItemPrice}>€{(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div style={styles.divider} />

              <div style={styles.summaryRow}><span>{c.subtotal || 'Subtotal'}</span><span>€{subtotal.toFixed(2)}</span></div>
              <div style={styles.summaryRow}><span>{c.shippingFee || 'Shipping'}</span><span>€{shipping.toFixed(2)}</span></div>
              <div style={styles.divider} />
              <div style={{ ...styles.summaryRow, ...styles.totalRow }}><span>{t.cart?.total || 'Total'}</span><span>€{(subtotal + shipping).toFixed(2)}</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stripe Payment Modal Pop-up (Dynamic Elements Overlay) */}
      <AnimatePresence>
        {showPaymentModal && clientSecret && (
          <div style={styles.modalBackdrop} className="checkout-modal-backdrop">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="checkout-modal-inner"
            >
              {/* Close button */}
              <button 
                type="button" 
                onClick={() => !isProcessing && setShowPaymentModal(false)} 
                style={styles.closeBtn}
                disabled={isProcessing}
              >
                ✕
              </button>

              {/* Modal Header */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(123,170,141,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <Lock size={22} style={{ color: '#7BAA8D' }} />
                </div>
                <h3 style={styles.modalTitle}>Stripe Secure Checkout</h3>
                <p style={{ fontSize: '13px', color: '#9a9a9a', marginTop: '4px' }}>SAANA TUOTANTO OY</p>
              </div>

              {/* Total Summary */}
              <div style={styles.modalTotalBox}>
                <span style={{ fontSize: '13px', color: '#6b6b6b', fontWeight: 500 }}>Amount to Pay</span>
                <span style={{ fontSize: '24px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: '#0F2F24' }}>
                  €{(subtotal + shipping).toFixed(2)}
                </span>
              </div>

              {/* Secure Elements Wrap for Dynamic Payment Options */}
              <Elements stripe={stripePromise} options={elementsOptions}>
                <CheckoutPaymentModal 
                  form={form} 
                  totalAmount={subtotal + shipping} 
                  onCancel={() => setShowPaymentModal(false)}
                  orderData={{
                    items: items.map(item => ({
                      product: item.id || item._id,
                      name: item.name,
                      quantity: item.qty,
                      price: item.price,
                      image: item.image
                    })),
                    totalAmount: subtotal + shipping,
                    shippingAddress: {
                      fullName: form.name,
                      address: form.address,
                      city: form.city,
                      postalCode: form.postal,
                      country: form.country,
                      phone: form.phone
                    }
                  }}
                  clearCart={clearCart}
                  navigate={navigate}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </Elements>

              <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '11px', color: '#9a9a9a', lineHeight: '1.4' }}>
                🔒 Secured by 256-bit encryption. All transactions are fully private.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutPageContent />
  );
}

const styles = {
  title: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#0F2F24', fontWeight: 300, marginBottom: '8px' },
  sub: { fontSize: '16px', color: '#9a9a9a', marginBottom: '48px' },
  sectionHeader: { marginBottom: '24px' },
  sectionTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', color: '#0F2F24', fontWeight: 400 },
  payCard: { background: '#F3F0EA', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' },
  payCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  secureTitleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '24px',
    padding: '16px 24px',
    background: 'rgba(123, 170, 141, 0.08)',
    border: '1.5px dashed rgba(123, 170, 141, 0.6)',
    borderRadius: '16px',
    textAlign: 'center',
    maxWidth: '100%',
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    fontWeight: '700',
    color: '#0F2F24',
    letterSpacing: '0.01em',
    lineHeight: '1.4',
    transition: 'all 0.3s ease'
  },
  secureDescBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '12px',
    padding: '20px 24px',
    background: 'rgba(123, 170, 141, 0.08)',
    border: '1.5px dashed rgba(123, 170, 141, 0.6)',
    borderRadius: '16px',
    textAlign: 'center',
    maxWidth: '100%',
    transition: 'all 0.3s ease'
  },
  secureDesc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    fontWeight: '500',
    color: '#0F2F24',
    textAlign: 'center',
    maxWidth: '640px',
    lineHeight: '1.6',
    margin: 0
  },
  summary: { background: '#ffffff', border: '1px solid #eae7e1', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' },
  summaryTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: '#0F2F24', fontWeight: 400 },
  summaryItems: { display: 'flex', flexDirection: 'column', gap: '16px' },
  summaryItem: { display: 'flex', gap: '16px', alignItems: 'center' },
  summaryImg: { width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#F3F0EA', position: 'relative' },
  productQty: { position: 'absolute', top: '-8px', right: '-8px', width: '20px', height: '20px', background: '#0F2F24', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' },
  summaryItemName: { fontFamily: "'Inter',sans-serif", fontSize: '14px', fontWeight: 500, color: '#0F2F24' },
  summaryItemPrice: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: '#0F2F24', flexShrink: 0 },
  divider: { height: '1px', background: '#eae7e1' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#6b6b6b' },
  totalRow: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: '#0F2F24', fontWeight: 400 },

  // Modal specific luxury styles
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(15, 47, 36, 0.45)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px'
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '24px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#9a9a9a',
    padding: '4px',
    transition: 'color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },
  modalTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#0F2F24',
    margin: 0
  },
  modalTotalBox: {
    background: '#F8F6F0',
    borderRadius: '12px',
    padding: '14px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    border: '1px solid #eae7e1'
  },
  modalStripeCardContainer: {
    background: '#ffffff',
    border: '1.5px solid #eae7e1',
    borderRadius: '12px',
    padding: '14px 16px',
    transition: 'border-color 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'modal-spin 0.8s linear infinite',
    display: 'inline-block'
  }
};
