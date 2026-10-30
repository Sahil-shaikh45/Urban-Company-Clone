import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const suggestedServices = [
    { 
      id: 'suggest-1', 
      title: 'Service Warranty', 
      price: 99, 
      icon: '🛡️', 
      desc: '30 days protection',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: 'suggest-2', 
      title: 'Post-service Clean', 
      price: 199, 
      icon: '🧹', 
      desc: 'Basic cleanup',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&w=100&q=80'
    }
  ];

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/service/' + cart[0].id);
    } else {
      navigate('/service/0');
    }
  };

  const isAdded = (id) => cart.some(item => item.id === id);

  const handleAddSuggested = (service) => {
    if (!isAdded(service.id)) {
      addToCart({
        id: service.id,
        title: service.title,
        price: service.price,
        image: service.image
      });
    }
  };

  return (
    <div className="cart-page">
      <div className="container py-5">
        <motion.div 
          className="cart-card shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="cart-header">
            <h1>Your Shopping Cart</h1>
            <p className="text-muted">You have {cart.length} items in your cart</p>
          </div>

          <div className="cart-body">
            <AnimatePresence mode='popLayout'>
              {cart.length === 0 ? (
                <motion.div 
                  className="empty-cart-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="empty-cart-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                  <p>Looks like you haven't added any services yet.</p>
                  <Link to="/" className="explore-btn">Explore Services</Link>
                </motion.div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item, idx) => (
                    <motion.div 
                      key={`${item.id}-${idx}`}
                      className="cart-item-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      layout
                    >
                      <img src={item.image} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-info">
                        <h3>{item.title}</h3>
                        <p className="service-tag">Professional Service</p>
                      </div>
                      <div className="cart-item-price">
                        ₹{item.price}
                      </div>
                      <button 
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="summary-row">
                  <span>Service Fee</span>
                  <span className="text-success">FREE</span>
                </div>
                <div className="summary-row total">
                  <span>Order Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <div className="cart-actions">
                <Link to="/" className="continue-shopping">
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
                <button className="checkout-btn-advanced" onClick={handleCheckout}>
                  Proceed to Checkout
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Suggested Services */}
        {cart.length > 0 && (
          <div className="suggested-section mt-5">
            <h2 className="mb-4">Commonly booked together</h2>
            <div className="row g-4">
              {suggestedServices.map((service) => (
                <div className="col-md-4" key={service.id}>
                  <div className="suggestion-card p-3 bg-white rounded-4 shadow-sm border">
                    <div className="d-flex align-items-center">
                      <div className="suggestion-icon">{service.icon}</div>
                      <div className="ms-3">
                        <h6 className="mb-0 fw-bold">{service.title}</h6>
                        <small className="text-muted">₹{service.price} • {service.desc}</small>
                      </div>
                      <button 
                        className={`btn btn-sm ms-auto rounded-pill px-3 ${isAdded(service.id) ? 'btn-success disabled' : 'btn-outline-primary'}`}
                        onClick={() => handleAddSuggested(service)}
                        disabled={isAdded(service.id)}
                      >
                        {isAdded(service.id) ? 'Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
