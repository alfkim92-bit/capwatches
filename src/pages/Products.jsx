import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const categories = ['All', 'Luxury', 'Classic', 'Sport', 'Sport Luxury', 'Minimalist'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const { user } = useAuth();
  const { addToCart, toggleWishlist, isLiked } = useCart();

  useEffect(() => {
    api.get('/products').then(r => {
      setProducts(r.data);
      setFiltered(r.data);
    });
  }, []);

  useEffect(() => {
    let list = activeCategory === 'All' ? [...products] : products.filter(p => p.category === activeCategory);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    setFiltered(list);
  }, [activeCategory, sort, products]);

  const handleAddCart = async (e, p) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to add to cart');
    await addToCart(p.id, p.colors[0]);
    toast.success(`${p.name} added to cart!`);
  };

  const handleWishlist = async (e, p) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to save watches');
    const liked = await toggleWishlist(p.id);
    toast.success(liked ? 'Added to wishlist!' : 'Removed from wishlist');
  };

  return (
    <div style={{ background: '#050505', paddingTop: 72 }}>
      {/* Page Header */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.2)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #050505)' }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Our Masterpieces</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#fff', textAlign: 'center' }}>
              The <span className="shimmer-text">Collection</span>
            </h1>
            <div className="gold-line" style={{ margin: '16px auto' }} />
          </motion.div>
        </div>
      </div>

      <div style={{ padding: '60px 8%' }}>
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? '#c9a84c' : 'transparent',
                  color: activeCategory === cat ? '#000' : '#888',
                  border: `1px solid ${activeCategory === cat ? '#c9a84c' : '#333'}`,
                  padding: '8px 20px',
                  fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s',
                }}
              >{cat}</motion.button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ width: 'auto', padding: '8px 20px', background: '#111', border: '1px solid #333', color: '#888', fontSize: 11, letterSpacing: 2, cursor: 'pointer' }}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </motion.div>

        {/* Products Grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -8 }}
                style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', overflow: 'hidden', position: 'relative', transition: 'border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
              >
                <Link to={`/products/${p.id}`}>
                  {/* Image */}
                  <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                      src={p.images[0]}
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 60%)' }} />
                    {p.badge && <span className="badge" style={{ position: 'absolute', top: 16, left: 16 }}>{p.badge}</span>}

                    {/* Wishlist btn */}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={e => handleWishlist(e, p)}
                      style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.7)', border: '1px solid #333', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Heart size={14} fill={isLiked(p.id) ? '#c9a84c' : 'none'} color={isLiked(p.id) ? '#c9a84c' : '#888'} />
                    </motion.button>
                  </div>

                  {/* Info */}
                  <div style={{ padding: 24 }}>
                    <div style={{ fontSize: 9, letterSpacing: 3, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 8 }}>{p.category}</div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{p.name}</h3>
                    <p style={{ color: '#555', fontSize: 12, lineHeight: 1.6, marginBottom: 16, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.description}</p>

                    {/* Colors */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                      {p.colors.slice(0, 4).map((c, ci) => (
                        <div key={ci} style={{ width: 14, height: 14, borderRadius: '50%', background: c, border: '1px solid rgba(255,255,255,0.2)' }} />
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#c9a84c', fontWeight: 700 }}>
                          PKR {p.price.toLocaleString()}
                        </div>
                        {p.original_price && <div style={{ color: '#555', fontSize: 12, textDecoration: 'line-through' }}>PKR {p.original_price.toLocaleString()}</div>}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Add to cart */}
                <div style={{ padding: '0 24px 24px', display: 'flex', gap: 10 }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={e => handleAddCart(e, p)}
                    className="btn-gold"
                    style={{ flex: 1, padding: '12px 0' }}
                  >
                    Add to Cart
                  </motion.button>
                  <Link to={`/products/${p.id}`} style={{ flex: 1 }}>
                    <button className="btn-outline" style={{ width: '100%', padding: '12px 0' }}>
                      View
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
