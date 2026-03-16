import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#050505', paddingTop: 72 }}>
      <ShoppingBag size={64} color="#333" style={{ marginBottom: 24 }} />
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: '#fff', marginBottom: 12 }}>Sign in to view cart</h2>
      <p style={{ color: '#666', marginBottom: 32 }}>Please login to access your cart</p>
      <Link to="/login"><button className="btn-gold">Sign In</button></Link>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#050505', paddingTop: 72 }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.4 }}>
        <ShoppingBag size={80} color="#1a1a1a" style={{ marginBottom: 24 }} />
      </motion.div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: '#fff', marginBottom: 12 }}>Your cart is empty</h2>
      <p style={{ color: '#666', marginBottom: 32 }}>Discover our exquisite collection</p>
      <Link to="/products"><button className="btn-gold">Browse Collection</button></Link>
    </div>
  );

  return (
    <div style={{ background: '#050505', paddingTop: 72, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="section-label">Your Selection</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Shopping Cart</h1>
          <div className="gold-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, marginTop: 48, alignItems: 'start' }}>

          {/* Items */}
          <div>
            <AnimatePresence>
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ display: 'flex', gap: 24, padding: '24px 0', borderBottom: '1px solid #111', alignItems: 'center' }}
                >
                  <div style={{ width: 90, height: 90, overflow: 'hidden', flexShrink: 0, border: '1px solid #1a1a1a' }}>
                    <img src={item.images[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#fff', marginBottom: 6 }}>{item.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: item.color, border: '1px solid rgba(255,255,255,0.2)' }} />
                      <span style={{ color: '#666', fontSize: 12, letterSpacing: 1 }}>{item.color}</span>
                    </div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#c9a84c' }}>PKR {item.price.toLocaleString()}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid #333' }}>
                    <motion.button whileHover={{ background: '#1a1a1a' }} onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: 36, height: 36, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><Minus size={12} /></motion.button>
                    <span style={{ width: 36, textAlign: 'center', color: '#fff', fontSize: 14 }}>{item.quantity}</span>
                    <motion.button whileHover={{ background: '#1a1a1a' }} onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: 36, height: 36, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><Plus size={12} /></motion.button>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 100 }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#fff', marginBottom: 8 }}>PKR {(item.price * item.quantity).toLocaleString()}</div>
                    <motion.button whileHover={{ color: '#ff4444', scale: 1.1 }} onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 32, position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#fff', marginBottom: 24 }}>Order Summary</h3>
            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 20 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: '#888', fontSize: 13 }}>{item.name} × {item.quantity}</span>
                  <span style={{ color: '#aaa', fontSize: 13 }}>PKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16, marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ color: '#888', fontSize: 13 }}>Subtotal</span>
                  <span style={{ color: '#aaa' }}>PKR {cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ color: '#888', fontSize: 13 }}>Shipping</span>
                  <span style={{ color: '#4ade80', fontSize: 13 }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', paddingTop: 16, marginTop: 12 }}>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#fff' }}>Total</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#c9a84c', fontWeight: 700 }}>PKR {cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/checkout')} className="btn-gold" style={{ width: '100%', marginTop: 24, padding: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Proceed to Checkout <ArrowRight size={14} />
            </motion.button>
            <Link to="/products">
              <button className="btn-outline" style={{ width: '100%', marginTop: 12, padding: '14px 0' }}>Continue Shopping</button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
