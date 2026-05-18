import { useState, useEffect } from 'react';
import API_BASE from '../config/api';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Minus, Plus, ArrowLeft, Check, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getProductById, products as localProducts } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const nutIcons = ['🌿','💧','📍','✨','🛡️'];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const p = t.products;
  const pd = t.productDetail;
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(localProducts);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories for labels
        const catRes = await fetch(`${API_BASE}/categories`);
        if (catRes.ok) {
          const catJson = await catRes.json();
          setCategories(catJson.data || catJson);
        }

        // Fetch product
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          setProduct(data);

          // Fetch all products for related
          const allRes = await fetch(`${API_BASE}/products`);
          if (allRes.ok) {
            const allJson = await allRes.json();
            setAllProducts(allJson.data || allJson);
          }
        } else {
          setProduct(getProductById(id));
        }
      } catch (err) {
        setProduct(getProductById(id));
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const getCatName = (catSlug) => {
    const cat = categories.find(c => c.slug === catSlug);
    if (!cat) return catSlug;
    return cat.translations?.[language]?.name || cat.name;
  };

  if (loading) return (
    <main style={{ paddingTop:'120px', textAlign:'center', minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ color:'#9a9a9a', fontSize:'14px' }}>{t.common?.loading || 'Loading...'}</div>
    </main>
  );

  if (!product) return (
    <main style={{ paddingTop:'120px', textAlign:'center', minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'20px' }}>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', color:'#0F2F24' }}>{pd?.notFound || 'Product not found'}</h2>
      <Link to="/shop" className="btn btn-outline"><ArrowLeft size={15}/> {pd?.backToShop || 'Back to Shop'}</Link>
    </main>
  );

  const imgs = (product.images && product.images.length > 0) ? product.images : [product.image || 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=700&q=80'];
  const productId = product._id || product.id;
  const related = allProducts.filter(pr => pr.category === product.category && (pr._id || pr.id) !== productId).slice(0,4);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main style={{ paddingTop:'80px', background:'#FAFAF8', minHeight:'100vh' }}>
      <div className="container" style={{ display:'flex', alignItems:'center', gap:'8px', padding:'12px 24px', fontSize:'13px', color:'#9a9a9a' }}>
        <Link to="/shop" style={{ color:'#7BAA8D', textDecoration:'none' }}>{t.nav.shop}</Link>
        <span>›</span>
        <span>{getCatName(product.category)}</span>
        <span>›</span>
        <span style={{ color:'#1a1a1a' }}>{product.translations?.[language]?.name || product.name}</span>
      </div>

      <div className="container res-grid-2" style={{ alignItems:'start', padding:'16px 24px 64px' }}>
        {/* Images */}
        <motion.div style={{ display:'flex', flexDirection:'column', gap:'12px', position:'sticky', top:'100px' }}
          className="mobile-relative"
          initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7 }}>
          <div style={{ borderRadius:'16px', overflow:'hidden', aspectRatio:'4/5', position:'relative', background:'#F3F0EA' }}>
            <img src={imgs[activeImg]} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}
              onError={e => { e.target.src='https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=700&q=80'; }}/>
            {product.isNew && <span className="badge badge-new" style={{ position:'absolute', top:'16px', left:'16px' }}>{pd?.new || 'New'}</span>}
          </div>
          {imgs.length > 1 && (
            <div style={{ display:'flex', gap:'10px' }}>
              {imgs.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  style={{ width:'80px', height:'80px', borderRadius:'8px', overflow:'hidden', border:`2px solid ${activeImg===i?'#0F2F24':'transparent'}`, cursor:'pointer', background:'#F3F0EA', padding:0 }}>
                  <img src={img} style={{ width:'100%', height:'100%', objectFit:'cover' }}
                    onError={e => { e.target.src='https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=200&q=80'; }}/>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div style={{ display:'flex', flexDirection:'column', gap:'20px' }}
          initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, delay:0.1 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'11px', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'#7BAA8D' }}>{getCatName(product.category)}</span>
            <span className={`badge badge-${product.stockStatus}`}>
              {product.stockStatus==='instock'?p.inStock:product.stockStatus==='lowstock'?p.lowStock:p.outOfStock}
            </span>
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,4vw,3rem)', color:'#0F2F24', fontWeight:400, lineHeight:1.1 }}>
            {product.translations?.[language]?.name || product.name}
          </h1>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', color:'#0F2F24' }}>€{(product.price || 0).toFixed(2)}</div>
          <p style={{ fontSize:'15px', color:'#6b6b6b', lineHeight:1.8 }}>
            {product.translations?.[language]?.description || product.description}
          </p>

          {product.nutrition?.length > 0 && (
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              {product.nutrition.map((n, i) => (
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', background:'#F3F0EA', borderRadius:'10px', padding:'14px 16px', minWidth:'80px', textAlign:'center' }}>
                  <span style={{ fontSize:'1.2rem' }}>{nutIcons[i]||'✦'}</span>
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'11px', fontWeight:500, color:'#0F2F24' }}>{n}</span>
                </div>
              ))}
            </div>
          )}

          {product.stockStatus !== 'outofstock' && (
            <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #e0ddd6', borderRadius:'8px', overflow:'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ width:'40px', height:'48px', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', border:'none', cursor:'pointer', color:'#0F2F24' }}><Minus size={14}/></button>
                <span style={{ width:'48px', textAlign:'center', fontFamily:"'Inter',sans-serif", fontSize:'15px', fontWeight:500, color:'#0F2F24' }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock || 99,q+1))} style={{ width:'40px', height:'48px', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', border:'none', cursor:'pointer', color:'#0F2F24' }}><Plus size={14}/></button>
              </div>
              <motion.button className="btn btn-primary" onClick={handleAdd} whileTap={{ scale:0.96 }}
                style={{ flex:1, justifyContent:'center', display:'flex', alignItems:'center', gap:'8px', background:added?'#7BAA8D':'#0F2F24' }}>
                {added?<><Check size={16}/> {pd?.added || 'Added!'}</>:<><ShoppingCart size={16}/> {p.addToCart}</>}
              </motion.button>
            </div>
          )}

          <div style={{ display:'flex', alignItems:'flex-start', gap:'10px', background:'#eaf2ee', borderRadius:'10px', padding:'14px 16px' }}>
            <Leaf size={14} style={{ color:'#7BAA8D', flexShrink:0, marginTop:'2px' }}/>
            <span style={{ fontSize:'13px', color:'#0F2F24', lineHeight:1.6 }}>{pd?.sustainableGrowth || 'Sustainable Growth Cycle — grown using 95% less water than traditional farming.'}</span>
          </div>

          {product.flavorNotes && product.flavorNotes !== 'N/A — lifestyle accessory.' && (
            <div style={{ borderTop:'1px solid #eae7e1', paddingTop:'20px' }}>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:'11px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#0F2F24', marginBottom:'8px' }}>{pd?.flavorNotes || 'Flavor Notes'}</div>
              <p style={{ fontSize:'14px', color:'#6b6b6b', lineHeight:1.7 }}>
                {product.translations?.[language]?.flavorNotes || product.flavorNotes}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {related.length > 0 && (
        <div className="container" style={{ padding:'64px 24px' }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', color:'#0F2F24', marginBottom:'32px', fontWeight:400 }}>{pd?.youMayLike || 'You may also like'}</h2>
          <div className="grid-4">
            {related.map(pr => <ProductCard key={pr._id || pr.id} product={pr}/>)}
          </div>
        </div>
      )}
    </main>
  );
}
