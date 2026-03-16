import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, Shield, Truck, ChevronLeft, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedCart, setAddedCart] = useState(false);
  const { user } = useAuth();
  const { addToCart, toggleWishlist, isLiked } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data));
  }, [id]);

  const handleAddCart = async () => {
    if (!user) return toast.error('Please login first');
    await addToCart(product.id, product.colors[selectedColor], qty);
    setAddedCart(true);
    toast.success('Added to cart!');
    setTimeout(() => setAddedCart(false), 2000);
  };

  const handleBuyNow = async () => {
    if (!user) { navigate('/login'); return; }
    await addToCart(product.id, product.colors[selectedColor], qty);
    navigate('/checkout');
  };

  const handleWishlist = async () => {
    if (!user) return toast.error('Please login first');
    const liked = await toggleWishlist(product.id);
    toast.success(liked ? 'Added to wishlist!' : 'Removed from wishlist');
  };

  if (!product) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: 40, height: 40, border: '2px solid #c9a84c', borderTopColor: 'transparent', borderRadius: '50%' }} />
    </div>
  );

  const savings = product.original_price ? product.original_price - product.price : 0;

  return (
    <div style={{ background: '#050505', paddingTop: 72, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '60px 40px' }}>

        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48, color: '#555', fontSize: 12, letterSpacing: 2 }}>
          <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#c9a84c' }}>
            <ChevronLeft size={14} /> Collection
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left: Images */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ position: 'relative', marginBottom: 16, overflow: 'hidden', background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  style={{ width: '100%', height: 500, objectFit: 'cover', display: 'block' }}
                />
              </AnimatePresence>
              {savings > 0 && (
                <div style={{ position: 'absolute', top: 20, left: 20, background: '#c9a84c', color: '#000', padding: '4px 12px', fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>
                  SAVE PKR {savings.toLocaleString()}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {product.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(i)}
                  style={{ width: 80, height: 70, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${i === selectedImage ? '#c9a84c' : '#1a1a1a'}`, transition: 'border 0.3s' }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            {product.badge && <span className="badge" style={{ marginBottom: 16, display: 'inline-block' }}>{product.badge}</span>}
            <div style={{ fontSize: 10, letterSpacing: 4, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 12 }}>{product.category}</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>{product.name}</h1>

            {/* Stars */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />)}
              <span style={{ color: '#666', fontSize: 12, marginLeft: 8 }}>(48 reviews)</span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, color: '#c9a84c', fontWeight: 700 }}>
                PKR {product.price.toLocaleString()}
              </span>
              {product.original_price && (
                <span style={{ color: '#555', fontSize: 16, textDecoration: 'line-through', marginLeft: 16 }}>
                  PKR {product.original_price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="gold-line" style={{ marginBottom: 28 }} />

            {/* Description */}
            <p style={{ color: '#888', fontSize: 14, lineHeight: 1.9, marginBottom: 32, fontFamily: 'Cormorant Garamond, serif', fontSize: 17 }}>
              {product.description}
            </p>

            {/* Color Selection */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: '#aaa', textTransform: 'uppercase', marginBottom: 14 }}>
                Select Color
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {product.colors.map((color, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(i)}
                    style={{
                      width: 32, height: 32, borderRadius: '50%', background: color,
                      border: `2px solid ${i === selectedColor ? '#c9a84c' : 'rgba(255,255,255,0.15)'}`,
                      cursor: 'pointer', position: 'relative',
                      boxShadow: i === selectedColor ? `0 0 0 3px rgba(201,168,76,0.3)` : 'none',
                      outline: 'none',
                    }}
                  >
                    {i === selectedColor && <Check size={12} color="#fff" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}
                  </motion.button>
                ))}
              </div>
              <div style={{ fontSize: 12, color: '#c9a84c', marginTop: 8 }}>
                Selected: <span style={{ color: '#aaa' }}>{product.colors[selectedColor]}</span>
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: '#aaa', textTransform: 'uppercase', marginBottom: 14 }}>Quantity</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'fit-content', border: '1px solid #333' }}>
                <motion.button whileHover={{ background: '#1a1a1a' }} onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 42, height: 42, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>−</motion.button>
                <div style={{ width: 50, textAlign: 'center', fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#fff' }}>{qty}</div>
                <motion.button whileHover={{ background: '#1a1a1a' }} onClick={() => setQty(qty + 1)} style={{ width: 42, height: 42, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>+</motion.button>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="btn-gold"
                style={{ flex: 1, minWidth: 140, padding: '16px 0', fontSize: 11 }}
              >
                Buy Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddCart}
                className="btn-outline"
                style={{ flex: 1, minWidth: 140, padding: '16px 0' }}
              >
                {addedCart ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Check size={12} /> Added!
                  </span>
                ) : 'Add to Cart'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlist}
                style={{ width: 52, height: 52, border: '1px solid #333', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Heart size={18} fill={isLiked(product.id) ? '#c9a84c' : 'none'} color={isLiked(product.id) ? '#c9a84c' : '#888'} />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: Shield, text: '2-Year Warranty' },
                { icon: Truck, text: 'Free Delivery' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 14 }}>
                  <b.icon size={16} color="#c9a84c" />
                  <span style={{ fontSize: 12, color: '#888', letterSpacing: 1 }}>{b.text}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, padding: 20, background: '#0a0a0a', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#888' }}>In stock — {product.stock} units remaining. Cash on Delivery available across Pakistan.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
