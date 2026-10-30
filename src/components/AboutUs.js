import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="pt-5 mt-5 overflow-hidden">
      {/* Cinematic Hero */}
      <section className="about-hero-bg py-5 position-relative">
        {/* Floating Background Icons */}
        <div className="position-absolute top-20 start-10 opacity-10 floating-icon d-none d-lg-block">
          <i className="bi bi-house-heart-fill display-1"></i>
        </div>
        <div className="position-absolute bottom-20 end-10 opacity-10 floating-icon d-none d-lg-block" style={{ animationDelay: '1s' }}>
          <i className="bi bi-stars display-1"></i>
        </div>

        <div className="container py-5 text-center position-relative" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3 fw-bold">
              ESTABLISHED 2026
            </span>
            <h1 className="display-2 fw-bold mb-4">
              Making Homes <span className="gradient-text">Happy</span> <br />
              One Service at a Time.
            </h1>
            <p className="lead text-muted mx-auto fs-5 mb-5" style={{ maxWidth: '800px' }}>
              We started with a simple idea: Home services should be as easy as ordering a pizza. 
              Today, Urban-Easy is the world's fastest growing marketplace for home professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story / Mission Split */}
      <section className="section-padding container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="position-relative">
              <motion.img 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" 
                className="img-fluid rounded-5 shadow-2xl position-relative" 
                alt="Kitchen service"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ zIndex: 2 }}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary rounded-5 translate-middle-x translate-middle-y opacity-5 d-none d-lg-block" style={{ zIndex: 1 }}></div>
            </div>
          </div>
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-secondary fw-bold mb-2">OUR JOURNEY</h4>
              <h2 className="display-5 fw-bold mb-4">Driven by Quality, Powered by Technology</h2>
              <p className="fs-5 text-muted mb-4">
                Urban-Easy bridges the gap between verified service professionals and home owners. 
                We don't just provide services; we provide trust, safety, and a quality standard 
                that remains unmatched in the industry.
              </p>
              <div className="row g-4 mt-2">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <div className="stats-icon bg-primary bg-opacity-10 text-primary me-3 flex-shrink-0">
                      <i className="bi bi-shield-fill-check"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold">Safety Verified</h6>
                      <p className="small text-muted mb-0">Every pro undergoes 3-tier vetting.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <div className="stats-icon bg-secondary bg-opacity-10 text-secondary me-3 flex-shrink-0">
                      <i className="bi bi-clock-fill"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold">Fast Response</h6>
                      <p className="small text-muted mb-0">Book in 60s, get service in 2h.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-soft py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="section-title mx-auto">Our Core Values</h2>
            <p className="text-muted mt-2">The pillars that make us Urban-Easy</p>
          </div>
          <div className="row g-4">
            {[
              { title: "Obsess over quality", icon: "bi-gem", text: "We don't settle for 'good enough'. We aim for perfection in every single service." },
              { title: "Transparency", icon: "bi-eye-fill", text: "No hidden costs. No extra fees. What you see is exactly what you pay." },
              { title: "Empower Pros", icon: "bi-person-up", text: "We enable local service professionals to grow their business and income." },
              { title: "Innovation", icon: "bi-cpu-fill", text: "Using AI and real-time tech to make service delivery faster than ever." }
            ].map((v, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <motion.div 
                  className="value-card shadow-sm text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="stats-icon bg-primary text-white mx-auto mb-4" style={{ width: '60px', height: '60px' }}>
                    <i className={`bi ${v.icon} fs-4`}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{v.title}</h5>
                  <p className="small text-muted mb-0">{v.text}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Stats Bar */}
      <section className="container py-5 my-5">
        <motion.div 
          className="glass-card shadow-2xl p-5 border-0 rounded-5 position-relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-5" style={{ zIndex: 0 }}></div>
          <div className="row g-4 text-center position-relative" style={{ zIndex: 1 }}>
            <div className="col-md-3 col-6 border-end border-light d-flex flex-column align-items-center">
              <h1 className="fw-bold gradient-text mb-1 display-5">50k+</h1>
              <p className="small text-muted fw-bold text-uppercase letter-spacing-2">Service Pros</p>
            </div>
            <div className="col-md-3 col-6 border-md-end border-light d-flex flex-column align-items-center">
              <h1 className="fw-bold gradient-text mb-1 display-5">1M+</h1>
              <p className="small text-muted fw-bold text-uppercase letter-spacing-2">Happy Users</p>
            </div>
            <div className="col-md-3 col-6 border-end border-light d-flex flex-column align-items-center">
              <h1 className="fw-bold gradient-text mb-1 display-5">20+</h1>
              <p className="small text-muted fw-bold text-uppercase letter-spacing-2">Active Cities</p>
            </div>
            <div className="col-md-3 col-6 d-flex flex-column align-items-center">
              <h1 className="fw-bold gradient-text mb-1 display-5">4.9</h1>
              <p className="small text-muted fw-bold text-uppercase letter-spacing-2">Avg. Rating</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="container pb-5 mb-5">
        <div className="bg-dark text-white rounded-5 p-5 text-center shadow-lg position-relative overflow-hidden">
          <div className="position-absolute top-0 end-0 p-5 opacity-10">
            <i className="bi bi-arrow-up-right-circle display-1"></i>
          </div>
          <div className="position-relative" style={{ zIndex: 1 }}>
            <h2 className="display-5 fw-bold mb-4">Ready to simplify your home life?</h2>
            <p className="lead mb-5 opacity-75">Join over 1 million people who trust Urban-Easy for their home services.</p>
            <button className="btn btn-premium btn-lg rounded-pill px-5 py-3 fs-5" onClick={() => window.location.href='/'}>
              Get Started Now <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
