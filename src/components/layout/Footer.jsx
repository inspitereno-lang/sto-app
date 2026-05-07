import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer || {};

  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src="/PHOTO-2026-04-29-14-23-54.png" alt="STO" className="footer__logo-img" />
          </Link>
          <p className="footer__tagline">{f.tagline || f.desc}</p>
          <div className="footer__details" style={{ fontSize: '13px', color: '#9a9a9a', marginBottom: '24px', lineHeight: 1.6 }}>
            {f.address || 'Vantaa, Finland'}<br />
            {f.businessId || 'Business ID: 3617994-6'}
          </div>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram" className="footer__social">IG</a>
            <a href="#" aria-label="Facebook" className="footer__social">FB</a>
            <a href="#" aria-label="LinkedIn" className="footer__social">LI</a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer__col">
          <div className="footer__col-title">{f.explore}</div>
          <Link to="/shop" className="footer__link">{f.shop}</Link>
          <Link to="/about" className="footer__link">{f.about}</Link>
          <Link to="/blog" className="footer__link">{f.blog || 'Blog'}</Link>
          <Link to="/feedback" className="footer__link">{f.feedback || 'Feedback'}</Link>
          <Link to="/faq" className="footer__link">{f.faq}</Link>
          <Link to="/contact" className="footer__link">{f.contact || 'Contact'}</Link>
        </div>

        {/* Policies */}
        <div className="footer__col">
          <div className="footer__col-title">{f.policies || f.service}</div>
          <Link to="/terms" className="footer__link">{f.terms}</Link>
          <Link to="/privacy" className="footer__link">{f.privacy}</Link>
          <Link to="/returns" className="footer__link">{f.returns || 'Refund & Return Policy'}</Link>
        </div>

        {/* CTA Section */}
        <div className="footer__col footer__cta">
          <div className="footer__col-title">{f.ctaTitle || 'Have Questions?'}</div>
          <p className="footer__cta-sub">{f.ctaSub || 'Need help with your order or want to learn more about our seasonal drops?'}</p>
          <Link to="/contact" className="footer__cta-btn">
            {f.contactBtn || 'Contact Now'} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="footer__bottom container">
        <span className="footer__copy">{f.copy || f.copyright}</span>
        <div className="footer__bottom-links">
          <Link to="/privacy" className="footer__bottom-link">{f.privacy || 'Privacy'}</Link>
          <Link to="/returns" className="footer__bottom-link">{f.returns || 'Refund & Return Policy'}</Link>
          <Link to="/terms" className="footer__bottom-link">{f.terms || 'Terms'}</Link>
          <Link to="/admin" className="footer__bottom-link">{f.admin || 'Admin'}</Link>
        </div>
      </div>
    </footer>
  );
}
