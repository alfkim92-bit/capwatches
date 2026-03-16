import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Globe, Heart, Watch, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7 } })
};

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div style={{ background: '#050505', paddingTop: 72 }}>

      {/* Hero */}
      <div ref={heroRef} style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
        <motion.div style={{ y: bgY, position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.25)' }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, #050505)' }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center' }}>
            <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Our Story</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff' }}>
              About <span className="shimmer-text">CAP Watches</span>
            </h1>
            <div className="gold-line" style={{ margin: '20px auto' }} />
          </motion.div>
        </div>
      </div>

      {/* Mission */}
      <div style={{ padding: '100px 10%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="section-label">Who We Are</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 24 }}>
              Pakistan's Premier<br /><span className="shimmer-text">Luxury Timepiece</span><br />Destination
            </h2>
            <div className="gold-line" />
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.9, marginTop: 24, fontFamily: 'Cormorant Garamond, serif', fontSize: 18 }}>
              CAP Watches was born from a single belief: that every Pakistani deserves to wear excellence on their wrist. We bridge the gap between international luxury watchmaking and the discerning Pakistani consumer.
            </p>
            <p style={{ color: '#777', fontSize: 14, lineHeight: 1.9, marginTop: 16 }}>
              Our collection is meticulously curated — each timepiece selected not just for its beauty, but for its story, its movement, and the statement it makes about the person who wears it.
            </p>
            <Link to="/products" style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <button className="btn-gold">Explore Collection <ArrowRight size={12} style={{ display: 'inline' }} /></button>
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}>
            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=700&q=90" alt="CAP Watch" style={{ width: '100%', height: 500, objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: -20, right: -20, background: '#0a0a0a', border: '1px solid #c9a84c', padding: '24px 32px' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, color: '#c9a84c', fontWeight: 700, lineHeight: 1 }}>2024</div>
                <div style={{ color: '#888', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginTop: 4 }}>Est. in Pakistan</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div style={{ background: '#080808', padding: '100px 10%' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Our Values</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff' }}>
            What <span className="shimmer-text">Drives</span> Us
          </h2>
          <div className="gold-line" style={{ margin: '20px auto' }} />
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
          {[
            { icon: Award, title: 'Authenticity', desc: 'Every watch in our collection is 100% genuine. No replicas, no compromises. Only the real thing.' },
            { icon: Heart, title: 'Passion', desc: 'We are watch lovers first. Our passion for horology drives every curation decision we make.' },
            { icon: Globe, title: 'Pakistan-First', desc: 'Proudly Pakistani. We deliver luxury to every city, town, and village across the nation.' },
            { icon: Users, title: 'Community', desc: 'Our customers are our family. We\'re building a community of watch enthusiasts across Pakistan.' },
          ].map((v, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              whileHover={{ y: -4, background: '#0d0d0d' }}
              style={{ padding: 40, border: '1px solid #111', transition: 'all 0.3s', cursor: 'default' }}
            >
              <div style={{ width: 48, height: 48, border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <v.icon size={20} color="#c9a84c" />
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#fff', marginBottom: 12 }}>{v.title}</h3>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team / Story */}
      <div style={{ padding: '100px 10%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <img src="https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=400&q=80" style={{ width: '100%', height: 220, objectFit: 'cover' }} />
              <img src="https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&q=80" style={{ width: '100%', height: 220, objectFit: 'cover', marginTop: 24 }} />
              <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80" style={{ width: '100%', height: 220, objectFit: 'cover', marginTop: -24 }} />
              <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80" style={{ width: '100%', height: 220, objectFit: 'cover' }} />
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="section-label">The Journey</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 24 }}>
              Crafting Luxury<br /><span className="shimmer-text">One Watch at a Time</span>
            </h2>
            <div className="gold-line" />
            <p style={{ color: '#888', lineHeight: 1.9, marginTop: 24, fontFamily: 'Cormorant Garamond, serif', fontSize: 18 }}>
              What began as a passion project among watch aficionados in Lahore has grown into Pakistan's most trusted online destination for premium timepieces.
            </p>
            <p style={{ color: '#777', fontSize: 14, lineHeight: 1.9, marginTop: 16 }}>
              We deliver nationwide — from Karachi's bustling streets to the mountain valleys of KPK. Every order is packed with care in our signature luxury box and dispatched within 24 hours.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 36 }}>
              {[
                { n: '5000+', l: 'Watches Sold' },
                { n: 'PKR 0', l: 'Delivery Cost' },
                { n: '100%', l: 'Satisfaction' },
                { n: '48hrs', l: 'Average Delivery' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '20px', background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: '#c9a84c', fontWeight: 700 }}>{s.n}</div>
                  <div style={{ color: '#666', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'relative', padding: '100px 10%', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.15)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.7)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Begin Your Journey</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            Find Your <span className="shimmer-text">Perfect Timepiece</span>
          </h2>
          <p style={{ color: '#888', fontSize: 16, maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.8 }}>
            Every great collection begins with a single extraordinary watch.
          </p>
          <Link to="/products"><button className="btn-gold" style={{ fontSize: 12 }}>Shop The Collection</button></Link>
        </motion.div>
      </div>

    </div>
  );
}
