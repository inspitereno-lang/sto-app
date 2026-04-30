import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

import heroImg from '../../assets/african-man-harvesting-vegetables.jpg';

export default function Hero() {
  const ref = useRef(null);
  const { t } = useLanguage();
  const h = { ...(t.hero || {}), ...(t.home_hero || {}) };
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const badges = [
    h.badge1 || 'Locally Grown',
    h.badge2 || 'Zero Pesticides',
    h.badge3 || 'Vantaa, Finland',
    h.badge4 || 'Carbon Neutral'
  ];

  return (
    <section ref={ref} style={styles.hero} className="hero-section">
      {/* Parallax BG */}
      <motion.div style={{ ...styles.bg, y }}>
        <img
          src={heroImg}
          alt={h.heading || "Nature, Refined."}
          style={styles.bgImg}
          loading="eager"
        />
        <div style={styles.overlay} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ ...styles.content, opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.eyebrow}
        >
          <span style={styles.highlight}>{h.eyebrow1 || 'Saana Tuotanto Oy'}</span> <span style={{ opacity:0.5 }}>· {h.eyebrow2 || 'Finland'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={styles.heading}
          className="hero-heading"
        >
          {h.heading || h.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={styles.sub}
        >
          {h.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          style={styles.btns}
          className="hero-btns"
        >
          <Link to="/shop" className="btn btn-white" style={styles.btnPrimary}>
            {h.cta1} <ArrowRight size={16} />
          </Link>
          <Link to="/about" className="btn" style={styles.btnOutline}>
            {h.cta2}
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={styles.scroll}
          className="mobile-hide"
        >
          <div style={styles.scrollLine} />
          <span style={styles.scrollText}>{h.scroll || 'Scroll'}</span>
        </motion.div>
      </motion.div>

      {/* Bottom badges */}
      <motion.div
        style={styles.badges}
        className="hero-badges"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        {badges.map(b => (
          <div key={b} style={styles.badge}>{b}</div>
        ))}
      </motion.div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative', width: '100%',
    height: '100vh', minHeight: '700px',
    overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  bg: { position: 'absolute', inset: '-10% 0 -10% 0', zIndex: 0 },
  bgImg: { width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center 40%' },
  overlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to bottom, rgba(8,24,18,0.55) 0%, rgba(8,24,18,0.35) 50%, rgba(8,24,18,0.7) 100%)',
  },
  content: {
    position: 'relative', zIndex: 10,
    textAlign: 'center', padding: '0 24px',
    maxWidth: '800px',
  },
  eyebrow: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px', fontWeight: 500,
    letterSpacing: '0.2em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.9)', marginBottom: '32px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
  },
  highlight: {
    background: 'rgba(123, 170, 141, 0.25)',
    border: '1px solid rgba(123, 170, 141, 0.4)',
    color: '#ffffff',
    padding: '6px 16px',
    borderRadius: '100px',
    fontWeight: 600,
    backdropFilter: 'blur(4px)',
    letterSpacing: '0.1em'
  },
  heading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(3rem, 8vw, 6.5rem)',
    fontWeight: 300, color: '#ffffff',
    letterSpacing: '-0.02em', lineHeight: 1.08,
    marginBottom: '24px',
  },
  sub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(14px, 2vw, 17px)',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.75, marginBottom: '40px',
    maxWidth: '520px', margin: '0 auto 40px',
  },
  btns: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    background: '#ffffff', color: '#0F2F24',
    border: '1.5px solid #ffffff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em',
  },
  btnOutline: {
    background: 'transparent', color: '#ffffff',
    border: '1.5px solid rgba(255,255,255,0.5)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em',
  },
  scroll: {
    position: 'absolute', bottom: '-120px', left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
  },
  scrollLine: {
    width: '1px', height: '48px',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
    animation: 'pulse 2s infinite',
  },
  scrollText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px', letterSpacing: '0.18em',
    color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
  },
  badges: {
    position: 'absolute', bottom: '40px', left: 0, right: 0,
    display: 'flex', justifyContent: 'center',
    gap: '12px', flexWrap: 'wrap', padding: '0 24px', zIndex: 10,
  },
  badge: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em',
    color: 'rgba(255,255,255,0.7)',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '99px', padding: '7px 16px',
  },
};
