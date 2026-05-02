import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, BookOpen, Filter, X, Sprout, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../config/api';
import { useLanguage } from '../context/LanguageContext';
import { TAG_COLORS } from '../data/articles';
import './BlogPage.css';

export default function BlogPage() {
  const { language, t } = useLanguage();
  const bp = t.blog_page || {};
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.getBlogs({ lang: language });
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [language]);


  const getTranslatedContent = (blog) => {
    const trans = blog.translations?.[language];
    return {
      title: trans?.title || blog.title,
      excerpt: trans?.excerpt || blog.excerpt,
      category: trans?.category || blog.category,
      tags: trans?.tags || blog.tags
    };
  };

  const allTag = bp.all || 'All';
  const tags = [allTag, ...new Set(blogs.map(b => getTranslatedContent(b).category || 'Uncategorized'))];
  
  const filteredBlogs = activeTag === 'all' 
    ? blogs 
    : blogs.filter(b => (getTranslatedContent(b).category || 'Uncategorized') === activeTag);

  return (
    <main className="blog-page">
      {/* Hero */}
      <div className="blog-hero">
        <motion.div
          className="blog-hero__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="blog-hero__label">{bp.label || 'Health & Lifestyle'}</div>
          <h1 className="blog-hero__title">{bp.title || 'The STO Journal'}</h1>
          <p className="blog-hero__sub">
            {bp.sub || 'Science-backed insights on microgreens, nutrition, and the art of mindful Nordic living.'}
          </p>
        </motion.div>
      </div>

      {/* Article Grid Layout */}
      <div className="blog-body container">
        <div className="blog-layout">
          
          {/* Mobile Filter Toggle */}
          <div className="blog-mobile-filter-bar">
            <button 
              className="blog-filter-toggle"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Filter size={18} />
              <span>{bp.filterTitle || 'Filter Articles'}</span>
              {activeTag !== allTag && <span className="blog-filter-badge">1</span>}
            </button>
          </div>

          {/* Sidebar */}
          <AnimatePresence>
            {(isSidebarOpen || window.innerWidth > 1024) && (
              <>
                <motion.div 
                  className="blog-sidebar-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                />
                <motion.aside 
                  className="blog-sidebar"
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                >
                  <div className="blog-sidebar__header">
                    <h3>{bp.filterTitle || 'Filter by Topic'}</h3>
                    <button className="blog-sidebar__close" onClick={() => setIsSidebarOpen(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  <div className="blog-sidebar__content">
                    <ul className="blog-filter-list">
                      {tags.map((tag) => (
                        <li key={tag}>
                          <button
                            className={`blog-filter-btn ${activeTag === (tag === allTag ? 'all' : tag) ? 'active' : ''}`}
                            onClick={() => {
                              setActiveTag(tag === allTag ? 'all' : tag);
                              setIsSidebarOpen(false);
                            }}
                          >
                            <span className="blog-filter-btn__text">{tag}</span>
                            <span className="blog-filter-btn__count">
                              {tag === allTag ? blogs.length : blogs.filter(b => (getTranslatedContent(b).category || 'Uncategorized') === tag).length}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Grid */}
          <div className="blog-main-content">
            {loading ? (
              <div className="blog-loading">
                <Loader2 size={40} className="animate-spin" />
                <p>Loading journal...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="blog-empty-state">{bp.emptyState || 'No articles found for this topic.'}</div>
            ) : (
              <div className="blog-grid">
                <AnimatePresence mode="popLayout">
                  {filteredBlogs.map((blog, i) => {
                    const content = getTranslatedContent(blog);
                    return (
                      <motion.article
                        key={blog._id || blog.id || i}
                        className="blog-card"
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                      >
                        <Link to={`/blog/${blog.slug || blog._id}`} className="blog-card__link">
                          <div className="blog-card__img-wrap">
                            <img src={blog.image || 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80'} alt={content.title} className="blog-card__img" />
                            <div
                              className="blog-card__img-overlay"
                              style={{ background: `linear-gradient(to top, #1a1a1acc 0%, transparent 60%)` }}
                            />
                            {content.category && (
                              <span 
                                className="blog-card__tag"
                                style={{
                                  '--tag-bg': '#EAF4EE',
                                  '--tag-color': '#0F5C30'
                                }}
                              >
                                {content.category}
                              </span>
                            )}
                          </div>
                          <div className="blog-card__body">
                            <h2 className="blog-card__title">{content.title}</h2>
                            <p className="blog-card__excerpt">{content.excerpt}</p>
                            <div className="blog-card__cta">
                              {bp.readArticle || 'Read Article'} <ChevronRight size={14} />
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Shop CTA */}
        <motion.div
          className="blog-shop-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Sprout size={32} className="blog-cta__icon" />
          <h3 className="blog-cta__title">{bp.ctaShopTitle || 'Experience the Freshness'}</h3>
          <p className="blog-cta__sub">
            {bp.ctaShopSub || 'Explore our full range of organic, sustainably grown microgreens and elevate your daily nutrition.'}
          </p>
          <Link to="/shop" className="blog-cta__btn">
            {bp.shopNow || 'Shop Now'} <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
