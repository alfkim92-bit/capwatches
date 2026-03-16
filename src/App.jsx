import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import About from './pages/About';
import Orders from './pages/Orders';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div style={{ minHeight: '100vh', background: '#050505', color: '#fff' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#0a0a0a', color: '#c9a84c', border: '1px solid #c9a84c', borderRadius: '0' },
              duration: 3000,
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
