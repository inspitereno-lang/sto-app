import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './FAQPage.css';

const styles = {
  hero: { padding: '80px 0 60px', background: '#ffffff', textAlign: 'center' },
  eyebrow: { color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '14px', fontWeight: 600 },
  title: { fontSize: '48px', margin: '16px 0', color: '#0F2F24' },
  sub: { fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' },
  accordion: { background: '#ffffff', borderRadius: '12px', border: '1px solid #eae7e1', padding: '0 24px' },
  item: { padding: '24px 0' },
  question: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' },
  qText: { fontSize: '18px', fontWeight: 600, color: '#0F2F24' },
  answer: { padding: '16px 0 0', color: '#666', lineHeight: '1.6' },
  contactCard: { marginTop: '60px', background: '#0F2F24', padding: '40px', borderRadius: '12px', textAlign: 'center', color: '#fff' },
  iconCircle: { width: '48px', height: '48px', background: '#B8860B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' },
  cardTitle: { fontSize: '24px', marginBottom: '8px' },
  cardText: { marginBottom: '20px', color: '#ccc' }
};

export default function FAQPage() {
  const { t } = useLanguage();
  const a = t.faq_page || t.faqPage || {};
  const [openIdx, setOpenIdx] = useState(0);

  const items = a.items || [
    { q: a.q1, a: a.a1 },
    { q: a.q2, a: a.a2 },
    { q: a.q3, a: a.a3 },
    { q: a.q4, a: a.a4 }
  ].filter(i => i.q); // Only show if question exists

  return (
    <main style={{ paddingTop: '80px', background: '#FAFAF8', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={styles.hero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center' }}>
            <span style={styles.eyebrow}>{t.nav.faq}</span>
            <h1 style={styles.title}>{a.title}</h1>
            <p style={styles.sub}>{a.sub}</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={styles.accordion}>
            {items.map((item, idx) => (
              <div key={idx} style={{ ...styles.item, borderBottom: idx === items.length - 1 ? 'none' : '1px solid #eae7e1' }}>
                <button onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)} style={styles.question}>
                  <span style={styles.qText}>{item.q}</span>
                  <motion.div animate={{ rotate: openIdx === idx ? 180 : 0 }}>
                    <ChevronDown size={20} strokeWidth={1.5} color="#0F2F24" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                      <div style={styles.answer}>{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={styles.contactCard}>
            <div style={styles.iconCircle}><Mail size={24} color="#ffffff" strokeWidth={1.5} /></div>
            <h3 style={styles.cardTitle}>{a.commonTitle}</h3>
            <p style={styles.cardText}>{a.commonSub}</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '12px', display: 'inline-block' }}>{t.nav.contact}</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
