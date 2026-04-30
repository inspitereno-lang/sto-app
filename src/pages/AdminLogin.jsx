import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { User, Lock, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        throw new Error('Invalid credentials. Please try again.');
      }

      const data = await res.json();
      localStorage.setItem('adminToken', data.accessToken);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      toast.success('Welcome back to the STO Command Center');
      navigate('/admin');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Decorative Background Elements */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={styles.card}
      >
        <div style={styles.header}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={styles.logoContainer}
          >
            <img 
              src="/PHOTO-2026-04-29-14-23-54.png" 
              alt="STO Logo" 
              className="admin-login__logo"
              style={styles.logo} 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p style={styles.subtitle}>Enter your credentials to access the dashboard</p>
          </motion.div>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <motion.div 
            style={styles.inputGroup}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <User size={18} style={styles.icon} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={styles.input}
                required
                disabled={loading}
              />
            </div>
          </motion.div>

          <motion.div 
            style={styles.inputGroup}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.icon} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={styles.input}
                required
                disabled={loading}
              />
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.8 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" style={{ marginRight: '8px' }} />
                Authenticating...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </>
            )}
          </motion.button>
        </form>

        <motion.div 
          style={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ShieldCheck size={14} style={{ marginRight: '6px', color: 'var(--accent)' }} />
          <span>Secure Administrator Access Only</span>
        </motion.div>
      </motion.div>

      {/* Global Style for Spinner Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 768px) {
          .admin-login__logo {
            height: 60px !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FAFAF8',
    fontFamily: "'Inter', sans-serif",
    position: 'relative',
    overflow: 'hidden',
    padding: '20px'
  },
  bgGlow1: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '40vw',
    height: '40vw',
    background: 'radial-gradient(circle, rgba(123, 170, 141, 0.15) 0%, rgba(250, 250, 248, 0) 70%)',
    borderRadius: '50%',
    zIndex: 0
  },
  bgGlow2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-5%',
    width: '35vw',
    height: '35vw',
    background: 'radial-gradient(circle, rgba(15, 47, 36, 0.08) 0%, rgba(250, 250, 248, 0) 70%)',
    borderRadius: '50%',
    zIndex: 0
  },
  card: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    padding: '48px 40px',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 25px 50px -12px rgba(15, 47, 36, 0.12)',
    width: '100%',
    maxWidth: '440px',
    zIndex: 1,
    position: 'relative'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  logoContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    height: '100px',
    width: 'auto',
    filter: 'drop-shadow(0 4px 12px rgba(15, 47, 36, 0.1))'
  },
  subtitle: {
    color: '#6b6b6b',
    fontSize: '15px',
    margin: 0,
    fontWeight: 400
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#0F2F24',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginLeft: '4px'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    left: '16px',
    color: '#9a9a9a'
  },
  input: {
    width: '100%',
    padding: '16px 16px 16px 48px',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1.5px solid #eae7e1',
    borderRadius: '14px',
    fontSize: '15px',
    color: '#1a1a1a',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  },
  submitBtn: {
    background: '#0F2F24',
    color: '#fff',
    border: 'none',
    padding: '18px',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: 600,
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 20px -5px rgba(15, 47, 36, 0.3)'
  },
  footer: {
    marginTop: '32px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#9a9a9a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500
  }
};

