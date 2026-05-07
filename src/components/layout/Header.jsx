import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, ChevronDown, LogOut, Package, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import './Header.css';

const langs = [
  { code: 'fi', label: 'FI' },
  { code: 'en', label: 'EN' },
  { code: 'sv', label: 'SV' },
  { code: 'no', label: 'NO' },
  { code: 'da', label: 'DA' },
  { code: 'et', label: 'ET' },
  { code: 'de', label: 'DE' },
  { code: 'nl', label: 'NL' },
  { code: 'fr', label: 'FR' },
  { code: 'pl', label: 'PL' },
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' },
  { code: 'pt', label: 'PT' },
  { code: 'el', label: 'EL' },
  { code: 'tr', label: 'TR' },
  { code: 'jp', label: 'JP' },
  { code: 'ar', label: 'AR' },
];

export default function Header() {
  const { count } = useCart();
  const { language, selectLanguage, t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!langOpen && !userOpen) return;
    const close = () => { setLangOpen(false); setUserOpen(false); };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [langOpen, userOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserOpen(false);
    navigate('/');
  };

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  const n = t.nav || {};
  const navLinks = [
    { to: '/', label: n.home || 'Home' },
    { to: '/shop', label: n.shop || 'Shop' },
    { to: '/about', label: n.about || 'About' },
    { to: '/blog', label: n.blog || 'Blog' },
    { to: '/feedback', label: n.feedback || 'Feedback' },
    { to: '/contact', label: n.contact || 'Contact' },
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''} ${transparent ? 'header--transparent' : ''}`}>
        <div className="header__inner container">
          {/* Logo */}
          <Link to="/" className="header__logo">
            <img src="/PHOTO-2026-04-29-14-23-54.png" alt="STO" className="header__logo-img" />
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`header__link ${location.pathname === l.to ? 'header__link--active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="header__actions">
            {/* Language switcher */}
            <div className="header__lang" onClick={e => e.stopPropagation()}>
              <button
                className="header__lang-btn"
                onClick={() => setLangOpen(p => !p)}
                aria-label="Select language"
              >
                {(language || 'en').toUpperCase()}
                <ChevronDown size={12} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className="header__lang-dropdown"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {langs.map(l => (
                      <button
                        key={l.code}
                        className={`header__lang-option ${language === l.code ? 'active' : ''}`}
                        onClick={() => { selectLanguage(l.code, true); setLangOpen(false); }}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="header__user" onClick={e => e.stopPropagation()}>
              <button
                className="header__icon-btn"
                onClick={() => token ? setUserOpen(p => !p) : navigate('/account')}
                aria-label="Account"
              >
                <User size={20} />
              </button>

              <AnimatePresence>
                {userOpen && token && (
                  <motion.div
                    className="header__user-dropdown"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="header__user-info">
                      <div className="header__user-name">{user?.username || n.customer || 'Asiakas'}</div>
                    </div>
                    <div className="header__user-divider" />
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="header__user-link" onClick={() => setUserOpen(false)}>
                        <Shield size={14} /> {n.adminDashboard || 'Hallintapaneeli'}
                      </Link>
                    )}
                    <Link to="/orders" className="header__user-link" onClick={() => setUserOpen(false)}>
                      <Package size={14} /> {t.nav.account}
                    </Link>
                    <button className="header__user-link logout" onClick={handleLogout}>
                      <LogOut size={14} /> {n.logout || 'Logout'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/cart" className="header__icon-btn header__cart-btn" aria-label="Cart">
              <ShoppingCart size={20} />
              {count > 0 && <span className="header__cart-badge">{count}</span>}
            </Link>

            {/* Hamburger */}
            <button
              className="header__hamburger"
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            >
              <div className="mobile-menu__header">
                <Link to="/" className="mobile-menu__logo">
                  <img src="/PHOTO-2026-04-29-14-23-54.png" alt="STO" className="header__logo-img" style={{ height: '40px' }} />
                </Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={24} /></button>
              </div>
              <div className="mobile-menu__links">
                {navLinks.map(l => (
                  <Link key={l.to} to={l.to} className="mobile-menu__link">{l.label}</Link>
                ))}
                <Link to="/cart" className="mobile-menu__link">
                  {t.nav.cart} {count > 0 && <span className="mobile-badge">{count}</span>}
                </Link>
                <Link to={localStorage.getItem('token') ? '/orders' : '/account'} className="mobile-menu__link">
                  {localStorage.getItem('token') ? (n.profile || 'My Profile') : (n.account || 'Account')}
                </Link>
              </div>

              <div className="mobile-menu__footer">
                <div style={{ fontSize: '12px', color: '#9a9a9a' }}>
                  © 2026 Saana Tuotanto Oy
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
