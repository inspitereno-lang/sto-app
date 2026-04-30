import { useState } from 'react';
import API_BASE from '../config/api';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Leaf } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const a = t.auth_page || t.auth || {};
  const [tab, setTab] = useState('login');
  const [mode, setMode] = useState('auth'); // 'auth', 'forgot', 'reset'

  const features = [a.feature1, a.feature2, a.feature3].filter(Boolean);
  if (features.length === 0) features.push(...(a.features || []));
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email:'', password:'', name:'', otp:'', newPassword:'' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (mode === 'forgot') {
      try {
        const res = await fetch(`${API_BASE}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setMessage(data.message);
        setMode('reset');
      } catch (err) { setError(err.message); }
      return;
    }

    if (mode === 'reset') {
      try {
        const res = await fetch(`${API_BASE}/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, otp: form.otp, newPassword: form.newPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        toast.success('Password reset successful! Please login.');
        setMode('auth');
        setTab('login');
      } catch (err) { setError(err.message); }
      return;
    }

    const endpoint = tab === 'login' ? '/auth/login' : '/auth/register';
    
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: form.email,
          username: form.name || form.email,
          password: form.password
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Authentication failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(tab === 'login' ? a.loginSuccess : a.registerSuccess);
      
      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get('redirect') || '/';
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ paddingTop:'80px', minHeight:'100vh', background:'#FAFAF8', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
      <div style={styles.wrapper} className="res-grid-2">
        {/* Left panel */}
        <div style={styles.leftPanel}>
          <div style={styles.leftContent}>
            <div style={styles.logo}>STO</div>
            <h2 style={styles.leftTitle}>{a.leftTitle}</h2>
            <p style={styles.leftSub}>{a.leftSub}</p>
            <div style={styles.leftFeatures}>
              {features.map(f => (
                <div key={f} style={styles.feature}><Leaf size={13} style={{ color:'#7BAA8D', flexShrink:0 }}/>{f}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right form */}
        <motion.div style={styles.rightPanel} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}>
          {/* Tabs */}
          <div style={styles.tabs}>
            {['login','register'].map(tabKey => (
              <button key={tabKey} onClick={() => setTab(tabKey)}
                style={{ ...styles.tab, ...(tab===tabKey ? styles.tabActive : {}) }}>
                {tabKey === 'login' ? a.signIn : a.createAccount}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {mode === 'auth' ? (
              <>
                <h2 style={styles.formTitle}>{tab === 'login' ? a.loginTitle : a.registerTitle}</h2>
                <p style={styles.formSub}>{tab === 'login' ? a.loginSub : a.registerSub}</p>

                {error && (
                  <div style={{ background: '#f8d7da', color: '#842029', padding: '12px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>
                    {error}
                  </div>
                )}

                {tab === 'register' && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-name">{a.fullName}</label>
                    <input id="reg-name" type="text" value={form.name} onChange={e=>set('name',e.target.value)}
                      placeholder={a.namePlaceholder} className="form-input" required/>
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">Username or Email</label>
                  <input id="login-email" type="text" value={form.email} onChange={e=>set('email',e.target.value)}
                    placeholder="reno or reno@example.com" className="form-input" required/>
                </div>
                <div className="form-group" style={{ position:'relative' }}>
                  <label className="form-label" htmlFor="login-pw">{a.password}</label>
                  <input id="login-pw" type={showPw?'text':'password'} value={form.password} onChange={e=>set('password',e.target.value)}
                    placeholder="••••••••" className="form-input" style={{ paddingRight:'44px' }} required/>
                  <button type="button" onClick={() => setShowPw(p=>!p)}
                    style={{ position:'absolute', right:'12px', top:'38px', background:'none', border:'none', cursor:'pointer', color:'#9a9a9a', display:'flex', alignItems:'center' }}>
                    {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>

                {tab === 'login' && (
                  <div style={{ textAlign:'right', marginTop:'-8px', marginBottom:'8px' }}>
                    <button type="button" style={styles.forgotBtn} onClick={() => setMode('forgot')}>{a.forgotPw}</button>
                  </div>
                )}

                <motion.button type="submit" className="btn btn-primary"
                  style={{ width:'100%', justifyContent:'center', padding:'16px', marginTop:'8px' }}
                  whileTap={{ scale:0.97 }}>
                  {tab === 'login' ? a.signIn : a.createAccount}
                </motion.button>
              </>
            ) : mode === 'forgot' ? (
              <>
                <h2 style={styles.formTitle}>{a.forgotTitle || 'Forgot Password'}</h2>
                <p style={styles.formSub}>{a.forgotSub || 'Enter your email to receive a reset code.'}</p>

                {error && (
                  <div style={{ background: '#f8d7da', color: '#842029', padding: '12px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="forgot-email">{a.email}</label>
                  <input id="forgot-email" type="email" value={form.email} onChange={e=>set('email',e.target.value)}
                    placeholder={a.emailPlaceholder} className="form-input" required/>
                </div>

                <motion.button type="submit" className="btn btn-primary"
                  style={{ width:'100%', justifyContent:'center', padding:'16px', marginTop:'8px' }}
                  whileTap={{ scale:0.97 }}>
                  {a.sendCode || 'Send Code'}
                </motion.button>

                <button type="button" style={{ ...styles.forgotBtn, width:'100%', marginTop:'16px' }} onClick={() => setMode('auth')}>
                  {a.backToLogin || 'Back to Login'}
                </button>
              </>
            ) : (
              <>
                <h2 style={styles.formTitle}>{a.resetTitle || 'Reset Password'}</h2>
                <p style={styles.formSub}>{a.resetSub || 'Enter the code sent to your email and your new password.'}</p>

                {error && (
                  <div style={{ background: '#f8d7da', color: '#842029', padding: '12px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>
                    {error}
                  </div>
                )}
                {message && (
                  <div style={{ background: '#d1e7dd', color: '#0f5132', padding: '12px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>
                    {message}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="reset-otp">{a.otpLabel || '6-Digit Code'}</label>
                  <input id="reset-otp" type="text" value={form.otp} onChange={e=>set('otp',e.target.value)}
                    placeholder="000000" className="form-input" required maxLength={6} style={{ letterSpacing:'4px', textAlign:'center', fontSize:'18px', fontWeight:600 }}/>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reset-pw">{a.newPassword || 'New Password'}</label>
                  <input id="reset-pw" type="password" value={form.newPassword} onChange={e=>set('newPassword',e.target.value)}
                    placeholder="••••••••" className="form-input" required/>
                </div>

                <motion.button type="submit" className="btn btn-primary"
                  style={{ width:'100%', justifyContent:'center', padding:'16px', marginTop:'8px' }}
                  whileTap={{ scale:0.97 }}>
                  {a.resetBtn || 'Reset Password'}
                </motion.button>

                <button type="button" style={{ ...styles.forgotBtn, width:'100%', marginTop:'16px' }} onClick={() => setMode('auth')}>
                  {a.cancel || 'Cancel'}
                </button>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </main>
  );
}

const styles = {
  wrapper: { display:'grid', maxWidth:'960px', width:'100%', borderRadius:'24px', overflow:'hidden', boxShadow:'0 24px 80px rgba(15,47,36,0.18)', position:'relative' },
  leftPanel: { background:'linear-gradient(145deg, #0F2F24 0%, #1a5a3a 100%)', padding:'48px', display:'flex', flexDirection:'column', justifyContent:'center' },
  leftContent: { display:'flex', flexDirection:'column', gap:'24px' },
  logo: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', letterSpacing:'0.14em', color:'#ffffff' },
  leftTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', color:'#ffffff', fontWeight:300, lineHeight:1.2 },
  leftSub: { fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:1.8 },
  leftFeatures: { display:'flex', flexDirection:'column', gap:'12px', marginTop:'8px' },
  feature: { display:'flex', alignItems:'center', gap:'10px', fontSize:'13px', color:'rgba(255,255,255,0.75)' },
  rightPanel: { background:'#ffffff', padding:'48px' },
  tabs: { display:'flex', borderBottom:'1px solid #eae7e1', marginBottom:'32px' },
  tab: { flex:1, padding:'12px', fontFamily:"'Inter',sans-serif", fontSize:'13px', fontWeight:500, color:'#9a9a9a', background:'none', border:'none', borderBottomWidth:'2px', borderBottomStyle:'solid', borderBottomColor:'transparent', cursor:'pointer', transition:'all 0.2s', marginBottom:'-1px' },
  tabActive: { color:'#0F2F24', borderBottomColor:'#0F2F24' },
  form: { display:'flex', flexDirection:'column', gap:'4px' },
  formTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', color:'#0F2F24', fontWeight:400, marginBottom:'4px' },
  formSub: { fontSize:'14px', color:'#9a9a9a', marginBottom:'20px' },
  forgotBtn: { fontFamily:"'Inter',sans-serif", fontSize:'12px', color:'#7BAA8D', background:'none', border:'none', cursor:'pointer' },
  dividerRow: { display:'flex', alignItems:'center', gap:'12px', margin:'16px 0' },
  dividerLine: { flex:1, height:'1px', background:'#eae7e1' },
  dividerText: { fontFamily:"'Inter',sans-serif", fontSize:'12px', color:'#9a9a9a' },
  socialBtn: { width:'100%', padding:'14px', border:'1.5px solid #e0ddd6', borderRadius:'8px', background:'#ffffff', cursor:'pointer', fontFamily:"'Inter',sans-serif", fontSize:'14px', fontWeight:500, color:'#1a1a1a', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', transition:'all 0.2s' },
  switchText: { textAlign:'center', fontFamily:"'Inter',sans-serif", fontSize:'13px', color:'#9a9a9a', marginTop:'12px' },
  switchBtn: { color:'#0F2F24', fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", fontSize:'13px' },
};
