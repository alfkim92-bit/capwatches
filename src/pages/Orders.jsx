import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/orders').then(r => setOrders(r.data));
  }, [user]);

  return (
    <div style={{ background: '#050505', paddingTop: 72, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="section-label">Your Purchases</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 8 }}>My Orders</h1>
          <div className="gold-line" />
        </motion.div>
        <div style={{ marginTop: 48 }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 80 }}>
              <Package size={60} color="#1a1a1a" style={{ marginBottom: 20 }} />
              <p style={{ color: '#666' }}>No orders yet.</p>
              <Link to="/products"><button className="btn-gold" style={{ marginTop: 20 }}>Shop Now</button></Link>
            </div>
          ) : orders.map((order, i) => (
            <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 28, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ color: '#c9a84c', fontSize: 12, letterSpacing: 2, marginBottom: 4 }}>ORDER #{order.id}</div>
                  <div style={{ color: '#666', fontSize: 12 }}>{new Date(order.created_at).toLocaleDateString('en-PK', { dateStyle: 'long' })}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#c9a84c', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6, border: '1px solid rgba(201,168,76,0.3)', padding: '3px 10px', display: 'inline-block' }}>{order.status}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#fff' }}>PKR {order.total.toLocaleString()}</div>
                </div>
              </div>
              {order.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid #111' }}>
                  <span style={{ color: '#aaa', fontSize: 13 }}>{item.name} × {item.quantity} — <span style={{ color: '#666' }}>{item.color}</span></span>
                  <span style={{ color: '#888', fontSize: 13 }}>PKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, color: '#555', fontSize: 12 }}>
                {order.shipping_city} — {order.shipping_address} | {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
