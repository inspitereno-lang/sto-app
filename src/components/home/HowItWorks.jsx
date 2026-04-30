import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();
  const h = { ...(t.how || {}), ...(t.home_process || {}) };
  const steps = h.steps || [
    { title: h.step1Title, desc: h.step1Desc },
    { title: h.step2Title, desc: h.step2Desc },
    { title: h.step3Title, desc: h.step3Desc },
    { title: h.step4Title, desc: h.step4Desc },
  ];

  return (
    <section className="section" style={{ background:'#FAFAF8', position: 'relative' }}>
      <div className="container">
        <motion.div style={{ textAlign:'center', marginBottom:'64px' }}
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
        >
          <div className="section-label">{h.label || h.title || 'The Process'}</div>
          <h2 className="section-title" style={{ whiteSpace:'pre-line' }}>{h.sub1 ? `${h.sub1}\n${h.sub2}` : h.title}</h2>
        </motion.div>

        <div className="res-grid-4">
          {steps.map((step, i) => (
            <motion.div key={i} style={{ ...styles.step, padding: '0' }}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.15 }}
            >
              <div style={styles.stepTop}>
                <div style={styles.number}>{String(i+1).padStart(2,'0')}</div>
                {i < (steps ? steps.length : 0) - 1 && <div style={styles.line} className="mobile-hide" />}
              </div>
              <div style={styles.icon}>{['🌱','✂️','📦','🚴'][i]}</div>
              <h3 style={styles.title}>{step.title}</h3>
              <p style={styles.desc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  timeline: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0', position:'relative' },
  step: { padding:'0 24px 0 0', display:'flex', flexDirection:'column', gap:'12px' },
  stepTop: { display:'flex', alignItems:'center', marginBottom:'4px' },
  number: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2.5rem', color:'#EAE7E1', fontWeight:300, lineHeight:1, marginRight:'16px', flexShrink:0 },
  line: { flex:1, height:'1px', background:'#e0ddd6' },
  icon: { fontSize:'1.5rem', marginBottom:'4px' },
  title: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', color:'#0F2F24', fontWeight:400 },
  desc: { fontSize:'14px', color:'#6b6b6b', lineHeight:1.7 },
};
