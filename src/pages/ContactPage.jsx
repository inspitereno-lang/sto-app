import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Send, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact_page || t.contact || {};
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  const infos = [
    { icon: MapPin, label: c.address, value: c.addressVal },
    { icon: Mail, label: c.emailContact, value: c.emailVal },
    { icon: Briefcase, label: c.businessIdLabel, value: c.businessIdVal },
  ];

  return (
    <main style={{ paddingTop:'80px', background:'#FAFAF8', minHeight:'100vh' }}>
      {/* Banner */}
      <div style={styles.banner}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
          <div style={styles.bannerLabel}>{c.bannerLabel}</div>
          <h1 style={styles.bannerTitle}>{c.title}</h1>
          <p style={styles.bannerSub}>{c.sub}</p>
        </motion.div>
      </div>

      <div className="container" style={{ padding:'48px 24px' }}>
        <div className="res-grid-2">
          {/* Info */}
          <motion.div style={styles.infoCol} initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <h2 style={styles.infoTitle}>{c.infoTitle}</h2>
            <p style={styles.infoBody}>{c.infoBody}</p>
            <div style={styles.infos}>
              {infos.map(({ icon: Icon, label, value }, idx) => (
                <div key={`${label}-${idx}`} style={styles.infoRow}>
                  <div style={styles.infoIcon}><Icon size={16} style={{ color:'#7BAA8D' }}/></div>
                  <div>
                    <div style={styles.infoLabel}>{label}</div>
                    <div style={styles.infoValue}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.mapPlaceholder}>
              <div style={styles.mapLabel}>Vantaa, Finland</div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}>
            {!sent ? (
              <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.formTitle}>{c.formTitle}</h2>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">{c.nameLabel}</label>
                  <input id="contact-name" type="text" value={form.name} onChange={e=>set('name',e.target.value)}
                    placeholder="Your name" className="form-input" required/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">{c.emailLabel}</label>
                  <input id="contact-email" type="email" value={form.email} onChange={e=>set('email',e.target.value)}
                    placeholder="you@example.com" className="form-input" required/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-msg">{c.msgLabel}</label>
                  <textarea id="contact-msg" value={form.message} onChange={e=>set('message',e.target.value)}
                    placeholder="How can we help you?" className="form-input"
                    style={{ resize:'vertical', minHeight:'140px' }} required/>
                </div>
                <motion.button type="submit" className="btn btn-primary"
                  style={{ width:'100%', justifyContent:'center', display:'flex', alignItems:'center', gap:'8px' }}
                  whileTap={{ scale:0.97 }}>
                  <Send size={15}/> {c.send}
                </motion.button>
              </form>
            ) : (
              <motion.div style={styles.successCard} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}>
                <div style={{ fontSize:'3rem', marginBottom:'16px' }}>✉️</div>
                <h3 style={styles.successTitle}>{c.successTitle}</h3>
                <p style={styles.successText}>{c.successText}</p>
                <button className="btn btn-outline" onClick={() => setSent(false)}>{c.sendAnother}</button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  banner: { background:'linear-gradient(135deg, #0F2F24 0%, #1a4a3a 100%)', padding:'80px 24px 64px', textAlign:'center' },
  bannerLabel: { fontFamily:"'Inter',sans-serif", fontSize:'11px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', color:'#7BAA8D', marginBottom:'12px' },
  bannerTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,6vw,4rem)', color:'#ffffff', fontWeight:300, marginBottom:'12px' },
  bannerSub: { fontSize:'15px', color:'rgba(255,255,255,0.6)', maxWidth:'400px', margin:'0 auto', lineHeight:1.7 },
  layout: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'start' },
  infoCol: { display:'flex', flexDirection:'column', gap:'28px' },
  infoTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', color:'#0F2F24', fontWeight:400 },
  infoBody: { fontSize:'15px', color:'#6b6b6b', lineHeight:1.8 },
  infos: { display:'flex', flexDirection:'column', gap:'20px' },
  infoRow: { display:'flex', gap:'14px', alignItems:'flex-start' },
  infoIcon: { width:'36px', height:'36px', background:'#eaf2ee', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  infoLabel: { fontFamily:"'Inter',sans-serif", fontSize:'10px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#9a9a9a', marginBottom:'3px' },
  infoValue: { fontSize:'15px', color:'#0F2F24', fontWeight:500 },
  mapPlaceholder: { background:'linear-gradient(135deg, #0F2F24, #1a4a3a)', borderRadius:'16px', padding:'40px', textAlign:'center' },
  mapLabel: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', color:'#ffffff', marginBottom:'8px' },
  mapSub: { fontSize:'13px', color:'rgba(255,255,255,0.6)' },
  form: { background:'#ffffff', border:'1px solid #eae7e1', borderRadius:'20px', padding:'40px', display:'flex', flexDirection:'column', gap:'0', boxShadow:'0 4px 24px rgba(15,47,36,0.07)' },
  formTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', color:'#0F2F24', fontWeight:400, marginBottom:'28px' },
  successCard: { background:'#ffffff', border:'1px solid #eae7e1', borderRadius:'20px', padding:'60px 40px', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'14px', boxShadow:'0 4px 24px rgba(15,47,36,0.07)' },
  successTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', color:'#0F2F24', fontWeight:400 },
  successText: { fontSize:'15px', color:'#6b6b6b', lineHeight:1.7, maxWidth:'320px' },
};
