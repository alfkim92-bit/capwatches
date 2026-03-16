import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Heart, Menu, X, Watch } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Collection' },
    { to: '/about', label: 'About' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(5,5,5,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
          transition: 'all 0.4s ease',
          padding: '0 40px',
        }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link to="/">
            <motion.div whileHover={{ scale: 1.02 }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, border: '2px solid #c9a84c',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Watch size={16} color="#c9a84c" />
              </div>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, letterSpacing: 3, color: '#fff', lineHeight: 1 }}>CAP</div>
                <div style={{ fontSize: 8, letterSpacing: 5, color: '#c9a84c', textTransform: 'uppercase', lineHeight: 1 }}>WATCHES</div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="desktop-nav">
            {links.map(link => (
              <Link key={link.to} to={link.to}>
                <motion.span
                  whileHover={{ color: '#c9a84c' }}
                  style={{
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: location.pathname === link.to ? '#c9a84c' : '#aaa',
                    fontWeight: 500,
                    transition: 'color 0.3s',
                    position: 'relative',
                  }}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.div layoutId="nav-underline" style={{
                      position: 'absolute', bottom: -4, left: 0, right: 0,
                      height: 1, background: '#c9a84c'
                    }} />
                  )}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Cart */}
            <Link to="/cart">
              <motion.div whileHover={{ scale: 1.1 }} style={{ position: 'relative', cursor: 'pointer' }}>
                <ShoppingCart size={20} color="#aaa" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute', top: -8, right: -8,
                      background: '#c9a84c', color: '#000',
                      borderRadius: '50%', width: 16, height: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, fontWeight: 700
                    }}
                  >{cartCount}</motion.span>
                )}
              </motion.div>
            </Link>

            {user ? (
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <Link to="/profile">
                  <motion.div whileHover={{ scale: 1.1 }} style={{ cursor: 'pointer' }}>
                    <User size={20} color="#aaa" />
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ color: '#c9a84c' }}
                  onClick={handleLogout}
                  style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="btn-gold"
                  style={{ padding: '8px 20px', fontSize: 10 }}
                >
                  Sign In
                </motion.button>
              </Link>
            )}

            {/* Mobile menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
              className="mobile-menu-btn"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
              background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(20px)',
              zIndex: 999, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 40
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={link.to}>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: '#fff' }}>{link.label}</span>
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div style={{ width: 60, height: 1, background: '#c9a84c', margin: '0 auto 24px' }} />
              {user ? (
                <div style={{ display: 'flex', gap: 20, flexDirection: 'column', alignItems: 'center' }}>
                  <Link to="/profile"><span style={{ color: '#c9a84c', letterSpacing: 3, fontSize: 12, textTransform: 'uppercase' }}>My Profile</span></Link>
                  <Link to="/orders"><span style={{ color: '#c9a84c', letterSpacing: 3, fontSize: 12, textTransform: 'uppercase' }}>My Orders</span></Link>
                  <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#888', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Inter' }}>Logout</button>
                </div>
              ) : (
                <Link to="/login"><button className="btn-gold">Sign In</button></Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
