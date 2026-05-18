import { useState, useEffect } from 'react';
import API_BASE from '../config/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

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

export default function CheckoutPage() {
  const { language, t } = useLanguage();
  const c = t.checkout || {};
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = 4.90;

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('sto_shipping_info');
    if (saved) return JSON.parse(saved);
    return { email: '', name: '', address: '', city: 'Vantaa', postal: '01300', country: c.countries[0], phone: '' };
  });

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


  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalAmount = subtotal + shipping;

    const orderData = {
      items: items.map(item => ({
        product: item.id || item._id, // Assume item.id maps to the backend product ID
        name: item.name,
        quantity: item.qty,
        price: item.price,
        image: item.image
      })),
      totalAmount,
      shippingAddress: {
        fullName: form.name,
        address: form.address,
        city: form.city,
        postalCode: form.postal,
        country: form.country,
        phone: form.phone
      }
    };

    const token = localStorage.getItem('token');

    if (!token) {
      toast.error(c.loginToPlace || 'Please log in to place an order.');
      navigate('/account?redirect=/checkout');
      return;
    }

    const resLoad = await loadRazorpay();
    if (!resLoad) {
      toast.error(c.razorpayFail || 'Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      // 1. Create Order on Backend
      const resOrder = await fetch(`${API_BASE}/orders/create-razorpay-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: totalAmount })
      });

      if (!resOrder.ok) throw new Error('Failed to create order');
      const order = await resOrder.json();

      // 2. Initialize Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummy',
        amount: order.amount,
        currency: order.currency,
        name: 'STO',
        description: c.paymentDesc || 'Payment for your order',
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment on Backend
            const resVerify = await fetch(`${API_BASE}/orders/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                ...orderData
              })
            });

            if (!resVerify.ok) throw new Error('Payment verification failed');
            const verifiedOrder = await resVerify.json();

            const localOrder = {
              orderNum: verifiedOrder.trackingNumber || verifiedOrder._id,
              customer: form,
              items,
              subtotal,
              total: totalAmount,
              date: new Date().toISOString()
            };
            localStorage.setItem('sto_last_order', JSON.stringify(localOrder));
            clearCart();
            navigate('/order-summary');
          } catch (err) {
            toast.error(err.message);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: ''
        },
        theme: {
          color: '#0F2F24'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      toast.error(err.message);
    }
  };


  return (
    <main style={{ paddingTop: '80px', background: '#FAFAF8', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '1100px', paddingTop: '48px' }}>
        <header style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={styles.title}>{c.title}</h1>
          <p style={styles.sub}>{c.sub}</p>
        </header>

        <div style={styles.layout} className="res-grid-checkout">
          {/* Left: Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Input label={c.city} id="city" value={form.city} onChange={v => set('city', v)} placeholder={c.city} autoComplete="address-level2" />
                <Input label={c.postal} id="postal" value={form.postal} onChange={v => set('postal', v)} placeholder="00000" autoComplete="postal-code" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="country">{c.country}</label>
                <select id="country" className="form-input" value={form.country} onChange={e => set('country', e.target.value)}>
                  {c.countries.map(country => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>

              {/* Payment */}
              <div style={{ ...styles.sectionHeader, marginTop: '32px' }}>
                <h2 style={styles.sectionTitle}>{c.payment}</h2>
              </div>
              <div style={styles.payCard}>
                <div style={styles.payCardHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={16} style={{ color: '#0F2F24' }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '14px', fontWeight: 500 }}>{c.securePay || 'Razorpay Secure Payment'}</span>
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#6b6b6b' }}>
                  {c.redirectPay || 'You will be redirected to Razorpay to complete your payment securely.'}
                </p>
              </div>

              <motion.button whileTap={{ scale: 0.98 }} type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '16px', marginTop: '12px' }}>
                {c.place}
              </motion.button>

              <div style={styles.secure}>
                <div style={styles.secureTitle}>
                  <Lock size={16} style={{ color: '#0F2F24', strokeWidth: 2.5 }} />
                  <span>{c.secure}</span>
                </div>
                <p style={styles.secureDesc}>{c.secureDesc}</p>
              </div>
            </form>
          </motion.div>

          {/* Right: Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={styles.summary}>
              <h2 style={styles.summaryTitle}>{c.summary}</h2>

              <div style={styles.summaryItems}>
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} style={styles.summaryItem}>
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

              <div style={styles.summaryRow}><span>{c.subtotal}</span><span>€{subtotal.toFixed(2)}</span></div>
              <div style={styles.summaryRow}><span>{c.shippingFee}</span><span>€{shipping.toFixed(2)}</span></div>
              <div style={styles.divider} />
              <div style={{ ...styles.summaryRow, ...styles.totalRow }}><span>{t.cart.total}</span><span>€{(subtotal + shipping).toFixed(2)}</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  title: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: '#0F2F24', fontWeight: 300, marginBottom: '8px' },
  sub: { fontSize: '16px', color: '#9a9a9a', marginBottom: '48px' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 400px', gap: '64px', alignItems: 'start', position: 'relative' },
  sectionHeader: { marginBottom: '24px' },
  sectionTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', color: '#0F2F24', fontWeight: 400 },
  payCard: { background: '#F3F0EA', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' },
  payCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  secure: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '32px',
    padding: '24px',
    background: '#f4fbf7',
    border: '1px dashed #7BAA8D',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(15, 47, 36, 0.03)',
    maxWidth: '100%',
    transition: 'all 0.3s ease'
  },
  secureTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    fontWeight: '700',
    color: '#0F2F24',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '0.01em'
  },
  secureDesc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5A52',
    textAlign: 'center',
    maxWidth: '380px',
    lineHeight: '1.6',
    margin: 0
  },
  summary: { background: '#ffffff', border: '1px solid #eae7e1', borderRadius: '20px', padding: '40px', position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '20px' },
  summaryTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: '#0F2F24', fontWeight: 400 },
  summaryItems: { display: 'flex', flexDirection: 'column', gap: '16px' },
  summaryItem: { display: 'flex', gap: '16px', alignItems: 'center' },
  summaryImg: { width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#F3F0EA', position: 'relative' },
  productQty: { position: 'absolute', top: '-8px', right: '-8px', width: '20px', height: '20px', background: '#0F2F24', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' },
  summaryItemName: { fontFamily: "'Inter',sans-serif", fontSize: '14px', fontWeight: 500, color: '#0F2F24' },
  summaryItemPrice: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: '#0F2F24', flexShrink: 0 },
  divider: { height: '1px', background: '#eae7e1' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#6b6b6b' },
  totalRow: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: '#0F2F24', fontWeight: 400, color: '#0F2F24' },
};
