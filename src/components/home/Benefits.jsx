import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const icons = ['🌿','🛡️','📍','♻️'];

export default function Benefits() {
  const { t } = useLanguage();
  const b = { ...(t.benefits || {}), ...(t.home_benefits || {}) };
  const items = b.items || [
    { title: b.item1Title, desc: b.item1Desc },
    { title: b.item2Title, desc: b.item2Desc },
    { title: b.item3Title, desc: b.item3Desc },
    { title: b.item4Title, desc: b.item4Desc },
  ];

  return (
    <section className="section" style={{ background:'#0F2F24', position: 'relative' }}>
      <div className="container">
        <motion.div style={{ textAlign:'center', marginBottom:'56px' }}
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
        >
          <div style={{ ...labelStyle, color:'#7BAA8D' }}>{b.title || 'Why Microgreens'}</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,4vw,3rem)', color:'#ffffff', whiteSpace:'pre-line', lineHeight:1.15 }}>
            {b.sub1 || 'Small plants.'}{'\n'}{b.sub2 || 'Powerful nutrition.'}
          </h2>
        </motion.div>

        <div className="grid-4">
          {items.map((item, i) => (
            <motion.div key={i} style={styles.card}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.55, delay:i*0.12 }}
              whileHover={{ y:-6, background:'rgba(123,170,141,0.12)' }}
            >
              <div style={styles.icon}>{icons[i]}</div>
              <h3 style={styles.title}>{item.title}</h3>
              <p style={styles.desc}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const labelStyle = { fontFamily:"'Inter',sans-serif", fontSize:'11px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'16px' };

const styles = {
  grid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px' },
  card: {
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:'16px', padding:'36px 28px',
    transition:'all 0.3s ease', cursor:'default',
  },
  icon: { fontSize:'2rem', marginBottom:'20px' },
  title: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.25rem', color:'#ffffff', marginBottom:'12px', fontWeight:400 },
  desc: { fontSize:'14px', color:'rgba(255,255,255,0.6)', lineHeight:1.7 },
};
