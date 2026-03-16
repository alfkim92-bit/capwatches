import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Watch } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
        toast.success('Welcome back!');
      } else {
        if (!form.name) return toast.error('Name is required');
        await register(form.name, form.email, form.password, form.phone);
        toast.success('Account created! Welcome to CAP Watches');
      }
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', paddingTop: 72 }}>
      {/* Left: Image */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'none' }} className="login-img">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.4)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, #050505)' }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px' }}>
          <span className="section-label">CAP Watches</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            Where Luxury<br /><span className="shimmer-text">Meets Time</span>
          </h2>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.8, maxWidth: 320, marginTop: 16 }}>
            Join thousands of discerning customers across Pakistan who trust CAP for their timepiece.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 440 }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ width: 52, height: 52, border: '2px solid #c9a84c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Watch size={22} color="#c9a84c" />
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, letterSpacing: 3, color: '#fff' }}>CAP WATCHES</div>
            <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>capwatches.pk</div>
          </div>

          {/* Toggle */}
          <div style={{ display: 'flex', background: '#0a0a0a', border: '1px solid #1a1a1a', marginBottom: 36, position: 'relative' }}>
            <motion.div
              animate={{ x: mode === 'login' ? 0 : '100%' }}
              style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%', background: '#c9a84c', zIndex: 0 }}
            />
            {['login', 'register'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '12px 0', background: 'transparent', border: 'none', color: mode === m ? '#000' : '#666', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Inter', position: 'relative', zIndex: 1, transition: 'color 0.3s' }}>
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {mode === 'register' && (
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Full Name</label>
                    <input placeholder="Ahmed Khan" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                )}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div style={{ marginBottom: mode === 'register' ? 16 : 32, position: 'relative' }}>
                  <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Password</label>
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ paddingRight: 48 }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: 38, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {mode === 'register' && (
                  <div style={{ marginBottom: 32 }}>
                    <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Phone (optional)</label>
                    <input placeholder="+92 300 0000000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ width: '100%', padding: '16px 0', fontSize: 12, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In to CAP' : 'Create Account'}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', color: '#555', fontSize: 12, marginTop: 24 }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: 12, letterSpacing: 1 }}>
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
