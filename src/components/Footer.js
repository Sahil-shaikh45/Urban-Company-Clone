import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 className="fw-bold mb-4 text-primary">Urban-Easy</h4>
            <p className="small text-secondary">
              High-quality home services at your doorstep. We make home maintenance, cleaning, and personal care easy and professional.
            </p>
            <div className="d-flex gap-3 mt-4">
              <i className="bi bi-facebook fs-4 cursor-pointer"></i>
              <i className="bi bi-instagram fs-4 cursor-pointer"></i>
              <i className="bi bi-twitter-x fs-4 cursor-pointer"></i>
              <i className="bi bi-linkedin fs-4 cursor-pointer"></i>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-4">Company</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><span className="cursor-pointer hover-text-white">About Us</span></li>
              <li className="mb-2"><span className="cursor-pointer hover-text-white">Terms & Conditions</span></li>
              <li className="mb-2"><span className="cursor-pointer hover-text-white">Privacy Policy</span></li>
              <li className="mb-2"><span className="cursor-pointer hover-text-white">UC Impact</span></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-4">For Customers</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><span className="cursor-pointer hover-text-white">UC Reviews</span></li>
              <li className="mb-2"><span className="cursor-pointer hover-text-white">Categories Near You</span></li>
              <li className="mb-2"><span className="cursor-pointer hover-text-white">Contact Us</span></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-4">For Professionals</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><span className="cursor-pointer hover-text-white">Register as a Professional</span></li>
              <li className="mb-2"><span className="cursor-pointer hover-text-white">Business Inquiries</span></li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-secondary" />
        <div className="text-center small text-secondary">
          © 2026 Urban-Easy Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
