import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();
  const te = t.home_testimonials || t.testimonials || {};
  const items = te.items || [
    { text: te.t1Text || te.t1?.text, name: te.t1Author || te.t1?.name, loc: te.t1Loc || te.t1?.loc },
    { text: te.t2Text || te.t2?.text, name: te.t2Author || te.t2?.name, loc: te.t2Loc || te.t2?.loc },
    { text: te.t3Text || te.t3?.text, name: te.t3Author || te.t3?.name, loc: te.t3Loc || te.t3?.loc },
  ];

  return (
    <section className="section" style={{ background:'#F3F0EA', position: 'relative' }}>
      <div className="container">
        <motion.div style={{ textAlign:'center', marginBottom:'56px' }}
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
        >
          <div className="section-label">{te.label || 'Trusted by Nordic Households'}</div>
          <h2 className="section-title">{te.title || 'What our customers say.'}</h2>
        </motion.div>

        <div className="grid-3">
          {items.map((item, i) => (
            <motion.div key={i} style={styles.card}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.12 }}
              whileHover={{ y:-4, boxShadow:'0 16px 48px rgba(15,47,36,0.12)' }}
            >
              <div style={styles.stars}>{'★★★★★'}</div>
              <p style={styles.text}>"{item.text}"</p>
              <div style={styles.author}>
                <div style={styles.avatar}>{item.name[0]}</div>
                <div>
                  <div style={styles.name}>{item.name}</div>
                  <div style={styles.loc}>{item.loc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  grid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' },
  card: {
    background:'#ffffff', borderRadius:'16px', padding:'36px 32px',
    border:'1px solid #eae7e1',
    display:'flex', flexDirection:'column', gap:'20px',
    transition:'all 0.3s ease',
    boxShadow:'0 2px 8px rgba(15,47,36,0.05)',
  },
  stars: { color:'#C9A96E', fontSize:'16px', letterSpacing:'2px' },
  text: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.15rem', color:'#0F2F24', lineHeight:1.7, fontStyle:'italic', flex:1 },
  author: { display:'flex', alignItems:'center', gap:'14px', borderTop:'1px solid #eae7e1', paddingTop:'20px' },
  avatar: {
    width:'44px', height:'44px', borderRadius:'50%',
    background:'#0F2F24', color:'#ffffff',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontWeight:400,
    flexShrink:0,
  },
  name: { fontFamily:"'Inter',sans-serif", fontSize:'13px', fontWeight:500, color:'#0F2F24' },
  loc: { fontSize:'12px', color:'#9a9a9a', marginTop:'2px' },
};
