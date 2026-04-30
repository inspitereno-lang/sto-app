import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

import aboutImg from '../../assets/Blaire Diamond Initial Pendant.jpg';

export default function AboutSection() {
  const { t } = useLanguage();
  // Merge static fallbacks with dynamic content for maximum stability
  const a = { ...(t.about || {}), ...(t.home_about || {}) };

  return (
    <section className="section" style={{ background: '#FAFAF8' }}>
      <div className="container res-grid-2">
        {/* Left: image */}
        <motion.div
          style={styles.imgCol}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={styles.imgWrap}>
            <img
              src={aboutImg}
              alt="STO microgreens farm"
              style={styles.img}
            />
          </div>
          <div style={styles.floatCard} className="about-stat-card">
            <div style={styles.floatStat}>{a.statVal || '95%'}</div>
            <div style={styles.floatLabel} dangerouslySetInnerHTML={{ __html: (a.statLabel || 'Less water<br/>than soil farming').replace('\n', '<br/>') }} />
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          style={styles.textCol}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="section-label">{a.label}</div>
          <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>{a.title}</h2>
          <p style={styles.body}>{a.body}</p>

          <div style={styles.pillars}>
            <div style={styles.pillar}>
              <div style={styles.pillarIcon}>🌱</div>
              <div>
                <div style={styles.pillarTitle}>{a.missionLabel}</div>
                <div style={styles.pillarText}>{a.missionText}</div>
              </div>
            </div>
            <div style={styles.pillar}>
              <div style={styles.pillarIcon}>✦</div>
              <div>
                <div style={styles.pillarTitle}>{a.visionLabel}</div>
                <div style={styles.pillarText}>{a.vision}</div>
              </div>
            </div>
          </div>

          <Link to="/about" className="btn btn-outline" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
            {a.cta || 'Our Story'} <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' },
  imgCol: { position: 'relative' },
  imgWrap: { borderRadius: '20px', overflow: 'hidden', aspectRatio: '1/1' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  floatCard: {
    position: 'absolute', bottom: '-24px', right: '-24px',
    background: '#0F2F24', color: '#ffffff',
    borderRadius: '16px', padding: '24px 28px',
    boxShadow: '0 16px 48px rgba(15,47,36,0.25)',
  },
  floatStat: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2.8rem', fontWeight: 300, color: '#7BAA8D', lineHeight: 1,
  },
  floatLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginTop: '6px' },
  textCol: { display: 'flex', flexDirection: 'column', gap: '20px' },
  body: { fontSize: '16px', color: '#6b6b6b', lineHeight: 1.8, maxWidth: '480px' },
  pillars: { display: 'flex', flexDirection: 'column', gap: '20px', margin: '8px 0' },
  pillar: { display: 'flex', gap: '16px', alignItems: 'flex-start' },
  pillarIcon: { fontSize: '20px', marginTop: '2px', flexShrink: 0 },
  pillarTitle: { fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0F2F24', marginBottom: '4px' },
  pillarText: { fontSize: '14px', color: '#6b6b6b', lineHeight: 1.6 },
};
