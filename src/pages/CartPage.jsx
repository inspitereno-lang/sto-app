import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { language, t } = useLanguage();
  const c = t.cart || {};
  const { items, removeFromCart, updateQty, subtotal } = useCart();
  const [categories, setCategories] = useState([]);
  const shipping = items.length > 0 ? 4.90 : 0;

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/categories');
        if (res.ok) {
          const json = await res.json();
          setCategories(json.data || json);
        }
      } catch (err) {}
    };
    fetchCats();
  }, []);

  const getCatName = (catSlug) => {
    const cat = categories.find(c => c.slug === catSlug);
    if (!cat) return catSlug;
    return cat.translations?.[language]?.name || cat.name;
  };

  if (items.length === 0) return (
    <main style={{ paddingTop:'120px', minHeight:'70vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'24px', background:'#FAFAF8' }}>
      <div style={{ fontSize:'4rem' }}>🛒</div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', color:'#0F2F24', fontWeight:400 }}>{c.empty}</h2>
      <p style={{ color:'#9a9a9a', fontSize:'15px' }}>{c.emptySub}</p>
      <Link to="/shop" className="btn btn-primary" style={{ display:'flex', alignItems:'center', gap:'8px' }}>
        <ShoppingBag size={16}/> {c.continueShopping}
      </Link>
    </main>
  );

  return (
    <main style={{ paddingTop:'80px', background:'#FAFAF8', minHeight:'100vh' }}>
      <div className="container" style={{ padding:'48px 24px' }}>
        <motion.h1 style={styles.title} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
          {c.title}
        </motion.h1>

        <div className="res-grid-2" style={{ alignItems:'start' }}>
          {/* Items */}
          <div style={styles.items}>
            {items.map((item, i) => (
              <motion.div key={item.id} style={styles.item}
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:i*0.08 }} layout>
                <div style={styles.itemImg}>
                  <img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}
                    onError={e => { e.target.src='https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=200&q=80'; }}/>
                </div>
                <div style={styles.itemInfo}>
                  <div style={styles.itemCat}>{getCatName(item.category)}</div>
                  <Link to={`/product/${item.id}`} style={styles.itemName}>{item.translations?.[language]?.name || item.name}</Link>
                  <div style={styles.itemPrice}>€{item.price.toFixed(2)}</div>
                </div>
                <div style={styles.itemActions}>
                  <div style={styles.qtyRow}>
                    <button onClick={() => updateQty(item.id, item.qty-1)} style={styles.qBtn}><Minus size={13}/></button>
                    <span style={styles.qVal}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty+1)} style={styles.qBtn}><Plus size={13}/></button>
                  </div>
                  <div style={styles.itemTotal}>€{(item.price * item.qty).toFixed(2)}</div>
                  <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn} aria-label="Remove">
                    <Trash2 size={15}/>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div style={styles.summary} className="mobile-relative" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}>
            <h2 style={styles.summaryTitle}>{c.orderSummary}</h2>
            <div style={styles.summaryRow}>
              <span>{c.subtotal}</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>{c.shipping} {c.shippingRegion}</span>
              <span>€{shipping.toFixed(2)}</span>
            </div>
            <div style={styles.divider}/>
            <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
              <span>{c.total}</span>
              <span>€{(subtotal + shipping).toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginTop:'8px', width:'100%' }}>
              {c.checkout} <ArrowRight size={15}/>
            </Link>
            <Link to="/shop" style={styles.continueShopping}>{c.continueShopping}</Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  title: { fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,4vw,3rem)', color:'#0F2F24', fontWeight:400, marginBottom:'40px' },
  layout: { display:'grid', gridTemplateColumns:'1fr 360px', gap:'40px', alignItems:'start' },
  items: { display:'flex', flexDirection:'column', gap:'1px', background:'#eae7e1', border:'1px solid #eae7e1', borderRadius:'16px', overflow:'hidden' },
  item: { display:'flex', gap:'20px', alignItems:'center', background:'#ffffff', padding:'20px 24px' },
  itemImg: { width:'80px', height:'80px', borderRadius:'10px', overflow:'hidden', flexShrink:0, background:'#F3F0EA' },
  itemInfo: { flex:1, display:'flex', flexDirection:'column', gap:'4px' },
  itemCat: { fontFamily:"'Inter',sans-serif", fontSize:'10px', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#7BAA8D' },
  itemName: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.15rem', color:'#0F2F24', textDecoration:'none', fontWeight:400 },
  itemPrice: { fontFamily:"'Inter',sans-serif", fontSize:'14px', color:'#6b6b6b' },
  itemActions: { display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'10px' },
  qtyRow: { display:'flex', alignItems:'center', border:'1.5px solid #e0ddd6', borderRadius:'6px', overflow:'hidden' },
  qBtn: { width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', border:'none', cursor:'pointer', color:'#0F2F24' },
  qVal: { width:'36px', textAlign:'center', fontFamily:"'Inter',sans-serif", fontSize:'14px', fontWeight:500 },
  itemTotal: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', color:'#0F2F24', fontWeight:400 },
  removeBtn: { background:'none', border:'none', cursor:'pointer', color:'#c0bdb8', transition:'color 0.2s', display:'flex', alignItems:'center' },
  summary: { background:'#ffffff', border:'1px solid #eae7e1', borderRadius:'16px', padding:'32px', display:'flex', flexDirection:'column', gap:'16px', position:'sticky', top:'100px' },
  summaryTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', color:'#0F2F24', fontWeight:400, marginBottom:'4px' },
  summaryRow: { display:'flex', justifyContent:'space-between', fontSize:'14px', color:'#6b6b6b' },
  divider: { height:'1px', background:'#eae7e1', margin:'4px 0' },
  totalRow: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', color:'#0F2F24', fontWeight:400 },
  continueShopping: { textAlign:'center', display:'block', fontFamily:"'Inter',sans-serif", fontSize:'13px', color:'#9a9a9a', textDecoration:'none', marginTop:'8px' },
};
