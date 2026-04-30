import React, { createContext, useContext, useState, useEffect } from 'react';
import API_BASE from '../config/api';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const getInitialLang = () => {
    return localStorage.getItem('sto_lang') || sessionStorage.getItem('sto_lang_session') || 'en';
  };
  
  const getInitialHasSelected = () => {
    return !!localStorage.getItem('sto_lang') || !!sessionStorage.getItem('sto_lang_session');
  };

  const [language, setLanguage] = useState(getInitialLang);
  const [hasSelected, setHasSelected] = useState(getInitialHasSelected);
  const [t, setT] = useState(null); // Full translations object from DB
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDynamicContent = async () => {
      try {
        const res = await fetch(`${API_BASE}/pages`);
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          const masterTrans = {};
          
          data.forEach(page => {
            // Organize content by page and language
            masterTrans[page.page] = {
              en: page.content || {},
              ...page.translations
            };
          });
          
          // Rebuild the translation object for the active language
          const buildLanguageObject = (lang) => {
            const obj = {};
            Object.keys(masterTrans).forEach(pageKey => {
              obj[pageKey] = masterTrans[pageKey][lang] || masterTrans[pageKey]['en'] || {};
            });
            // Handle legacy/short keys if needed
            if (obj.home_hero) obj.hero = obj.home_hero;
            if (obj.home_about) obj.about = obj.home_about;
            if (obj.home_categories) obj.categories = obj.home_categories;
            if (obj.home_benefits) obj.benefits = obj.home_benefits;
            if (obj.home_process) obj.how = obj.home_process;
            if (obj.home_sustainability) obj.sustainability = obj.home_sustainability;
            if (obj.home_cta) obj.cta = obj.home_cta;
            
            return obj;
          };

          // Store the master translations and set current t
          setT(buildLanguageObject(language));
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load translations from database:', err);
        setLoading(false);
      }
    };
    fetchDynamicContent();
  }, [language]);

  const selectLanguage = (lang, remember = false) => {
    setLanguage(lang);
    setHasSelected(true);
    if (remember) {
      localStorage.setItem('sto_lang', lang);
    } else {
      sessionStorage.setItem('sto_lang_session', lang);
    }
  };

  if (loading || !t) {
    return (
      <div style={{ 
        height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', background: '#FAFAF8',
        fontFamily: "'Cormorant Garamond', serif"
      }}>
        <div className="animate-spin" style={{ width: '32px', height: '32px', border: '3px solid #0F2F24', borderTopColor: 'transparent', borderRadius: '50%', marginBottom: '20px' }} />
        <p style={{ color: '#0F2F24', letterSpacing: '0.1em', fontSize: '14px' }}>INITIALIZING STO</p>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, selectLanguage, t, setLanguage, hasSelected }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
