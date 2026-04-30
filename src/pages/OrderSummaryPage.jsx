import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OrderSummaryPage() {
  const { t } = useLanguage();
  const o = t.order || {};
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('sto_last_order');
    if (saved) setOrder(JSON.parse(saved));
  }, []);

  if (!order) return (
    <main style={{ paddingTop:'120px', textAlign:'center', minHeight:'70vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'20px' }}>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', color:'#0F2F24' }}>{o.noOrder}</h2>
      <Link to="/shop" className="btn btn-outline">{o.returnShop}</Link>
    </main>
  );

  return (
    <main style={{ paddingTop:'80px', background:'#FAFAF8', minHeight:'100vh' }}>
      <div className="container" style={{ maxWidth:'700px', padding:'64px 24px' }}>
        <motion.div style={{ textAlign:'center', marginBottom:'48px' }}
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:'20px' }}>
            <CheckCircle size={56} style={{ color:'#7BAA8D' }}/>
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,5vw,3.2rem)', color:'#0F2F24', fontWeight:400, marginBottom:'10px' }}>{o.title}</h1>
          <p style={{ fontSize:'15px', color:'#6b6b6b' }}>{o.sub}</p>
        </motion.div>

        <motion.div style={styles.card} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <div style={styles.row}>
            <span style={styles.label}>{o.number}</span>
            <span style={styles.value}>{order.orderNum}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>{o.customer}</span>
            <span style={styles.value}>{order.customer.name || order.customer.email}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>{t.checkout.phone || 'Phone'}</span>
            <span style={styles.value}>{order.customer.phone}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>{o.status}</span>
            <span style={{ ...styles.value, color:'#1a7a3e', background:'#dcf5e7', padding:'4px 12px', borderRadius:'99px', fontSize:'12px', fontWeight:600 }}>{o.paid}</span>
          </div>
          <div style={styles.divider}/>

          <div style={styles.label}>{o.items}</div>
          <div style={styles.items}>
            {order.items.map(item => (
              <div key={item.id} style={styles.item}>
                <img src={item.image} alt={item.name} style={styles.itemImg}
                  onError={e=>{e.target.src='https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=100&q=80';}}/>
                <div style={{ flex:1 }}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemQty}>{o.qtyLabel}: {item.qty}</div>
                </div>
                <div style={styles.itemPrice}>€{(item.price*item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div style={styles.divider}/>
          <div style={{ ...styles.row, ...styles.totalRow }}>
            <span>{o.total}</span>
            <span>€{order.total.toFixed(2)}</span>
          </div>
        </motion.div>

        <motion.div style={styles.notice} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
          <Mail size={18} style={{ color:'#7BAA8D', flexShrink:0 }}/>
          <p style={styles.noticeText}>{o.msg}</p>
        </motion.div>

        <div style={styles.actions}>
          <Link to="/shop" className="btn btn-outline">{o.continueShopping}</Link>
          <button className="btn btn-primary" style={{ display:'flex', alignItems:'center', gap:'8px' }}
            onClick={() => window.print()}>
            <FileText size={15}/> {o.downloadInvoice}
          </button>
        </div>
      </div>
    </main>
  );
}

const styles = {
  card: { background:'#ffffff', border:'1px solid #eae7e1', borderRadius:'16px', padding:'36px', display:'flex', flexDirection:'column', gap:'20px', marginBottom:'24px', boxShadow:'0 4px 20px rgba(15,47,36,0.06)' },
  row: { display:'flex', justifyContent:'space-between', alignItems:'center' },
  label: { fontFamily:"'Inter',sans-serif", fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#9a9a9a' },
  value: { fontFamily:"'Inter',sans-serif", fontSize:'14px', fontWeight:500, color:'#0F2F24' },
  divider: { height:'1px', background:'#eae7e1' },
  items: { display:'flex', flexDirection:'column', gap:'12px' },
  item: { display:'flex', gap:'12px', alignItems:'center' },
  itemImg: { width:'52px', height:'52px', borderRadius:'8px', objectFit:'cover', background:'#F3F0EA', flexShrink:0 },
  itemName: { fontFamily:"'Inter',sans-serif", fontSize:'14px', fontWeight:500, color:'#0F2F24' },
  itemQty: { fontSize:'12px', color:'#9a9a9a', marginTop:'2px' },
  itemPrice: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:'#0F2F24', flexShrink:0 },
  totalRow: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', color:'#0F2F24', fontWeight:400 },
  notice: { background:'#eaf2ee', border:'1px solid #c2dece', borderRadius:'12px', padding:'20px 24px', display:'flex', gap:'14px', alignItems:'flex-start', marginBottom:'32px' },
  noticeText: { fontSize:'14px', color:'#0F2F24', lineHeight:1.7 },
  actions: { display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' },
};
