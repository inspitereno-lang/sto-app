import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './FeedbackPage.css';

function StarRating({ value, onChange, labels }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="fb-stars" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`fb-star ${n <= (hovered || value) ? 'fb-star--active' : ''}`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          <Star size={30} fill={n <= (hovered || value) ? '#D4A843' : 'none'} />
        </button>
      ))}
      <span className="fb-rating-label">
        {value === 1 && (labels.poor || 'Poor')}
        {value === 2 && (labels.fair || 'Fair')}
        {value === 3 && (labels.good || 'Good')}
        {value === 4 && (labels.veryGood || 'Very Good')}
        {value === 5 && (labels.excellent || 'Excellent')}
      </span>
    </div>
  );
}

export default function FeedbackPage() {
  const { t } = useLanguage();
  const f = t.feedback_page || {};

  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 0,
    category: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const CATEGORIES = [
    f.cat1 || 'Product Quality',
    f.cat2 || 'Freshness & Packaging',
    f.cat3 || 'Delivery Experience',
    f.cat4 || 'Website Experience',
    f.cat5 || 'Customer Service',
    f.cat6 || 'Other',
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = f.errName || 'Name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = f.errEmail || 'A valid email is required.';
    if (!form.rating) e.rating = f.errRating || 'Please select a rating.';
    if (!form.category) e.category = f.errCat || 'Please choose a category.';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = f.errMessage || 'Please write at least 10 characters.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    
    if (Object.keys(e2).length === 0) {
      try {
        const response = await fetch('http://localhost:5001/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          const data = await response.json();
          toast.error(data.message || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        console.error('Error submitting feedback:', err);
        toast.error('Could not connect to the server. Please try again later.');
      }
    }
  };

  const reset = () => {
    setForm({ name: '', email: '', rating: 0, category: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <main className="fb-page">
      {/* Hero Banner */}
      <div className="fb-hero">
        <motion.div
          className="fb-hero__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="fb-hero__label">{f.heroLabel}</div>
          <h1 className="fb-hero__title">{f.heroTitle}</h1>
          <p className="fb-hero__sub">{f.heroSub}</p>
        </motion.div>
      </div>

      <div className="fb-body container">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              className="fb-card"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <form className="fb-form" onSubmit={handleSubmit} noValidate>
                <div className="fb-row">
                  <div className="fb-field">
                    <label className="fb-label" htmlFor="fb-name">{f.nameLabel}</label>
                    <input
                      id="fb-name"
                      className={`fb-input ${errors.name ? 'fb-input--error' : ''}`}
                      type="text"
                      placeholder={f.namePlaceholder}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <span className="fb-error">{errors.name}</span>}
                  </div>
                  <div className="fb-field">
                    <label className="fb-label" htmlFor="fb-email">{f.emailLabel}</label>
                    <input
                      id="fb-email"
                      className={`fb-input ${errors.email ? 'fb-input--error' : ''}`}
                      type="email"
                      placeholder={f.emailPlaceholder}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <span className="fb-error">{errors.email}</span>}
                  </div>
                </div>

                {/* Rating */}
                <div className="fb-field">
                  <label className="fb-label">{f.ratingLabel}</label>
                  <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} labels={f} />
                  {errors.rating && <span className="fb-error">{errors.rating}</span>}
                </div>

                {/* Category */}
                <div className="fb-field">
                  <label className="fb-label">{f.catLabel}</label>
                  <div className="fb-cats">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`fb-cat-btn ${form.category === c ? 'fb-cat-btn--active' : ''}`}
                        onClick={() => setForm({ ...form, category: c })}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  {errors.category && <span className="fb-error">{errors.category}</span>}
                </div>

                {/* Message */}
                <div className="fb-field">
                  <label className="fb-label" htmlFor="fb-message">{f.msgLabel}</label>
                  <textarea
                    id="fb-message"
                    className={`fb-textarea ${errors.message ? 'fb-input--error' : ''}`}
                    rows={5}
                    placeholder={f.msgPlaceholder}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <div className="fb-char-count">{form.message.length} / 500</div>
                  {errors.message && <span className="fb-error">{errors.message}</span>}
                </div>

                <button type="submit" className="fb-submit" id="feedback-submit">
                  <Send size={16} />
                  {f.submit}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="fb-success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle size={72} className="fb-success__icon" />
              </motion.div>
              <h2 className="fb-success__title">{f.successTitle}</h2>
              <p className="fb-success__sub">{f.successSub}</p>
              <div className="fb-success__rating">
                {[1,2,3,4,5].map(n => (
                  <Star key={n} size={22} fill={n <= form.rating ? '#D4A843' : 'none'} stroke={n <= form.rating ? '#D4A843' : '#ccc'} />
                ))}
              </div>
              <div className="fb-success__actions">
                <button className="fb-submit" onClick={reset}>
                  {f.submitAnother}
                </button>
                <Link to="/shop" className="fb-link-btn">
                  {f.backToShop} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Side Info */}
        <div className="fb-info">
          <div className="fb-info__card">
            <div className="fb-info__icon">🌱</div>
            <h3 className="fb-info__title">{f.info1Title}</h3>
            <p className="fb-info__desc">{f.info1Desc}</p>
          </div>
          <div className="fb-info__card">
            <div className="fb-info__icon">🕯️</div>
            <h3 className="fb-info__title">{f.info2Title}</h3>
            <p className="fb-info__desc">{f.info2Desc}</p>
          </div>
          <div className="fb-info__card">
            <div className="fb-info__icon">📦</div>
            <h3 className="fb-info__title">{f.info3Title}</h3>
            <p className="fb-info__desc">{f.info3Desc}</p>
          </div>
          <div className="fb-info__promise">
            <div className="fb-info__promise-title">{f.promiseTitle}</div>
            <p className="fb-info__promise-text">{f.promiseText}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
