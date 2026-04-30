import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import splashBg from '../assets/Blaire Diamond Initial Pendant.jpg';

const langs = [
  {
    code: 'fi',
    name: 'Suomi',
    sub: 'Finnish',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=120&q=80',
  },
  {
    code: 'en',
    name: 'English',
    sub: 'International',
    img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=120&q=80',
  },
  {
    code: 'sv',
    name: 'Svenska',
    sub: 'Swedish',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&q=80',
  },
  {
    code: 'no',
    name: 'Norsk',
    sub: 'Norwegian',
    img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=120&q=80',
  },
  {
    code: 'da',
    name: 'Dansk',
    sub: 'Danish',
    img: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=120&q=80',
  },
  {
    code: 'et',
    name: 'Eesti',
    sub: 'Estonian',
    img: 'https://images.unsplash.com/photo-1548432757-55030263640b?w=120&q=80',
  },
  {
    code: 'de',
    name: 'Deutsch',
    sub: 'German',
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=120&q=80',
  },
  {
    code: 'nl',
    name: 'Nederlands',
    sub: 'Dutch',
    img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=120&q=80',
  },
  {
    code: 'fr',
    name: 'Français',
    sub: 'French',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=120&q=80',
  },
  {
    code: 'pl',
    name: 'Polski',
    sub: 'Polish',
    img: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=120&q=80',
  },
  {
    code: 'es',
    name: 'Español',
    sub: 'Spanish',
    img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=120&q=80',
  },
  {
    code: 'it',
    name: 'Italiano',
    sub: 'Italian',
    img: 'https://images.unsplash.com/photo-1529243856184-fd5465488984?w=120&q=80',
  },
  {
    code: 'pt',
    name: 'Português',
    sub: 'Portuguese',
    img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=120&q=80',
  },
  {
    code: 'el',
    name: 'Ελληνικά',
    sub: 'Greek',
    img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=120&q=80',
  },
  {
    code: 'tr',
    name: 'Türkçe',
    sub: 'Turkish',
    img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=120&q=80',
  },
  {
    code: 'jp',
    name: '日本語',
    sub: 'Japanese',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=120&q=80',
  },
  {
    code: 'ar',
    name: 'العربية',
    sub: 'Arabic',
    img: 'https://images.unsplash.com/photo-1517036324933-2895f32468bc?w=120&q=80',
  },
];

export default function LanguageSelection() {
  const { selectLanguage } = useLanguage();
  const [remember, setRemember] = useState(false);
  const [selected, setSelected] = useState(null);
  const [exiting, setExiting] = useState(false);

  const handleSelect = (code) => {
    setSelected(code);
    setExiting(true);
    setTimeout(() => selectLanguage(code, remember), 700);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="lang-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={styles.wrapper}
        >
          {/* Background Overlay */}
          <div style={styles.overlay} />

          <div style={styles.content}>
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              style={styles.logoWrap}
            >
              <div style={styles.logo}>STO</div>
              <div style={styles.logoSub}>PURE. LOCAL. SUSTAINABLE.</div>
            </motion.div>

            {/* Heading Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={styles.headerText}
            >
              <h1 style={styles.heading}>Choose your experience</h1>
              <p style={styles.subHeading}>Select your preferred language to explore our sustainable collections.</p>
            </motion.div>

            {/* Language Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={styles.cardsGrid}
            >
              {langs.map((lang, i) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  whileHover={{ 
                    y: -4,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(123, 170, 141, 0.5)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    ...styles.card,
                    ...(selected === lang.code ? styles.cardSelected : {}),
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                >
                  <div style={styles.cardImgWrap}>
                    <img
                      src={lang.img}
                      alt={lang.name}
                      style={styles.img}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div style={styles.cardInfo}>
                    <span style={styles.cardName}>{lang.name}</span>
                    <span style={styles.cardSub}>{lang.sub}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Actions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={styles.footer}
            >
              <label style={styles.remember}>
                <div style={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    style={styles.checkbox}
                  />
                  <div style={{...styles.customCheckbox, ...(remember ? styles.customCheckboxChecked : {})}}>
                    {remember && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
                <span>Remember my selection</span>
              </label>

              <p style={styles.footerNote}>
                EXPERIENCE SUSTAINABLE AGRICULTURE ROOTED IN SISU.<br/>
                YOUR PREFERENCE HELPS US PERSONALIZE YOUR JOURNEY.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  wrapper: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: `url(${splashBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(8, 24, 18, 0.95) 100%)',
    zIndex: -1,
  },
  content: {
    width: '100%',
    maxWidth: '1000px',
    padding: 'clamp(40px, 8vh, 80px) 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100%',
  },
  logoWrap: {
    textAlign: 'center',
    marginBottom: 'clamp(32px, 6vh, 60px)',
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(3rem, 8vw, 4.5rem)',
    fontWeight: 300,
    letterSpacing: '0.2em',
    color: '#ffffff',
    lineHeight: 1,
    marginBottom: '12px',
  },
  logoSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.3em',
    color: '#7BAA8D',
    textTransform: 'uppercase',
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 'clamp(40px, 6vh, 64px)',
    maxWidth: '500px',
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
    fontWeight: 400,
    color: '#ffffff',
    marginBottom: '12px',
    letterSpacing: '0.02em',
  },
  subHeading: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(13px, 2vw, 15px)',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.6,
    fontWeight: 300,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))',
    gap: '16px',
    width: '100%',
    marginBottom: '60px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    padding: '20px 16px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    outline: 'none',
  },
  cardSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: '#7BAA8D',
    boxShadow: '0 0 20px rgba(123, 170, 141, 0.2)',
  },
  cardImgWrap: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '16px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  cardName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '18px',
    fontWeight: 500,
    color: '#ffffff',
  },
  cardSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
    marginTop: 'auto',
    paddingBottom: '20px',
  },
  remember: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkboxWrapper: {
    position: 'relative',
    width: '20px',
    height: '20px',
  },
  checkbox: {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
    height: 0,
    width: 0,
  },
  customCheckbox: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '20px',
    width: '20px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  customCheckboxChecked: {
    backgroundColor: '#7BAA8D',
    borderColor: '#7BAA8D',
  },
  footerNote: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px',
    letterSpacing: '0.15em',
    color: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    lineHeight: 1.8,
    textTransform: 'uppercase',
    maxWidth: '450px',
  },
};

