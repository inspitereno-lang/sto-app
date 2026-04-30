import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Import generated images
import img1 from '../../assets/microgreens/microgreens_hydroponic_1777117697776.png';
import img2 from '../../assets/microgreens/microgreens_harvest_1777117721739.png';
import img3 from '../../assets/microgreens/microgreens_dish_1777117742447.png';

const galleryImages = (t) => [
  { id: 1, src: img1, alt: t.img1Alt || 'Fresh Microgreens in Hydroponic Setup', label: t.img1Label || 'Hydroponic Cultivation' },
  { id: 2, src: img2, alt: t.img2Alt || 'Harvesting Fresh Microgreens', label: t.img2Label || 'Fresh Daily Harvest' },
  { id: 3, src: img3, alt: t.img3Alt || 'Microgreens in a Premium Dish', label: t.img3Label || 'Culinary Excellence' },
];

export default function MicrogreensGallery() {
  const { t } = useLanguage();
  const c = t.home_microgreens || {};
  const images = galleryImages(c);
  
  return (
    <section className="section" style={{ background: '#FFFFFF', overflow: 'hidden', position: 'relative' }}>
      <div className="container">
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">{c.label || 'FRESH & VIBRANT'}</div>
          <h2 className="section-title">{c.title || 'Our Microgreens'}</h2>
          <p style={styles.desc}>
            {c.desc || 'Grown sustainably with pure water and meticulous care, our microgreens deliver concentrated nutrition and extraordinary flavor to every meal.'}
          </p>
        </motion.div>

        <div style={styles.galleryWrapper}>
          <div className="gallery-scroll" style={styles.galleryScroll}>
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                className="gallery-item"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={styles.galleryItem}
              >
                <div style={styles.imgWrap}>
                  <img src={img.src} alt={img.alt} style={styles.img} className="gal-img" />
                  <div style={styles.overlay} />
                  <div style={styles.imgLabel}>{img.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .gallery-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .gallery-scroll::-webkit-scrollbar-track {
          background: #F3F0EA;
          border-radius: 4px;
        }
        .gallery-scroll::-webkit-scrollbar-thumb {
          background: #7BAA8D;
          border-radius: 4px;
        }
        @media (max-width: 768px) {
          .gallery-item {
            min-width: 80vw !important;
          }
        }
        .gal-img {
          transition: transform 0.8s ease;
        }
        .gallery-item:hover .gal-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}

const styles = {
  header: {
    marginBottom: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  desc: {
    fontSize: '15px',
    color: '#6b6b6b',
    lineHeight: 1.6,
    maxWidth: '600px',
    marginTop: '16px',
  },
  galleryWrapper: {
    width: '100%',
    margin: '0 auto',
  },
  galleryScroll: {
    display: 'flex',
    gap: '24px',
    overflowX: 'auto',
    paddingBottom: '24px',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
  },
  galleryItem: {
    flex: '1',
    minWidth: '300px',
    scrollSnapAlign: 'start',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 12px 32px rgba(15,47,36,0.08)',
    position: 'relative',
    cursor: 'pointer',
  },
  imgWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4/5',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(15,47,36,0.85) 0%, rgba(15,47,36,0.2) 40%, transparent 100%)',
  },
  imgLabel: {
    position: 'absolute',
    bottom: '32px',
    left: '24px',
    right: '24px',
    color: '#ffffff',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.6rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
  },
};
