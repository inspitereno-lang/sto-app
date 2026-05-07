import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import LanguageSelection from './screens/LanguageSelection';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import TermsPage from './pages/TermsPage';
import ReturnsPage from './pages/ReturnsPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import FeedbackPage from './pages/FeedbackPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import FAQPage from './pages/FAQPage';
import OrdersPage from './pages/OrdersPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppShell() {
  const { language, hasSelected } = useLanguage();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');


  if (isAdmin) {
    return (
      <Routes location={location} key={location.pathname}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    );
  }

  return (
    <>
      {!hasSelected && <LanguageSelection />}
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Navigate to="/account" replace />} />
          <Route path="/account" element={<LoginPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

function NotFound() {
  const { t } = useLanguage();
  const nf = t.not_found || {};
  return (
    <main style={{ paddingTop:'120px', minHeight:'70vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'20px', textAlign:'center', background:'#FAFAF8' }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'6rem', color:'#e0ddd6', fontWeight:300 }}>404</div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', color:'#0F2F24', fontWeight:400 }}>{nf.title || 'Page not found.'}</h2>
      <p style={{ color:'#9a9a9a', fontSize:'15px', maxWidth:'360px' }}>{nf.sub || "The page you're looking for doesn't exist. Let's get you back on track."}</p>
      <a href="/" className="btn btn-primary">{nf.btn || 'Return Home'}</a>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <ScrollToTop />
          <Toaster position="top-center" toastOptions={{ duration: 4000, style: { background: '#0F2F24', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '14px', borderRadius: '12px', padding: '12px 20px' } }} />
          <AppShell />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
