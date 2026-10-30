import React, { useRef, useEffect } from 'react';
import { offers } from '../data/services';
import { motion } from 'framer-motion';

const OfferSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 340; // Card width + gap
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      const { current } = scrollRef;
      if (current) {
        if (current.scrollLeft + current.offsetWidth >= current.scrollWidth) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-padding py-5 position-relative">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="section-title mb-0">Exclusive Offers</h2>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-primary rounded-circle p-0 d-flex align-items-center justify-content-center" 
              style={{ width: '45px', height: '45px' }}
              onClick={() => scroll('left')}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button 
              className="btn btn-outline-primary rounded-circle p-0 d-flex align-items-center justify-content-center" 
              style={{ width: '45px', height: '45px' }}
              onClick={() => scroll('right')}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="horizontal-scroll px-2" ref={scrollRef} style={{ scrollSnapType: 'none' }}>
          {offers.map((offer, index) => (
            <motion.div 
              key={offer.id} 
              className="offer-card border-0 shadow-lg position-relative overflow-hidden" 
              style={{ 
                backgroundImage: `url(${offer.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minWidth: '320px',
                height: '220px',
                borderRadius: '30px',
                flex: '0 0 auto'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="position-absolute w-100 h-100 bg-dark bg-opacity-40" style={{ zIndex: 1 }}></div>
              <div className="p-4 d-flex flex-column h-100 justify-content-end position-relative" style={{ zIndex: 2 }}>
                <span className="badge glass-card border-0 mb-auto align-self-start fw-bold text-white px-3 py-2">
                  <i className="bi bi-patch-check-fill me-2"></i> VERIFIED DEAL
                </span>
                <div className="text-white">
                  <h4 className="fw-bold mb-1">{offer.title}</h4>
                  <p className="small mb-3 text-light opacity-90">{offer.desc}</p>
                  <button className="btn btn-light btn-sm rounded-pill px-4 py-2 fw-bold shadow-sm">
                    Claim Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
