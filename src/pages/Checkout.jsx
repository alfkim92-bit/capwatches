import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, MapPin, Phone, User, CreditCard, Truck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    payment_method: 'cod',
  });

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Other'];

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      return toast.error('Please fill all fields');
    }
    setLoading(true);
    try {
      const res = await api.post('/orders', {
        items: cart.map(i => ({ product_id: i.product_id, name: i.name, price: i.price, quantity: i.quantity, color: i.color })),
        total: cartTotal,
        shipping_name: form.name,
        shipping_phone: form.phone,
        shipping_address: form.address,
        shipping_city: form.city,
        payment_method: form.payment_method,
      });
      setOrderId(res.data.order_id);
      setSuccess(true);
      clearCart();
    } catch (err) {
      toast.error('Order failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) { navigate('/login'); return null; }

  if (success) return (
    <div style={{ minHeight: '100vh', background: '#050505', paddingTop: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', maxWidth: 500, padding: 60 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #a07830, #c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}
        >
          <Check size={36} color="#000" strokeWidth={3} />
        </motion.div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, color: '#fff', marginBottom: 12 }}>Order Confirmed!</h1>
        <p style={{ color: '#888', fontSize: 14, lineHeight: 1.8, marginBottom: 8 }}>Thank you, {form.name}. Your order #{orderId} has been placed.</p>
        <p style={{ color: '#c9a84c', fontSize: 13, marginBottom: 32 }}>We'll deliver to {form.city} within 3-5 business days.</p>
        <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 24, marginBottom: 32, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: '#666', fontSize: 13 }}>Order ID</span>
            <span style={{ color: '#c9a84c', fontWeight: 600 }}>#{orderId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: '#666', fontSize: 13 }}>Payment</span>
            <span style={{ color: '#aaa', fontSize: 13 }}>Cash on Delivery</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666', fontSize: 13 }}>Total</span>
            <span style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 18 }}>PKR {cartTotal.toLocaleString()}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/orders')} className="btn-gold" style={{ flex: 1 }}>View Orders</button>
          <button onClick={() => navigate('/products')} className="btn-outline" style={{ flex: 1 }}>Shop More</button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div style={{ background: '#050505', paddingTop: 72, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="section-label">Almost there</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Checkout</h1>
          <div className="gold-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, marginTop: 48, alignItems: 'start' }}>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 10, letterSpacing: 4, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                <User size={14} /> Shipping Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Full Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ahmed Khan" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Phone Number</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 0000000" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Street Address</label>
                  <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="House #, Street, Area" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 10, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>City</label>
                  <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                    <option value="">Select your city</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 style={{ fontSize: 10, letterSpacing: 4, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                <CreditCard size={14} /> Payment Method
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { id: 'cod', icon: Truck, label: 'Cash on Delivery', desc: 'Pay when your watch arrives' },
                  { id: 'bank', icon: CreditCard, label: 'Bank Transfer', desc: 'Direct bank transfer (instructions via email)' },
                ].map(method => (
                  <motion.div
                    key={method.id}
                    whileHover={{ borderColor: 'rgba(201,168,76,0.5)' }}
                    onClick={() => setForm({ ...form, payment_method: method.id })}
                    style={{ padding: 20, border: `1px solid ${form.payment_method === method.id ? '#c9a84c' : '#222'}`, cursor: 'pointer', background: form.payment_method === method.id ? 'rgba(201,168,76,0.05)' : 'transparent', display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.3s' }}
                  >
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${form.payment_method === method.id ? '#c9a84c' : '#444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {form.payment_method === method.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c9a84c' }} />}
                    </div>
                    <method.icon size={18} color={form.payment_method === method.id ? '#c9a84c' : '#555'} />
                    <div>
                      <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{method.label}</div>
                      <div style={{ color: '#666', fontSize: 12 }}>{method.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 28, position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#fff', marginBottom: 20 }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #111' }}>
                <img src={item.images[0]} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover', border: '1px solid #1a1a1a' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#ddd', fontSize: 13, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666', fontSize: 12 }}>× {item.quantity}</span>
                    <span style={{ color: '#c9a84c', fontSize: 13 }}>PKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#666', fontSize: 13 }}>Subtotal</span>
                <span style={{ color: '#aaa', fontSize: 13 }}>PKR {cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ color: '#666', fontSize: 13 }}>Delivery</span>
                <span style={{ color: '#4ade80', fontSize: 13 }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', paddingTop: 16 }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#fff' }}>Total</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#c9a84c', fontWeight: 700 }}>PKR {cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOrder}
              disabled={loading}
              className="btn-gold"
              style={{ width: '100%', marginTop: 24, padding: '16px 0', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
