import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { api } from '../config/api';
import { useLanguage } from '../context/LanguageContext';
import './BlogPostPage.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const bp = t.blog_page || {};
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || slug === 'undefined') {
      setLoading(false);
      return;
    }
    const fetchBlog = async () => {
      try {
        const res = await api.getBlog(slug, language);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug, language]);


  if (loading) {
    return (
      <div className="blog-post-loading">
        <Loader2 size={40} className="animate-spin" />
        <p>{bp.loading || 'Loading article...'}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-post-not-found">
        <h2>{bp.notFound || 'Article Not Found'}</h2>
        <p>{bp.notFoundSub || "The article you are looking for doesn't exist or has been moved."}</p>
        <Link to="/blog" className="blog-post-back-btn">
          <ArrowLeft size={18} /> {bp.backToJournal || 'Back to Journal'}
        </Link>
      </div>
    );
  }

  const trans = blog.translations?.[language] || {};
  const content = {
    title: trans.title || blog.title || 'Untitled Article',
    content: trans.content || blog.content || '',
    excerpt: trans.excerpt || blog.excerpt || '',
    category: trans.category || blog.category
  };

  const blogColor = blog.color || '#1a1a1a'; // Use blog color from DB or default

  return (
    <main className="blog-post-page">
      {/* Hero Section */}
      <section className="blog-post-hero">
        <div className="blog-post-hero__bg">
          <img src={blog.image} alt={content.title} />
          <div
            className="blog-post-hero__overlay"
            style={{
              background: `linear-gradient(to top, ${blogColor}f2 0%, ${blogColor}cc 40%, transparent 100%)`
            }}
          />
        </div>
        
        <div className="blog-post-hero__content container">
          <button 
            onClick={() => navigate('/blog')}
            className="blog-post-back-link"
            aria-label="Back to blog"
          >
            <ArrowLeft size={16} />
            {bp.backToJournal || 'Back to Journal'}
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="blog-post-hero__meta-top"
          >
            <span className="blog-post-tag" style={{ backgroundColor: '#EAF4EE', color: '#0F5C30' }}>
              {content.category}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="blog-post-title"
          >
            {content.title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="blog-post-meta-bottom"
          >
            <div className="blog-post-author">
              <div className="blog-post-author__avatar">STO</div>
              <div className="blog-post-author__info">
                <span className="blog-post-author__name">{blog.author || 'STO Editorial Team'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="blog-post-content-wrap container">
        <article className="blog-post-content">
          <p className="blog-post-lead">{content.excerpt}</p>
          
          <div className="blog-post-body">
            {content.content.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**') && para.split('\n').length === 1) {
                return <h2 key={i} className="blog-post-heading">{para.replace(/\*\*/g, '')}</h2>;
              }
              // Handle bullet lists
              if (para.startsWith('- ')) {
                return (
                  <ul key={i} className="blog-post-list">
                    {para.split('\n').map((line, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: line.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                );
              }
              // Handle italic-marked stage titles (e.g. *Days 1–2: Seeding*)
              if (para.startsWith('*') && para.endsWith('*')) {
                return <h3 key={i} className="blog-post-subheading">{para.replace(/\*/g, '')}</h3>;
              }
              return (
                <p key={i} className="blog-post-para" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
              );
            })}
          </div>
        </article>
        
        {/* Author Footer */}
        <div className="blog-post-footer">
          <div className="blog-post-footer__brand">
            <h3>{bp.stoGreen || 'STO Green'}</h3>
            <p>{bp.premiumUrbanAg || 'Premium urban agriculture straight from our Helsinki vertical farm.'}</p>
            <Link to="/shop" className="blog-post-shop-btn">{bp.shopMicrogreens || 'Shop Microgreens'}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
