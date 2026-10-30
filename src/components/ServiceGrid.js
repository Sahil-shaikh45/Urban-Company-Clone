import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ServiceGrid = ({ title, items }) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cart } = useCart();
  if (!items || items.length === 0) return null;

  return (
    <div className="section-padding overflow-hidden">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="section-title mb-0">{title}</h2>
          <button className="btn btn-link text-primary fw-bold text-decoration-none">
            Explore more <i className="bi bi-arrow-right ms-1"></i>
          </button>
        </div>
        <div className="row g-4">
          {items.map((item, index) => {
            const isInCart = cart.some(cartItem => cartItem.id === item.id);
            return (
              <motion.div 
                key={item.id} 
                className="col-12 col-sm-6 col-lg-3"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                  <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                    <img src={item.image} className="card-img-top h-100 w-100 object-fit-cover transition-img" alt={item.title} />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-10"></div>
                    <button 
                      className="btn btn-light btn-sm position-absolute top-0 end-0 m-3 rounded-circle shadow-sm glass-card border-0"
                      onClick={() => navigate(`/service/${item.id}`)}
                      style={{ width: '40px', height: '40px' }}
                    >
                      <i className="bi bi-arrow-up-right"></i>
                    </button>
                  </div>
                  <div className="card-body p-4">
                    <h6 className="card-title fw-bold mb-2 fs-5" style={{ minHeight: '3rem' }}>{item.title}</h6>
                    <div className="d-flex align-items-center mb-3">
                      <div className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 me-2">
                        <i className="bi bi-star-fill me-1 small"></i>
                        {item.rating}
                      </div>
                      <span className="small text-muted">{item.reviews ? `${item.reviews} bookings` : 'New'}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                      <div>
                        <span className="small text-muted d-block">Price</span>
                        <span className="fw-bold fs-4 text-primary">₹{item.price}</span>
                      </div>
                      <button 
                        className={`btn ${isInCart ? 'btn-danger' : 'btn-primary'} rounded-pill px-4 fw-bold shadow-sm`}
                        onClick={() => isInCart ? removeFromCart(item.id) : addToCart(item)}
                      >
                        {isInCart ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;
