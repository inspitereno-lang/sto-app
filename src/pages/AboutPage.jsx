import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about_page || t.aboutPage || {};
  const values = a.values || [
    { icon: '🌿', title: a.v1Title, text: a.v1Desc },
    { icon: '🏙️', title: a.v2Title, text: a.v2Desc },
    { icon: '🇫🇮', title: a.v3Title, text: a.v3Desc },
    { icon: '💎', title: a.v4Title, text: a.v4Desc }
  ];

  return (
    <main style={{ paddingTop:'80px', background:'#FAFAF8' }}>
      {/* Hero */}
      <div style={styles.hero}>
        <img src="https://images.unsplash.com/photo-1530836176759-510f3df66900?w=1600&q=85"
          alt="STO farm" style={styles.heroBg}
          onError={e=>{e.target.src='https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=85';}}/>
        <div style={styles.heroOverlay}/>
        <motion.div style={styles.heroContent} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
          <div style={styles.eyebrow}>{a.hero}</div>
          <h1 style={styles.heroTitle}>{a.title}</h1>
        </motion.div>
      </div>

      {/* Story */}
      <section className="section">
        <div className="container res-grid-2">
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <div className="section-label">{a.storyLabel}</div>
            <h2 className="section-title">{a.storyTitle}</h2>
            <p style={styles.body}>{a.p1}</p>
            <p style={{ ...styles.body, marginTop:'16px' }}>{a.p2}</p>
          </motion.div>
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.15 }}>
            <div style={styles.imgWrap}>
              <img src="https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=700&q=80"
                alt="STO growing" style={styles.img}
                onError={e=>{e.target.src='https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=700&q=80';}}/>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ background: '#F0F0EB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-label">{a.valuesLabel}</div>
            <h2 className="section-title">{a.valuesTitle}</h2>
          </div>
          <div style={styles.valuesGrid} className="res-grid-4">
            {values.map((value, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} style={styles.valueCard} whileHover={{ y: -4 }}>
                <div style={{ fontSize:'2rem', marginBottom:'14px' }}>{value.icon}</div>
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={styles.valueText}>{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background:'#0F2F24' }}>
        <div className="container res-grid-2">
          {[{ label: a.mission, text: a.missionText, icon:'🌱' }, { label: a.vision, text: a.visionText, icon:'✦' }].map((item, i) => (
            <motion.div key={i} style={styles.mvCard}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.15 }}>
              <div style={{ fontSize:'2rem', marginBottom:'20px' }}>{item.icon}</div>
              <h2 style={styles.mvTitle}>{item.label}</h2>
              <p style={styles.mvText}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-sm" style={{ background:'#FAFAF8', textAlign:'center' }}>
        <div className="container" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'24px' }}>
          <h2 className="section-title">{a.readyTitle}</h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn-primary">{t.nav.shop}</Link>
            <Link to="/contact" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {t.nav.contact} <ArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles = {
  hero: { position:'relative', height:'60vh', minHeight:'440px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' },
  heroBg: { position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' },
  heroOverlay: { position:'absolute', inset:0, background:'rgba(10,28,20,0.6)' },
  heroContent: { position:'relative', zIndex:1, textAlign:'center', padding:'0 24px' },
  eyebrow: { fontFamily:"'Inter',sans-serif", fontSize:'11px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:'16px' },
  heroTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,6vw,5rem)', color:'#ffffff', fontWeight:300, whiteSpace:'pre-line', lineHeight:1.1, letterSpacing:'-0.01em' },
  body: { fontSize:'16px', color:'#6b6b6b', lineHeight:1.8 },
  imgWrap: { borderRadius:'20px', overflow:'hidden', aspectRatio:'4/5' },
  img: { width:'100%', height:'100%', objectFit:'cover' },
  mvCard: { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'20px', padding:'48px 40px' },
  mvTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', color:'#ffffff', fontWeight:400, marginBottom:'16px' },
  mvText: { fontSize:'15px', color:'rgba(255,255,255,0.65)', lineHeight:1.8 },
  valuesGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px' },
  valueCard: { background:'#ffffff', borderRadius:'16px', padding:'32px 24px', border:'1px solid #eae7e1', transition:'all 0.3s ease', cursor:'default' },
  valueTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', color:'#0F2F24', fontWeight:400, marginBottom:'10px' },
  valueText: { fontSize:'13px', color:'#6b6b6b', lineHeight:1.7 },
};
