import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

import sustainImg from '../../assets/closeup-sprouted-arugula-grow-wet-linen-mat.jpg';

export default function Sustainability() {
  const { t } = useLanguage();
  const s = { ...(t.sustainability || {}), ...(t.home_sustainability || {}) };

  return (
    <section className="section" style={{ background: '#F3F0EA', overflow: 'hidden', position: 'relative' }}>
      <div className="container res-grid-2">
        <motion.div style={styles.text}
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <div className="section-label">{s.title || s.label || 'Our Commitment'}</div>
          <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>{s.sub1 ? `${s.sub1}\n${s.sub2}` : s.title}</h2>
          <p style={styles.body}>{s.desc || s.body}</p>
          <div style={styles.stats}>
            <Stat number={s.stat1Val || "95%"} label={s.stat1Label || s.stat1} />
            <Stat number={s.stat2Val || "Net Zero"} label={s.stat2Label || s.stat2} />
            <Stat number={s.stat3Val || "100%"} label={s.stat3Label || s.stat3} />
          </div>
        </motion.div>

        <motion.div style={styles.imgCol}
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div style={styles.imgMain}>
            <img
              src={sustainImg}
              alt="Controlled indoor farming"
              style={styles.img}
            />
          </div>
          <div style={styles.imgSmall}>
            <img
              src="https://images.unsplash.com/photo-1530836176759-510f3df66900?w=400&q=80"
              alt="Sustainable packaging"
              style={styles.img}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&q=80'; }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div style={statStyles.wrap}>
      <div style={statStyles.number}>{number}</div>
      <div style={statStyles.label}>{label}</div>
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' },
  text: { display: 'flex', flexDirection: 'column', gap: '20px' },
  body: { fontSize: '16px', color: '#6b6b6b', lineHeight: 1.8 },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginTop: '8px' },
  imgCol: { position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  imgMain: { borderRadius: '16px', overflow: 'hidden', aspectRatio: '1/1', gridColumn: '1 / -1' },
  imgSmall: { borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3', display: 'none' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
};
const statStyles = {
  wrap: { background: '#ffffff', borderRadius: '12px', padding: '20px 16px', textAlign: 'center', boxShadow: '0 2px 8px rgba(15,47,36,0.06)' },
  number: { fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', color: '#0F2F24', fontWeight: 400, marginBottom: '6px' },
  label: { fontSize: '11px', color: '#6b6b6b', lineHeight: 1.5 },
};
