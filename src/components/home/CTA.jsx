import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();
  const c = { ...(t.cta || {}), ...(t.home_cta || {}) };

  return (
    <section style={styles.section}>
      <div style={styles.bg}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="STO lifestyle"
          style={styles.bgImg}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=80'; }}
        />
        <div style={styles.overlay} />
      </div>

      <motion.div style={styles.content} className="container"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
      >
        <div style={styles.eyebrow}>Vantaa, Finland</div>
        <h2 style={styles.heading}>{c.title || 'Elevate Your Everyday Essentials.'}</h2>
        <p style={styles.sub}>{c.desc || c.sub || 'Discover our collection — where nature meets refined living.'}</p>
        <div style={styles.btns} className="hero-btns">
          <Link to="/shop" className="btn btn-white" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {c.btn1 || 'Shop Now'} <ArrowRight size={15} />
          </Link>
          <Link to="/contact" className="btn" style={{ background: 'transparent', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {c.btn2 || 'Contact Us'}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

const styles = {
  section: { position: 'relative', padding: '80px 24px', overflow: 'hidden', textAlign: 'center' },
  bg: { position: 'absolute', inset: 0, zIndex: 0 },
  bgImg: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  overlay: { position: 'absolute', inset: 0, background: 'rgba(10,28,20,0.72)' },
  content: { position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' },
  eyebrow: { fontFamily: "'Inter',sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' },
  heading: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.2rem,5vw,4rem)', color: '#ffffff', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.1 },
  sub: { fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '480px' },
  btns: { display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' },
};
