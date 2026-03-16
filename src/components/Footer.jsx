import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Watch, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid #1a1a1a', paddingTop: 80 }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 60, marginBottom: 60 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, border: '2px solid #c9a84c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Watch size={16} color="#c9a84c" />
              </div>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, letterSpacing: 3, color: '#fff', lineHeight: 1 }}>CAP</div>
                <div style={{ fontSize: 8, letterSpacing: 5, color: '#c9a84c', textTransform: 'uppercase' }}>WATCHES</div>
              </div>
            </div>
            <p style={{ color: '#666', fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>
              Precision crafted timepieces delivered across all of Pakistan. Where luxury meets legacy.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.div key={i} whileHover={{ y: -3, color: '#c9a84c' }} style={{ width: 34, height: 34, border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666', transition: 'color 0.3s' }}>
                  <Icon size={14} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#c9a84c', marginBottom: 24 }}>Navigation</h4>
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Collection' },
              { to: '/about', label: 'About Us' },
              { to: '/cart', label: 'Cart' },
            ].map(link => (
              <Link key={link.to} to={link.to}>
                <motion.p whileHover={{ x: 4, color: '#c9a84c' }} style={{ color: '#666', fontSize: 13, marginBottom: 12, cursor: 'pointer', transition: 'color 0.3s' }}>
                  {link.label}
                </motion.p>
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#c9a84c', marginBottom: 24 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <MapPin size={14} color="#c9a84c" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: '#666', fontSize: 13, lineHeight: 1.6 }}>Pakistan — Nationwide Delivery</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Phone size={14} color="#c9a84c" />
                <span style={{ color: '#666', fontSize: 13 }}>+92 300 0000000</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Mail size={14} color="#c9a84c" />
                <span style={{ color: '#666', fontSize: 13 }}>info@capwatches.pk</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#c9a84c', marginBottom: 24 }}>Stay Updated</h4>
            <p style={{ color: '#666', fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>Subscribe for exclusive releases and offers.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input placeholder="Your email address" style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '12px 16px', fontSize: 13, outline: 'none' }} />
              <button className="btn-gold" style={{ width: '100%' }}>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #1a1a1a', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#444', fontSize: 12, letterSpacing: 1 }}>© 2024 CAP Watches. All rights reserved.</p>
          <p style={{ color: '#444', fontSize: 12, letterSpacing: 1 }}>capwatches.pk — Premium Timepieces Across Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
