import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { language, t } = useLanguage();
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

      {/* Business Areas Section */}
      <section className="section" style={{ background: '#FAFAF8', padding: '80px 0 60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label" style={{ color: '#7BAA8D', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '11px', marginBottom: '8px' }}>
              {language === 'fi' ? 'LIIKETOIMINTA-ALUEEMME' : 'OUR BUSINESS AREAS'}
            </div>
            <h2 className="section-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#0F2F24', fontWeight: 300 }}>
              {language === 'fi' ? 'Monipuoliset Palvelumme' : 'Diverse Verticals of STO'}
            </h2>
            <p style={{ color: '#6b6b6b', fontSize: '15px', maxWidth: '600px', margin: '12px auto 0', lineHeight: 1.6 }}>
              {language === 'fi' 
                ? 'STO yhdistää luonnon, elämäntyylin ja huipputeknologian saumattomaksi kokonaisuudeksi kolmella päätoimialallaan. Napsauta korttia nähdäksesi lisätietoja.'
                : 'From organic farming to premium lifestyle products and modern technology services, we bridge the gap between nature and innovation. Click a card to view detailed capabilities.'}
            </p>
          </div>

          <div style={styles.areasGrid} className="res-grid-3">
            {/* Area 1: STO Green */}
            <Link to="/about/green" style={{ textDecoration: 'none' }}>
              <motion.div 
                style={{
                  ...styles.areaCard,
                  borderTop: '4px solid #7BAA8D'
                }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(15, 47, 36, 0.08)', borderColor: '#7BAA8D' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ ...styles.areaIconBg, background: '#eaf2ee' }}>
                  <Leaf size={28} style={{ color: '#0F2F24' }} />
                </div>
                <h3 style={styles.areaCardTitle}>STO Green</h3>
                <p style={styles.areaCardDesc}>
                  {language === 'fi'
                    ? 'Huipputason pystyviljeltyjä versoja ja elävää ravintoa Vantaan puhtaasta laboratoriostamme.'
                    : 'Hyper-local vertical farming and high-vitality microgreens grown using sustainable climate automation.'}
                </p>
                <div style={{ ...styles.areaCardLink, color: '#7BAA8D' }}>
                  <span>{language === 'fi' ? 'Tutustu tarkemmin' : 'View Details'}</span>
                  <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </div>
              </motion.div>
            </Link>

            {/* Area 2: STO Gold */}
            <Link to="/about/gold" style={{ textDecoration: 'none' }}>
              <motion.div 
                style={{
                  ...styles.areaCard,
                  borderTop: '4px solid #CAA36D'
                }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(15, 47, 36, 0.08)', borderColor: '#CAA36D' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ ...styles.areaIconBg, background: '#fcf8f2' }}>
                  <span style={{ fontSize: '24px', lineHeight: 1 }}>✨</span>
                </div>
                <h3 style={styles.areaCardTitle}>STO Gold</h3>
                <p style={styles.areaCardDesc}>
                  {language === 'fi'
                    ? 'Ylelliset käsinvaletut kynttilät, korut ja pohjoismainen design arjen hemmotteluun.'
                    : 'Premium hand-poured Nordic candles, luxury jewelry, and lifestyle products curated for mindful moments.'}
                </p>
                <div style={{ ...styles.areaCardLink, color: '#CAA36D' }}>
                  <span>{language === 'fi' ? 'Tutustu tarkemmin' : 'View Details'}</span>
                  <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </div>
              </motion.div>
            </Link>

            {/* Area 3: STO IT & Tech */}
            <Link to="/about/it" style={{ textDecoration: 'none' }}>
              <motion.div 
                style={{
                  ...styles.areaCard,
                  borderTop: '4px solid #2b5c8f'
                }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(15, 47, 36, 0.08)', borderColor: '#2b5c8f' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ ...styles.areaIconBg, background: '#eef4f9' }}>
                  <span style={{ fontSize: '24px', lineHeight: 1 }}>💻</span>
                </div>
                <h3 style={styles.areaCardTitle}>STO IT</h3>
                <p style={styles.areaCardDesc}>
                  {language === 'fi'
                    ? 'Älykkäät ohjelmistoratkaisut, viljelyautomaatiojärjestelmät ja moderni digitaalinen arkkitehtuuri.'
                    : 'Bespoke software engineering, agricultural IoT systems, and high-performance digital consulting.'}
                </p>
                <div style={{ ...styles.areaCardLink, color: '#2b5c8f' }}>
                  <span>{language === 'fi' ? 'Tutustu tarkemmin' : 'View Details'}</span>
                  <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </div>
              </motion.div>
            </Link>
          </div>
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
  areasGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '32px', 
    marginTop: '40px' 
  },
  areaCard: { 
    background: '#ffffff', 
    border: '1px solid #eae7e1', 
    borderRadius: '24px', 
    padding: '40px 32px', 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-start',
    textAlign: 'left',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
    cursor: 'pointer' 
  },
  areaIconBg: { 
    width: '56px', 
    height: '56px', 
    borderRadius: '16px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: '24px' 
  },
  areaCardTitle: { 
    fontFamily: "'Cormorant Garamond', serif", 
    fontSize: '1.8rem', 
    color: '#0F2F24', 
    fontWeight: 400, 
    marginBottom: '12px' 
  },
  areaCardDesc: { 
    fontSize: '14px', 
    color: '#6b6b6b', 
    lineHeight: 1.7, 
    marginBottom: '24px',
    flexGrow: 1
  },
  areaCardLink: { 
    display: 'flex', 
    alignItems: 'center', 
    fontSize: '13px', 
    fontWeight: 600, 
    color: '#0F2F24', 
    fontFamily: "'Inter', sans-serif" 
  },
};
