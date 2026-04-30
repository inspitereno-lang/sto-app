import { useState, useEffect, useMemo } from 'react';
import API_BASE from '../config/api';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ui/ProductCard';

const CATS = ['all', 'microgreens', 'candles'];

export default function ShopPage() {
  const { language, t } = useLanguage();
  const p = t.products || {};
  const s = t.shop_page || t.shopPage || {};
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);

  const [cat, setCat] = useState(searchParams.get('cat') || 'all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [products, setProducts] = useState([]);

  // Fetch products and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch(`${API_BASE}/api/categories`);
        if (catRes.ok) {
          const catJson = await catRes.json();
          setCategories(catJson.data || catJson);
        }

        const res = await fetch(`${API_BASE}/api/products`);
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          if (data && data.length > 0) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.log('Failed to fetch from backend');
      }
    };
    fetchData();
  }, []);

  const getCatName = (catSlug) => {
    if (catSlug === 'all') return s.all || 'All';
    const cat = categories.find(c => c.slug === catSlug);
    if (!cat) return catSlug.charAt(0).toUpperCase() + catSlug.slice(1);
    return cat.translations?.[language]?.name || cat.name;
  };

  useEffect(() => {
    const c = searchParams.get('cat');
    if (c) setCat(c);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(item => {
        const trans = item.translations?.[language] || {};
        const name = trans.name || item.name;
        const sDesc = trans.shortDescription || item.shortDescription || '';
        return name.toLowerCase().includes(q) || sDesc.toLowerCase().includes(q);
      });
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [cat, query, sort, products, language]);

  const handleCat = (c) => {
    setCat(c);
    setSearchParams(c === 'all' ? {} : { cat: c });
  };

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#FAFAF8' }}>
      {/* Hero banner */}
      <div style={styles.banner}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={styles.bannerLabel}>{s.bannerLabel}</div>
          <h1 style={styles.bannerTitle}>{s.bannerTitle}</h1>
          <p style={styles.bannerSub}>{s.bannerSub}</p>
        </motion.div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {/* Controls */}
        <div style={styles.controls}>
          {/* Category filters */}
          <div style={styles.cats}>
            {CATS.map(c => (
              <button key={c} onClick={() => handleCat(c)}
                style={{ ...styles.catBtn, ...(cat === c ? styles.catBtnActive : {}) }}>
                {getCatName(c)}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div style={styles.rightControls}>
            <div style={styles.searchWrap}>
              <Search size={15} style={styles.searchIcon} />
              <input
                type="text" value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={p.search}
                style={styles.searchInput}
                aria-label="Search products"
              />
              {query && (
                <button onClick={() => setQuery('')} style={styles.clearBtn}><X size={14} /></button>
              )}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={styles.sortSelect} aria-label="Sort products">
              <option value="newest">{p.sortNewest}</option>
              <option value="price-asc">{p.sortPriceLow}</option>
              <option value="price-desc">{p.sortPriceHigh}</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div style={styles.resultsInfo}>
          <span style={styles.count}>{filtered.length} {s.resultsCount}</span>
          {query && <span style={styles.queryTag}>"{query}" <button onClick={() => setQuery('')} style={styles.clearTag}><X size={12} /></button></span>}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid-4">
            {filtered.map((prod, i) => (
              <motion.div key={prod.id || prod._id}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.07, 0.5) }}
              >
                <ProductCard product={prod} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div style={styles.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={styles.emptyIcon}>🔍</div>
            <h3 style={styles.emptyTitle}>{s.noProducts}</h3>
            <p style={styles.emptySub}>{s.tryAdjust}</p>
            <button className="btn btn-outline" onClick={() => { setQuery(''); setCat('all'); setSearchParams({}); }}>
              {s.clearFilters}
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}

const styles = {
  banner: {
    background: 'linear-gradient(135deg, #0F2F24 0%, #1a4a3a 100%)',
    padding: '80px 24px 64px', textAlign: 'center',
  },
  bannerLabel: { fontFamily: "'Inter',sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7BAA8D', marginBottom: '12px' },
  bannerTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: '#ffffff', fontWeight: 300, marginBottom: '12px', letterSpacing: '-0.01em' },
  bannerSub: { fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 },
  controls: { display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap' },
  cats: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  catBtn: {
    padding: '9px 20px', borderRadius: '99px', border: '1.5px solid #e0ddd6',
    fontFamily: "'Inter',sans-serif", fontSize: '13px', fontWeight: 400, color: '#6b6b6b',
    background: '#ffffff', cursor: 'pointer', transition: 'all 0.2s',
  },
  catBtnActive: { background: '#0F2F24', color: '#ffffff', borderColor: '#0F2F24' },
  rightControls: { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: '12px', color: '#9a9a9a', pointerEvents: 'none' },
  searchInput: {
    padding: '10px 36px 10px 36px', border: '1.5px solid #e0ddd6', borderRadius: '8px',
    fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#1a1a1a',
    background: '#ffffff', outline: 'none', width: '220px', transition: 'border-color 0.2s',
  },
  clearBtn: { position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#9a9a9a', display: 'flex', alignItems: 'center' },
  sortSelect: {
    padding: '10px 16px', border: '1.5px solid #e0ddd6', borderRadius: '8px',
    fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#1a1a1a',
    background: '#ffffff', outline: 'none', cursor: 'pointer',
  },
  resultsInfo: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' },
  count: { fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#9a9a9a' },
  queryTag: { display: 'flex', alignItems: 'center', gap: '6px', background: '#eaf2ee', color: '#0F2F24', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 500 },
  clearTag: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0F2F24' },
  empty: { textAlign: 'center', padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' },
  emptyIcon: { fontSize: '3rem', marginBottom: '8px' },
  emptyTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', color: '#0F2F24', fontWeight: 400 },
  emptySub: { fontSize: '15px', color: '#9a9a9a', marginBottom: '8px' },
};
