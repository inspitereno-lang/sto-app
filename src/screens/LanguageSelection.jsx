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
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6 }}
          style={styles.wrapper}
        >
          {/* Decorative leaf removed for cleaner dark look */}

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={styles.logoWrap}
          >
            <div style={styles.logo}>STO</div>
            <div style={styles.logoSub}>PURE. LOCAL. SUSTAINABLE.</div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={styles.heading}
          >
            Choose your experience
          </motion.h1>

          {/* Language Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={styles.cards}
          >
            {langs.map((lang, i) => (
              <motion.button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(15,47,36,0.15)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...styles.card,
                  ...(selected === lang.code ? styles.cardSelected : {}),
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
              >
                <div style={styles.cardImg}>
                  <img
                    src={lang.img}
                    alt={lang.name}
                    style={styles.img}
                    onError={(e) => { e.target.style.background = '#e8e4de'; e.target.style.display = 'none'; }}
                  />
                </div>
                <div style={styles.cardName}>{lang.name}</div>
                <div style={styles.cardSub}>{lang.sub.toUpperCase()}</div>
              </motion.button>
            ))}
          </motion.div>

          {/* Remember checkbox */}
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            style={styles.remember}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              style={styles.checkbox}
            />
            Remember my selection
          </motion.label>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={styles.footerText}
          >
            EXPERIENCE SUSTAINABLE AGRICULTURE ROOTED IN SISU. SELECT YOUR PREFERENCE TO CONTINUE.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  wrapper: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: `linear-gradient(rgba(8, 24, 18, 0.75), rgba(8, 24, 18, 0.85)), url(${splashBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '40px 24px', minHeight: '100vh', overflowY: 'auto',
  },
  leafBg: {
    position: 'absolute', bottom: '-40px', right: '-40px', pointerEvents: 'none', userSelect: 'none',
  },
  logoWrap: { textAlign: 'center', marginBottom: 'clamp(16px, 4vh, 40px)' },
  logo: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 400, letterSpacing: '0.12em',
    color: '#ffffff', marginBottom: '8px',
  },
  logoSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px', fontWeight: 500,
    letterSpacing: '0.22em', color: '#7BAA8D',
  },
  heading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.3rem, 3vw, 2rem)',
    fontWeight: 400, color: 'rgba(255,255,255,0.9)',
    marginBottom: 'clamp(20px, 5vh, 40px)', textAlign: 'center', letterSpacing: '-0.01em',
  },
  cards: {
    display: 'flex', gap: '20px', flexWrap: 'wrap',
    justifyContent: 'center', marginBottom: 'clamp(16px, 4vh, 32px)', width: '100%', maxWidth: '900px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: 'clamp(20px, 3vh, 36px) clamp(20px, 4vw, 40px)',
    cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 'clamp(8px, 2vh, 12px)', minWidth: '160px', flex: '1 1 200px', maxWidth: '280px',
    transition: 'all 0.3s ease',
  },
  cardSelected: {
    borderColor: '#7BAA8D',
    background: 'rgba(255, 255, 255, 0.12)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  cardImg: {
    width: 'clamp(48px, 12vw, 72px)', height: 'clamp(48px, 12vw, 72px)', borderRadius: '50%',
    overflow: 'hidden', background: '#e8e4de',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  cardName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', fontWeight: 400, color: '#ffffff',
  },
  cardSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px', fontWeight: 500,
    letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)',
  },
  remember: {
    display: 'flex', alignItems: 'center', gap: '10px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', marginBottom: '24px',
  },
  checkbox: { width: '16px', height: '16px', accentColor: '#7BAA8D', cursor: 'pointer' },
  footerText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px', letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.4)', textAlign: 'center', maxWidth: '400px', lineHeight: 1.8,
  },
};
