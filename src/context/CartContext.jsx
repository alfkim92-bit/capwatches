import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return setCart([]);
    try {
      const res = await api.get('/cart');
      setCart(res.data);
    } catch { setCart([]); }
  };

  const fetchWishlist = async () => {
    if (!user) return setWishlist([]);
    try {
      const res = await api.get('/wishlist');
      setWishlist(res.data.map(i => i.product_id));
    } catch { setWishlist([]); }
  };

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, [user]);

  const addToCart = async (product_id, color, quantity = 1) => {
    await api.post('/cart', { product_id, color, quantity });
    fetchCart();
  };

  const updateQty = async (id, quantity) => {
    await api.put(`/cart/${id}`, { quantity });
    fetchCart();
  };

  const removeFromCart = async (id) => {
    await api.delete(`/cart/${id}`);
    fetchCart();
  };

  const clearCart = async () => {
    await api.delete('/cart');
    setCart([]);
  };

  const toggleWishlist = async (product_id) => {
    const res = await api.post('/wishlist/toggle', { product_id });
    if (res.data.liked) {
      setWishlist(prev => [...prev, product_id]);
    } else {
      setWishlist(prev => prev.filter(id => id !== product_id));
    }
    return res.data.liked;
  };

  const isLiked = (product_id) => wishlist.includes(product_id);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, updateQty, removeFromCart, clearCart, toggleWishlist, isLiked, cartTotal, cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
