import { useState, useEffect } from 'react';
import API_BASE from '../../config/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Removed hardcoded fallback categories

export default function ProductCategories() {
  const { t } = useLanguage();
  const c = { ...(t.categories || {}), ...(t.home_categories || {}) };
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          if (data && data.length > 0) {
            setCats(data.map(cat => ({
              key: cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              name: cat.name,
              description: cat.description,
              img: cat.image || 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80',
              color: cat.color || '#1B3A2D',
              link: cat.link || `/shop?cat=${cat.slug}`,
            })));
          }
        }
      } catch (err) {
        console.log('Failed to fetch categories from backend');
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="section" style={{ background: '#F3F0EA' }}>
      <div className="container">
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">{c.label}</div>
          <h2 className="section-title" style={{ whiteSpace: 'pre-line', fontSize: cats.length > 3 ? '2.5rem' : 'clamp(2rem, 4vw, 3.5rem)' }}>
            {cats.length > 2 ? c.title.replace(/Two|2/i, cats.length) : c.title}
          </h2>
        </motion.div>

        <div className={`product-cat-container ${cats.length > 4 ? 'is-slider' : ''}`}>
          {cats.length > 4 ? (
            <div style={{ position: 'relative' }}>
              <motion.div 
                className="cat-slider"
                drag="x"
                dragConstraints={{ left: -(cats.length * 324 - window.innerWidth + 48), right: 0 }}
                style={{ display: 'flex', gap: '20px', cursor: 'grab' }}
              >
                {cats.map((cat, i) => (
                  <motion.div
                    key={cat.key}
                    style={{ flex: '0 0 300px' }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
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
                        <div style={styles.cardLabel}>{cat.name}</div>
                        <p style={styles.cardDesc}>{cat.description}</p>
                        <div style={styles.cardLink}>
                          Shop Now <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="product-cat-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${cats.length}, 1fr)`,
              gap: '24px' 
            }}>
              {cats.map((cat, i) => (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
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
                      <div style={styles.cardLabel}>{cat.name}</div>
                      <p style={styles.cardDesc}>{cat.description}</p>
                      <div style={styles.cardLink}>
                        Shop Now <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        a:hover .cat-img { transform: scale(1.06); }
        .cat-img { transition: transform 0.6s ease; }
        
        .product-cat-container.is-slider {
          overflow: hidden;
          margin: 0 -24px;
          padding: 0 24px;
        }

        .cat-slider:active { cursor: grabbing; }
        
        @media (max-width: 1200px) {
          .product-cat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .product-cat-grid, .product-cat-container.is-slider, .cat-slider {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 24px;
            margin: 0 -24px;
            padding: 0 24px 24px 24px;
            gap: 16px !important;
          }
          .product-cat-grid > div, .cat-slider > div {
            flex: 0 0 80vw !important;
            scroll-snap-align: center;
          }
          .product-cat-grid::-webkit-scrollbar, .product-cat-container::-webkit-scrollbar, .cat-slider::-webkit-scrollbar {
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
};
