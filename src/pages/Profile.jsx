import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, LogOut, Edit3, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const { wishlist: wishedIds } = useCart();
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishProducts, setWishProducts] = useState([]);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/auth/profile').then(r => { setProfile(r.data); setForm(r.data); });
    api.get('/orders').then(r => setOrders(r.data));
    api.get('/wishlist').then(r => setWishProducts(r.data));
  }, [user]);

  const handleSave = async () => {
    try {
      await api.put('/auth/profile', form);
      setProfile(form);
      setEditing(false);
      toast.success('Profile updated!');
    } catch { toast.error('Failed to update'); }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ];

  return (
    <div style={{ background: '#050505', paddingTop: 72, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span className="section-label">Account</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: '#fff' }}>
              Welcome, <span className="shimmer-text">{user.name}</span>
            </h1>
            <div className="gold-line" />
          </div>
          <motion.button whileHover={{ scale: 1.02, color: '#ff4444' }} onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid #333', padding: '10px 20px', color: '#888', cursor: 'pointer', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Inter' }}>
            <LogOut size={14} /> Logout
          </motion.button>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }}>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 100, height: 'fit-content' }}>
            <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', overflow: 'hidden' }}>
              <div style={{ padding: 24, borderBottom: '1px solid #1a1a1a', textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #a07830, #c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <User size={24} color="#000" />
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: '#fff' }}>{user.name}</div>
                <div style={{ color: '#666', fontSize: 11, marginTop: 4 }}>{user.email}</div>
              </div>
              {tabs.map(t => (
                <motion.button
                  key={t.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setTab(t.id)}
                  style={{ width: '100%', padding: '14px 20px', background: tab === t.id ? 'rgba(201,168,76,0.1)' : 'transparent', border: 'none', borderLeft: `3px solid ${tab === t.id ? '#c9a84c' : 'transparent'}`, color: tab === t.id ? '#c9a84c' : '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Inter', transition: 'all 0.3s' }}
                >
                  <t.icon size={14} /> {t.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

            {tab === 'profile' && profile && (
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 36 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#fff' }}>Profile Information</h3>
                  {!editing ? (
                    <button onClick={() => setEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid #333', padding: '8px 16px', color: '#888', cursor: 'pointer', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Inter' }}>
                      <Edit3 size={12} /> Edit
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#c9a84c', border: 'none', padding: '8px 16px', color: '#000', cursor: 'pointer', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Inter', fontWeight: 700 }}>
                        <Save size={12} /> Save
                      </button>
                      <button onClick={() => { setEditing(false); setForm(profile); }} style={{ background: 'none', border: '1px solid #333', padding: '8px', color: '#888', cursor: 'pointer' }}>
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {[
                    { label: 'Full Name', key: 'name' },
                    { label: 'Phone', key: 'phone' },
                    { label: 'Address', key: 'address' },
                    { label: 'City', key: 'city' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>{f.label}</label>
                      {editing ? (
                        <input value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                      ) : (
                        <div style={{ padding: '14px 18px', background: '#111', border: '1px solid #1a1a1a', color: form[f.key] ? '#fff' : '#444', fontSize: 14 }}>
                          {form[f.key] || 'Not set'}
                        </div>
                      )}
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Email</label>
                    <div style={{ padding: '14px 18px', background: '#111', border: '1px solid #1a1a1a', color: '#fff', fontSize: 14 }}>{user.email}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Member Since</label>
                    <div style={{ padding: '14px 18px', background: '#111', border: '1px solid #1a1a1a', color: '#fff', fontSize: 14 }}>
                      {profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'long' }) : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#fff', marginBottom: 24 }}>Order History</h3>
                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 80, background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
                    <Package size={48} color="#333" style={{ marginBottom: 16 }} />
                    <p style={{ color: '#666', fontSize: 14 }}>No orders yet. Start your collection today.</p>
                    <Link to="/products"><button className="btn-gold" style={{ marginTop: 20 }}>Shop Now</button></Link>
                  </div>
                ) : orders.map((order, i) => (
                  <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 24, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div>
                        <div style={{ color: '#c9a84c', fontSize: 12, letterSpacing: 2, marginBottom: 4 }}>ORDER #{order.id}</div>
                        <div style={{ color: '#666', fontSize: 12 }}>{new Date(order.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ background: order.status === 'pending' ? 'rgba(201,168,76,0.1)' : 'rgba(74,222,128,0.1)', border: `1px solid ${order.status === 'pending' ? '#c9a84c' : '#4ade80'}`, color: order.status === 'pending' ? '#c9a84c' : '#4ade80', fontSize: 10, letterSpacing: 2, padding: '4px 12px', textTransform: 'uppercase', marginBottom: 8 }}>
                          {order.status}
                        </div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#fff' }}>PKR {order.total.toLocaleString()}</div>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid #111', paddingTop: 16 }}>
                      {order.items.map((item, j) => (
                        <div key={j} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ color: '#aaa', fontSize: 13 }}>{item.name} × {item.quantity}</span>
                          <span style={{ color: '#666', fontSize: 13 }}>PKR {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      <div style={{ marginTop: 12, color: '#666', fontSize: 12 }}>
                        <span style={{ color: '#555' }}>Deliver to: </span>{order.shipping_city} — {order.shipping_address}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === 'wishlist' && (
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#fff', marginBottom: 24 }}>Wishlist</h3>
                {wishProducts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 80, background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
                    <Heart size={48} color="#333" style={{ marginBottom: 16 }} />
                    <p style={{ color: '#666', fontSize: 14 }}>No saved watches yet.</p>
                    <Link to="/products"><button className="btn-gold" style={{ marginTop: 20 }}>Discover Collection</button></Link>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
                    {wishProducts.map((p, i) => (
                      <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                        <Link to={`/products/${p.product_id}`}>
                          <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                          <div style={{ padding: 16 }}>
                            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, color: '#fff', marginBottom: 6 }}>{p.name}</div>
                            <div style={{ color: '#c9a84c', fontSize: 14 }}>PKR {p.price.toLocaleString()}</div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}
