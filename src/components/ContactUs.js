import React from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Message Sent!',
      text: "Message sent! We'll get back to you shortly.",
      icon: 'success'
    });
  };

  return (
    <div className="pt-5 mt-5 container section-padding">
      <div className="row g-5">
        {/* Contact Info */}
        <div className="col-lg-5">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="section-title">Get in Touch</h2>
            <p className="fs-5 text-muted mb-5">
              Have a question or need help? We're here for you. Reach out and our team will get back to you within 24 hours.
            </p>
            
            <div className="d-flex mb-4">
              <div className="stats-icon bg-primary bg-opacity-10 text-primary me-4">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Our Location</h6>
                <p className="small text-muted mb-0">123 Urban-Easy Square, DLF Phase 2, New Delhi, India</p>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="stats-icon bg-danger bg-opacity-10 text-danger me-4">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Call Us</h6>
                <p className="small text-muted mb-0">+91 1800-456-7890</p>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="stats-icon bg-warning bg-opacity-10 text-warning me-4">
                <i className="bi bi-envelope-at-fill"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Email Support</h6>
                <p className="small text-muted mb-0">support@urbaneasy.com</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-7">
          <motion.div 
            className="card shadow-lg p-5 border-0 rounded-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h4 className="fw-bold mb-4">Send a Message</h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control rounded-4 bg-light border-0" id="name" placeholder="John Doe" required />
                    <label htmlFor="name">Full Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-4 bg-light border-0" id="email" placeholder="name@example.com" required />
                    <label htmlFor="email">Email Address</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control rounded-4 bg-light border-0" id="subject" placeholder="Subject" />
                    <label htmlFor="subject">Subject</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-4">
                    <textarea className="form-control rounded-4 bg-light border-0" id="message" placeholder="Message" style={{ height: '150px' }} required></textarea>
                    <label htmlFor="message">How can we help?</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-premium w-100 py-3 rounded-pill fw-bold">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
