import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, Award, ChevronDown } from 'lucide-react';
import api from '../api';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } })
};

const heroWatches = [
  { bg: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1400&q=90', title: 'Sovereign Elite', sub: 'The pinnacle of luxury' },
  { bg: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=1400&q=90', title: 'Noir Phantom', sub: 'Born from the darkness' },
  { bg: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=1400&q=90', title: 'Heritage Classic', sub: 'Timeless craftsmanship' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    api.get('/products').then(r => setProducts(r.data.filter(p => p.featured)));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroWatches.length), 5000);
    return () => clearInterval(t);
  }, []);

  const featured = heroWatches[heroIndex];

  return (
    <div style={{ background: '#050505' }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <motion.div style={{ y: heroY, height: '110%', position: 'absolute', inset: 0 }}>
              <div
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${featured.bg})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  filter: 'brightness(0.35)',
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.9) 40%, transparent 100%), linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 50%)' }} />

        {/* Animated gold particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            style={{
              position: 'absolute',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              width: 2, height: 2, borderRadius: '50%',
              background: '#c9a84c',
            }}
          />
        ))}

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                <span className="section-label">CAP Watches — Pakistan</span>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(42px, 7vw, 90px)', fontWeight: 800, lineHeight: 1.05, color: '#fff', marginBottom: 16 }}>
                  CAP<br />
                  <span className="shimmer-text">{featured.title}</span>
                </h1>
                <p style={{ color: '#999', fontSize: 'clamp(14px, 2vw, 18px)', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', marginBottom: 40, maxWidth: 400 }}>
                  {featured.sub} — precision crafted for the extraordinary individual.
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Link to="/products"><button className="btn-gold">Explore Collection <ArrowRight size={14} style={{ display: 'inline', marginLeft: 8 }} /></button></Link>
                  <Link to="/about"><button className="btn-outline">Our Story</button></Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div style={{ position: 'absolute', bottom: 40, left: '10%', display: 'flex', gap: 8, zIndex: 2 }}>
          {heroWatches.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setHeroIndex(i)}
              animate={{ width: i === heroIndex ? 32 : 8, background: i === heroIndex ? '#c9a84c' : '#555' }}
              transition={{ duration: 0.4 }}
              style={{ height: 3, border: 'none', cursor: 'pointer', borderRadius: 2 }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: 40, right: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 2 }}
        >
          <span style={{ fontSize: 9, letterSpacing: 3, color: '#555', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown size={14} color="#c9a84c" />
        </motion.div>
      </div>

      {/* MARQUEE */}
      <div style={{ background: '#c9a84c', overflow: 'hidden', padding: '14px 0' }}>
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: 60, whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
              {['Free Shipping Across Pakistan', 'Swiss Movement', 'Lifetime Warranty', 'Cash on Delivery', '100% Authentic', 'Luxury Packaging'].map(text => (
                <span key={text} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#000', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ width: 4, height: 4, background: '#000', borderRadius: '50%' }} />
                  {text}
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <div style={{ padding: '80px 10%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 40, borderBottom: '1px solid #111' }}>
        {[
          { n: '5000+', l: 'Happy Customers' },
          { n: '6+', l: 'Premium Collections' },
          { n: '100%', l: 'Authentic' },
          { n: 'PKR', l: 'Best Price' },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>{s.n}</div>
            <div style={{ color: '#666', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginTop: 8 }}>{s.l}</div>
          </motion.div>
        ))}
      </div>

      {/* FEATURED COLLECTION */}
      <div style={{ padding: '100px 10%' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Curated Selection</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff' }}>
            Featured <span className="shimmer-text">Collection</span>
          </h2>
          <div className="gold-line" style={{ margin: '20px auto' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginTop: 60 }}>
          <Link to="/products"><button className="btn-outline">View Full Collection</button></Link>
        </motion.div>
      </div>

      {/* WHY US */}
      <div style={{ background: '#080808', padding: '100px 10%' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Why Choose Us</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff' }}>
            The CAP <span className="shimmer-text">Promise</span>
          </h2>
          <div className="gold-line" style={{ margin: '20px auto' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
          {[
            { icon: Shield, title: 'Genuine Quality', desc: '100% authentic timepieces with manufacturer certification and warranty.' },
            { icon: Truck, title: 'Pakistan-Wide Delivery', desc: 'Free shipping to every corner of Pakistan. COD available.' },
            { icon: Star, title: '5-Star Experience', desc: 'Luxury packaging, white-glove service, and a dedicated support team.' },
            { icon: Award, title: 'Award-Winning Design', desc: 'Every CAP watch is an artifact of horological artistry.' },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: 36, textAlign: 'center', cursor: 'default' }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                style={{ width: 56, height: 56, border: '1px solid #c9a84c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}
              >
                <f.icon size={22} color="#c9a84c" />
              </motion.div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>{f.title}</h3>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LUXURY BANNER */}
      <div style={{ position: 'relative', height: 500, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=1400&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,5,5,0.9) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">Limited Offer</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700, color: '#fff', marginBottom: 16, maxWidth: 500 }}>
              The Aurum Gold — <span className="shimmer-text">18K Masterpiece</span>
            </h2>
            <p style={{ color: '#999', marginBottom: 32, maxWidth: 400, fontSize: 15, lineHeight: 1.7 }}>
              Only 5 units available. Own a piece of Pakistani luxury history.
            </p>
            <Link to="/products/5">
              <button className="btn-gold">Acquire Now</button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ padding: '100px 10%' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>What They Say</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff' }}>
            Customer <span className="shimmer-text">Stories</span>
          </h2>
          <div className="gold-line" style={{ margin: '20px auto' }} />
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            { name: 'Ahmed K.', city: 'Lahore', text: 'The CAP Sovereign arrived in the most exquisite packaging I\'ve ever seen. The watch itself is absolutely stunning — surpassed all expectations.', rating: 5 },
            { name: 'Zara M.', city: 'Karachi', text: 'Gifted my husband the Heritage Classic. He hasn\'t taken it off since. Delivery was fast and the quality is unmatched in Pakistan.', rating: 5 },
            { name: 'Bilal A.', city: 'Islamabad', text: 'Bought the Velocity Sport for my MBA graduation. The build quality is incredible. Worth every rupee. CAP is a true luxury brand.', rating: 5 },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 36 }}
            >
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={12} fill="#c9a84c" color="#c9a84c" />)}
              </div>
              <p style={{ color: '#bbb', fontSize: 14, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 24, fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}>"{t.text}"</p>
              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16 }}>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>{t.name}</div>
                <div style={{ color: '#c9a84c', fontSize: 11, letterSpacing: 2 }}>{t.city}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}

function ProductCard({ product, index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', overflow: 'hidden', transition: 'border-color 0.3s', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a84c33'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
    >
      <Link to={`/products/${product.id}`}>
        <div style={{ position: 'relative', overflow: 'hidden', height: 260 }}>
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
            src={product.images[0]}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {product.badge && (
            <div style={{ position: 'absolute', top: 16, left: 16 }}>
              <span className="badge">{product.badge}</span>
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 60%)' }} />
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 8 }}>{product.category}</div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#c9a84c', fontWeight: 700 }}>PKR {product.price.toLocaleString()}</span>
            {product.original_price && <span style={{ color: '#555', fontSize: 13, textDecoration: 'line-through' }}>PKR {product.original_price.toLocaleString()}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
