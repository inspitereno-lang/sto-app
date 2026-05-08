import { useState, useEffect, useRef, useMemo } from 'react';
import API_BASE from '../../config/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductCategories() {
  const { language, t } = useLanguage();
  const c = { ...(t.categories || {}), ...(t.home_categories || {}) };
  const ps = t.products_section || {};
  const [cats, setCats] = useState([]);
  const containerRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          if (data && data.length > 0) {
            setCats(data);
          }
        }
      } catch (err) {
        console.log('Failed to fetch categories from backend');
      }
    };
    fetchCategories();
  }, []);

  // Derive translated categories for rendering
  const translatedCats = useMemo(() => cats.map(cat => {
    const trans = cat.translations?.[language] || {};
    return {
      id: cat._id || cat.id,
      key: cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: trans.name || cat.name,
      description: trans.description || cat.description,
      img: cat.image || 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80',
      color: cat.color || '#1B3A2D',
      link: cat.link || `/shop?cat=${cat.slug}`,
    };
  }), [cats, language]);

  const [dragX, setDragX] = useState(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && translatedCats.length > 0) {
        const fullWidth = translatedCats.length * 324; // 300px + 24px gap
        const visibleWidth = containerRef.current.offsetWidth;
        if (fullWidth > visibleWidth) {
          setConstraints({ left: -(fullWidth - visibleWidth + 24), right: 0 });
        } else {
          setConstraints({ left: 0, right: 0 });
        }
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [translatedCats]);

  const scroll = (direction) => {
    const step = 324; // Width of card + gap
    const newX = direction === 'left' ? dragX + step : dragX - step;
    
    // Clamp to constraints
    const clampedX = Math.max(constraints.left, Math.min(0, newX));
    setDragX(clampedX);
  };

  return (
    <section className="section" style={{ background: '#F3F0EA', position: 'relative', overflow: 'hidden' }}>
      <div className="container" ref={containerRef} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">{ps.title || c.label || 'WHAT WE OFFER'}</div>
            <h2 className="section-title" style={{ whiteSpace: 'pre-line', fontSize: translatedCats.length > 4 ? '2.5rem' : 'clamp(2rem, 4vw, 3.5rem)', marginBottom: 0 }}>
              {ps.subtitle || c.title || 'Pure & Premium.'}
            </h2>
          </motion.div>

          {translatedCats.length > 4 && (
            <div className="slider-nav hide-mobile" style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => scroll('left')}
                style={{ ...styles.navBtn, opacity: dragX >= 0 ? 0.3 : 1 }}
                disabled={dragX >= 0}
              >
                <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button 
                onClick={() => scroll('right')}
                style={{ ...styles.navBtn, opacity: dragX <= constraints.left ? 0.3 : 1 }}
                disabled={dragX <= constraints.left}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className={`product-cat-container ${translatedCats.length > 4 ? 'is-slider' : ''}`}>
          <div style={{ position: 'relative' }}>
            <motion.div 
              className="cat-slider"
              drag={translatedCats.length > 4 ? "x" : false}
              dragConstraints={constraints}
              animate={{ x: dragX }}
              onDragEnd={(_, info) => setDragX(prev => prev + info.offset.x)}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: translatedCats.length > 4 ? `repeat(${translatedCats.length}, 300px)` : `repeat(${translatedCats.length}, 1fr)`,
                gap: '24px', 
                cursor: cats.length > 4 ? 'grab' : 'default',
                paddingBottom: '40px'
              }}
            >
              {translatedCats.map((cat, i) => (
                <motion.div
                  key={cat.id || cat.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link to={cat.link} style={styles.card}>
                    <div style={styles.imgWrap}>
                      <img
                        src={cat.img}
                        alt={cat.name}
                        style={styles.img}
                        className="cat-img"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80'; }}
                      />
                      <div style={{ ...styles.imgOverlay, background: `linear-gradient(to top, ${cat.color}ee 0%, ${cat.color}44 50%, transparent 100%)` }} />
                    </div>
                    <div style={styles.cardContent}>
                      <div style={{ ...styles.cardLabel, textTransform: 'capitalize' }}>{cat.name}</div>
                      <p style={styles.cardDesc}>{cat.description}</p>
                      <div style={styles.cardLink}>
                        {t.blog_page?.shopNow || 'Shop Now'} <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        a:hover .cat-img { transform: scale(1.06); }
        .cat-img { transition: transform 0.6s ease; }
        
        .cat-slider:active { cursor: grabbing; }
        
        .slider-nav button:hover:not(:disabled) {
          background: #0F2F24;
          color: #ffffff;
          border-color: #0F2F24;
        }

        @media (max-width: 1200px) {
           .product-cat-container {
             margin: 0 -24px;
             padding: 0 24px;
           }
        }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .product-cat-container.is-slider, .cat-slider {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 24px;
            margin: 0 -24px;
            padding: 0 24px 24px 24px;
            gap: 16px !important;
          }
          .cat-slider > div {
            flex: 0 0 80vw !important;
            scroll-snap-align: center;
          }
          .cat-slider::-webkit-scrollbar {
            display: none;
          }
          .cat-slider {
             drag: none !important;
             transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

const styles = {
  header: { marginBottom: '48px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' },
  card: {
    position: 'relative', display: 'block',
    borderRadius: '20px', overflow: 'hidden',
    aspectRatio: '3/4', textDecoration: 'none',
    boxShadow: '0 8px 32px rgba(15,47,36,0.1)',
  },
  imgWrap: { position: 'absolute', inset: 0, overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  imgOverlay: { position: 'absolute', inset: 0 },
  cardContent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: '32px 28px',
  },
  cardLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.7rem', fontWeight: 400,
    color: '#ffffff', marginBottom: '8px',
    letterSpacing: '-0.01em',
  },
  cardDesc: {
    fontSize: '13px', color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.6, marginBottom: '16px',
  },
  cardLink: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#7BAA8D',
  },
  navBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1px solid #0F2F2422',
    background: 'transparent',
    color: '#0F2F24',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};
