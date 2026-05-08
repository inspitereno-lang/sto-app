import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const { t, language } = useLanguage();
  const f = t.footer || {};

  // Localized fallbacks for missing DB keys
  const fallbacks = {
    fi: {
      returns: "Palautus- ja hyvityskäytäntö",
      ctaTitle: "Onko kysyttävää?",
      ctaSub: "Tarvitsetko apua tilauksesi kanssa?",
      contactBtn: "Ota yhteyttä"
    },
    sv: {
      returns: "Återbetalnings- och returpolicy",
      ctaTitle: "Har du frågor?",
      ctaSub: "Behöver du hjälp med din beställning?",
      contactBtn: "Kontakta nu"
    },
    no: {
      returns: "Refusjon- og returpolicy",
      ctaTitle: "Har du spørsmål?",
      ctaSub: "Trenger du hjelp med bestillingen din?",
      contactBtn: "Kontakt nå"
    },
    da: {
      returns: "Refusions- og returpolitik",
      ctaTitle: "Har du spørgsmål?",
      ctaSub: "Har du brug for hjælp til din ordre?",
      contactBtn: "Kontakt nu"
    },
    de: {
      returns: "Rückerstattungs- und Rückgaberichtlinien",
      ctaTitle: "Haben Sie Fragen?",
      ctaSub: "Benötigen Sie Hilfe bei Ihrer Bestellung?",
      contactBtn: "Jetzt kontaktieren"
    },
    fr: {
      returns: "Politique de remboursement et de retour",
      ctaTitle: "Vous avez des questions ?",
      ctaSub: "Besoin d'aide pour votre commande ?",
      contactBtn: "Contactez-nous maintenant"
    },
    es: {
      returns: "Política de reembolso y devolución",
      ctaTitle: "¿Tienes preguntas?",
      ctaSub: "¿Necesitas ayuda con tu pedido?",
      contactBtn: "Contactar ahora"
    },
    it: {
      returns: "Politica di rimborso e reso",
      ctaTitle: "Hai domande?",
      ctaSub: "Serve aiuto con il tuo ordine?",
      contactBtn: "Contattaci ora"
    },
    pl: {
      returns: "Polityka zwrotów i refundacji",
      ctaTitle: "Masz pytania?",
      ctaSub: "Potrzebujesz pomocy z zamówieniem?",
      contactBtn: "Skontaktuj się teraz"
    },
    nl: {
      returns: "Terugbetalings- en retourbeleid",
      ctaTitle: "Heb je vragen?",
      ctaSub: "Hulp nodig bij je bestelling?",
      contactBtn: "Neem nu contact op"
    },
    et: {
      returns: "Tagasimakse ja tagastuspoliitika",
      ctaTitle: "On teil küsimusi?",
      ctaSub: "Kas vajate abi oma tellimusega?",
      contactBtn: "Võta ühendust"
    },
    pt: {
      returns: "Política de reembolso e devolução",
      ctaTitle: "Tem perguntas?",
      ctaSub: "Precisa de ajuda com o seu pedido?",
      contactBtn: "Contactar agora"
    },
    tr: {
      returns: "İade ve Geri Ödeme Politikası",
      ctaTitle: "Sorularınız mı var?",
      ctaSub: "Siparişinizle ilgili yardıma mı ihtiyacınız var?",
      contactBtn: "Şimdi İletişime Geçin"
    },
    el: {
      returns: "Πολιτική επιστροφής χρημάτων και επιστροφών",
      ctaTitle: "Έχετε ερωτήσεις;",
      ctaSub: "Χρειάζεστε βοήθεια με την παραγγελία σας;",
      contactBtn: "Επικοινωνήστε τώρα"
    },
    jp: {
      returns: "返金・返品ポリシー",
      ctaTitle: "ご質問がありますか？",
      ctaSub: "ご注文に関するヘルプが必要ですか？",
      contactBtn: "今すぐお問い合わせ"
    },
    ar: {
      returns: "سياسة الاسترداد والإرجاع",
      ctaTitle: "هل لديك أسئلة؟",
      ctaSub: "هل تحتاج إلى مساعدة في طلبك؟",
      contactBtn: "اتصل الآن"
    }
  };

  const l = fallbacks[language] || {};

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
          <div className="footer__col-title">{f.policies || 'Policies'}</div>
          <Link to="/terms" className="footer__link">{f.terms || 'Terms'}</Link>
          <Link to="/privacy" className="footer__link">{f.privacy || 'Privacy'}</Link>
          <Link to="/returns" className="footer__link">{f.returns || l.returns || 'Refund & Return Policy'}</Link>
        </div>

        {/* CTA Section */}
        <div className="footer__col footer__cta">
          <div className="footer__col-title">{f.ctaTitle || l.ctaTitle || 'Have Questions?'}</div>
          <p className="footer__cta-sub">{f.ctaSub || l.ctaSub || 'Need help with your order?'}</p>
          <Link to="/contact" className="footer__cta-btn">
            {f.contactBtn || l.contactBtn || 'Contact Now'} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="footer__bottom container">
        <span className="footer__copy">{f.copy}</span>
        <div className="footer__bottom-links">
          <Link to="/privacy" className="footer__bottom-link">{f.privacy || 'Privacy'}</Link>
          <Link to="/returns" className="footer__bottom-link">{f.returns || l.returns || 'Refund & Return Policy'}</Link>
          <Link to="/terms" className="footer__bottom-link">{f.terms || 'Terms'}</Link>
          <Link to="/admin" className="footer__bottom-link">{f.admin || 'Admin'}</Link>
        </div>
      </div>
    </footer>
  );
}
