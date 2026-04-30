import { useState, useEffect } from 'react';
import API_BASE from '../config/api';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function OrdersPage() {
  const { t } = useLanguage();
  const o = t.orders_page || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/account');
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            navigate('/account');
          }
          throw new Error('Failed to fetch orders');
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircle size={20} color="#7BAA8D" />;
      case 'shipped': return <Truck size={20} color="#C9A96E" />;
      case 'processing': return <Package size={20} color="#0F2F24" />;
      default: return <Clock size={20} color="#9a9a9a" />;
    }
  };

  const getStatusText = (status) => {
    return o[`status_${status}`] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) return <div style={styles.centerMsg}>{o.loading || 'Loading your orders...'}</div>;

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>{o.title}</h1>
              <p style={styles.subtitle}>{o.sub}</p>
            </div>
            <button 
              onClick={handleLogout} 
              style={styles.logoutBtn}
              onMouseOver={e => { e.currentTarget.style.background = '#fcfcfc'; e.currentTarget.style.borderColor = '#0F2F24'; e.currentTarget.style.color = '#0F2F24'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#eae7e1'; e.currentTarget.style.color = '#6b6b6b'; }}
            >
              <LogOut size={18} />
              {o.logout}
            </button>
          </div>

          {/* Profile Section */}
          {localStorage.getItem('user') && (
            <div style={styles.profileCard}>
              <div style={styles.profileAvatar}>
                {JSON.parse(localStorage.getItem('user')).username?.[0].toUpperCase()}
              </div>
              <div style={styles.profileInfo}>
                <h2 style={styles.profileName}>{JSON.parse(localStorage.getItem('user')).username}</h2>
                <p style={styles.profileEmail}>{JSON.parse(localStorage.getItem('user')).email}</p>
                <div style={styles.badge}>{o.customerBadge}</div>
              </div>
            </div>
          )}

          {error && <div style={styles.error}>{error}</div>}

          {orders.length === 0 && !error ? (
            <div style={styles.emptyState}>
              <Package size={48} color="#eae7e1" style={{ marginBottom: '16px' }} />
              <p>{o.emptyState}</p>
              <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ marginTop: '24px' }}>
                {o.startShopping}
              </button>
            </div>
          ) : (
            <div style={styles.orderList}>
              {orders.map((order, i) => (
                <motion.div 
                  key={order._id} 
                  style={styles.orderCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div style={styles.orderHeader}>
                    <div>
                      <div style={styles.orderId}>{o.orderPrefix} {order._id.substring(0, 8).toUpperCase()}</div>
                      <div style={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div style={styles.orderStatusBlock}>
                      {getStatusIcon(order.status)}
                      <span style={{ ...styles.statusText, color: order.status === 'delivered' ? '#7BAA8D' : '#0F2F24' }}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  <div style={styles.trackingBlock}>
                    <strong>{o.trackingLabel}</strong> {order.trackingNumber || o.pending}
                  </div>

                  <div style={styles.itemsList}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={styles.itemRow}>
                        <div style={styles.itemInfo}>
                          <div style={styles.itemName}>{item.name}</div>
                          <div style={styles.itemQty}>{o.qtyLabel} {item.quantity}</div>
                        </div>
                        <div style={styles.itemPrice}>€{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  <div style={styles.orderFooter}>
                    <div style={styles.totalLabel}>{o.totalLabel}</div>
                    <div style={styles.totalAmount}>€{order.totalAmount.toFixed(2)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}

const styles = {
  main: { paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: '#FAFAF8' },
  container: { maxWidth: '800px', margin: '0 auto', padding: '0 24px' },
  centerMsg: { paddingTop: '120px', textAlign: 'center', fontFamily: "'Inter', sans-serif", color: '#6b6b6b' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#0F2F24', marginBottom: '8px', lineHeight: 1 },
  subtitle: { fontSize: '15px', color: '#6b6b6b' },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '99px',
    border: '1.5px solid #eae7e1',
    background: '#fff',
    color: '#6b6b6b',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'Inter', sans-serif"
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '32px',
    background: '#fff',
    borderRadius: '20px',
    border: '1px solid #eae7e1',
    marginBottom: '40px',
    boxShadow: '0 4px 20px rgba(15, 47, 36, 0.03)'
  },
  profileAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: '#0F2F24',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  profileName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2rem',
    color: '#0F2F24',
    fontWeight: 400,
    margin: 0
  },
  profileEmail: {
    fontSize: '14px',
    color: '#9a9a9a',
    margin: 0
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    background: '#F3F0EA',
    color: '#0F2F24',
    fontSize: '11px',
    fontWeight: 600,
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '8px',
    width: 'fit-content'
  },
  error: { background: '#f8d7da', color: '#842029', padding: '16px', borderRadius: '8px', marginBottom: '24px' },
  emptyState: { textAlign: 'center', padding: '64px', background: '#fff', borderRadius: '16px', border: '1px solid #eae7e1', color: '#6b6b6b' },
  orderList: { display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' },
  orderCard: { background: '#fff', borderRadius: '16px', border: '1px solid #eae7e1', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: '#F3F0EA', borderBottom: '1px solid #eae7e1' },
  orderId: { fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px', color: '#0F2F24' },
  orderDate: { fontSize: '13px', color: '#6b6b6b', marginTop: '4px' },
  orderStatusBlock: { display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '6px 12px', borderRadius: '20px' },
  statusText: { fontSize: '13px', fontWeight: 500 },
  trackingBlock: { padding: '16px 24px', borderBottom: '1px solid #eae7e1', fontSize: '13px', color: '#0F2F24', background: '#fcfcfc' },
  itemsList: { padding: '24px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px' },
  itemInfo: { display: 'flex', flexDirection: 'column' },
  itemName: { fontSize: '14px', color: '#1a1a1a', fontWeight: 500 },
  itemQty: { fontSize: '13px', color: '#9a9a9a', marginTop: '4px' },
  itemPrice: { fontSize: '14px', color: '#0F2F24', fontWeight: 500 },
  orderFooter: { padding: '20px 24px', borderTop: '1px solid #eae7e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' },
  totalLabel: { fontSize: '14px', color: '#6b6b6b', textTransform: 'uppercase', letterSpacing: '0.05em' },
  totalAmount: { fontSize: '18px', fontWeight: 600, color: '#0F2F24' }
};
