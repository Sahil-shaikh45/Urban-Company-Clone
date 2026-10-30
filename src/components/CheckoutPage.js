import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { flatServices } from '../data/services';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart, user } = useCart();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Processing
  
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    houseNo: '',
    area: '',
    landmark: '',
    pincode: '',
    city: 'New Delhi'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [bookingDetails, setBookingDetails] = useState(null);

  const service = useMemo(() => flatServices.find(s => s.id === parseInt(id)), [id]);
  const displayItems = service ? [service, ...cart.filter(c => c.id !== service.id)] : cart;
  const total = displayItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePayment = async () => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: "Please login to confirm booking",
        icon: 'info'
      });
      navigate('/register');
      return;
    }

    setStep(3);

    try {
      // Create a booking for the first service in displayItems (simplification)
      const response = await fetch('http://localhost:8080/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          serviceId: displayItems[0].id,
          price: total,
          distance: (Math.random() * 5 + 1).toFixed(2) // Random distance 1-6km
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setBookingDetails({
          id: `UE-${result.id}`,
          serviceName: displayItems.map(i => i.title).join(', '),
          amount: total
        });
        
        clearCart();
        setStep(4);
      } else {
        const error = await response.text();
        Swal.fire({
          title: 'Booking Failed',
          text: "Booking failed: " + error,
          icon: 'error'
        });
        setStep(2);
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        title: 'Error',
        text: "Error connecting to server",
        icon: 'error'
      });
      setStep(2);
    }
  };

  const upiLink = `upi://pay?pa=thesahil4545@okhdfcbank&pn=sahil%20shaikh&aid=uGICAgICDm8KxKw&am=${total}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

  if (displayItems.length === 0 && step !== 4) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="empty-checkout-icon">🛒</div>
        <h3>Your checkout is empty</h3>
        <p>Please add some services to proceed.</p>
        <button className="btn btn-primary rounded-pill px-4 mt-3" onClick={() => navigate('/')}>Explore Services</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container py-5">
        <div className="row g-4">
          {/* Main Checkout Flow */}
          <div className="col-lg-8">
            {/* Steps Indicator */}
            <div className="checkout-steps mb-4">
              <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="step-number">{step > 1 ? '✓' : '1'}</div>
                <div className="step-label">Address</div>
              </div>
              <div className="step-line"></div>
              <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <div className="step-number">{step > 2 ? '✓' : '2'}</div>
                <div className="step-label">Payment</div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="address-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="checkout-card p-4"
                >
                  <h3 className="fw-bold mb-4">Service Address</h3>
                  <form onSubmit={handleAddressSubmit} className="address-form">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name</label>
                        <input 
                          type="text" 
                          className="form-control-advanced" 
                          required 
                          value={address.fullName}
                          onChange={(e) => setAddress({...address, fullName: e.target.value})}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-control-advanced" 
                          required 
                          value={address.phone}
                          onChange={(e) => setAddress({...address, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                          placeholder="10-digit number"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">House No. / Flat / Building</label>
                        <input 
                          type="text" 
                          className="form-control-advanced" 
                          required 
                          value={address.houseNo}
                          onChange={(e) => setAddress({...address, houseNo: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Area / Colony / Street</label>
                        <input 
                          type="text" 
                          className="form-control-advanced" 
                          required 
                          value={address.area}
                          onChange={(e) => setAddress({...address, area: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Pincode</label>
                        <input 
                          type="text" 
                          className="form-control-advanced" 
                          required 
                          value={address.pincode}
                          onChange={(e) => setAddress({...address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">City</label>
                        <select 
                          className="form-select-advanced" 
                          value={address.city}
                          onChange={(e) => setAddress({...address, city: e.target.value})}
                        >
                          <option>New Delhi</option>
                          <option>Mumbai</option>
                          <option>Pune</option>
                          <option>Nagpur</option>
                          <option>Nashik</option>
                          <option>Aurangabad</option>
                          <option>Thane</option>
                          <option>Bangalore</option>
                          <option>Hyderabad</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Landmark (Optional)</label>
                        <input 
                          type="text" 
                          className="form-control-advanced" 
                          value={address.landmark}
                          onChange={(e) => setAddress({...address, landmark: e.target.value})}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-checkout-next mt-4">
                      Save & Continue to Payment
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="payment-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="checkout-card p-4"
                >
                  <div className="d-flex align-items-center mb-4">
                    <button className="btn-back-step me-3" onClick={() => setStep(1)}>
                      <i className="bi bi-arrow-left"></i>
                    </button>
                    <h3 className="fw-bold mb-0">Select Payment Method</h3>
                  </div>

                  <div className="payment-options">
                    <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                      <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} />
                      <div className="option-content">
                        <div className="option-icon">📱</div>
                        <div className="option-text">
                          <span className="title">UPI (GPay / PhonePe / Paytm)</span>
                          <span className="desc">Instant payment using your UPI ID</span>
                        </div>
                        <div className="option-check"></div>
                      </div>
                    </label>
                    <AnimatePresence>
                      {paymentMethod === 'upi' && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="payment-subform upi-qr-container"
                        >
                          <div className="qr-box p-4 bg-white border rounded-4 text-center mx-auto shadow-sm" style={{ maxWidth: '300px' }}>
                            <h6 className="fw-bold mb-3">{displayItems[0].title}</h6>
                            <p className="text-primary fw-bold mb-3">Amount: ₹{total}</p>
                            <div className="qr-image-wrapper p-2 bg-light rounded-3 mb-3">
                              <img 
                                src={qrCodeUrl} 
                                alt="UPI QR Code" 
                                className="img-fluid"
                              />
                            </div>
                            <p className="small text-muted mb-0">Scan this QR code using any UPI app to complete the payment.</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                      <div className="option-content">
                        <div className="option-icon">💳</div>
                        <div className="option-text">
                          <span className="title">Credit / Debit Card</span>
                          <span className="desc">All major Indian cards supported</span>
                        </div>
                        <div className="option-check"></div>
                      </div>
                    </label>
                    <AnimatePresence>
                      {paymentMethod === 'card' && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="payment-subform card-details-container"
                        >
                          <div className="row g-3 p-3 bg-light rounded-4 border mx-0">
                            <div className="col-12">
                              <input 
                                type="text" 
                                className="form-control-advanced" 
                                placeholder="Card Number" 
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                              />
                            </div>
                            <div className="col-6">
                              <input 
                                type="text" 
                                className="form-control-advanced" 
                                placeholder="MM/YY" 
                                value={cardDetails.expiry}
                                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value.slice(0, 5)})}
                              />
                            </div>
                            <div className="col-6">
                              <input 
                                type="password" 
                                className="form-control-advanced" 
                                placeholder="CVV" 
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} />
                      <div className="option-content">
                        <div className="option-icon">💵</div>
                        <div className="option-text">
                          <span className="title">Cash on Delivery</span>
                          <span className="desc">Pay after your service is completed</span>
                        </div>
                        <div className="option-check"></div>
                      </div>
                    </label>
                  </div>

                  <button className="btn-checkout-final mt-4" onClick={handlePayment}>
                    Pay ₹{total} & Confirm Booking
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="processing-step"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="checkout-card p-5 text-center"
                >
                  <div className="payment-loader mb-4">
                    <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }} role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <h3 className="fw-bold mb-2">Processing Payment</h3>
                  <p className="text-muted">Please do not refresh or close this page...</p>
                  
                  <div className="demo-payment-ui mt-4 p-3 bg-light rounded-4 border">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="small text-muted">Merchant</span>
                      <span className="small fw-bold">Urban-Easy Services</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="small text-muted">Amount</span>
                      <span className="small fw-bold">₹{total}</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <motion.div 
                        className="progress-bar progress-bar-striped progress-bar-animated" 
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3 }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="success-step"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="checkout-card p-5 text-center"
                >
                  <div className="success-icon-wrapper mb-4">
                    <div className="success-icon-glow"></div>
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
                  </div>
                  <h2 className="fw-bold mb-2">Payment Successful!</h2>
                  <p className="text-muted mb-4">Your payment was successful and booking is confirmed.</p>
                  
                  <div className="booking-info-box p-4 bg-light rounded-4 border text-start mb-4">
                    <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                      <span className="text-muted">Booking ID</span>
                      <span className="fw-bold">{bookingDetails?.id}</span>
                    </div>
                    <div className="mb-2 pb-2 border-bottom">
                      <span className="text-muted d-block mb-1">Service Name</span>
                      <span className="fw-bold">{bookingDetails?.serviceName}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Paid Amount</span>
                      <span className="fw-bold text-success">₹{bookingDetails?.amount}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-checkout-final"
                    onClick={() => navigate('/confirmation')}
                  >
                    Track Your Service
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-lg-4">
            <div className="order-summary-card p-4">
              <h5 className="fw-bold mb-4">Booking Summary</h5>
              <div className="summary-items">
                {displayItems.map((item, idx) => (
                  <div key={idx} className="summary-item d-flex align-items-center mb-3">
                    <img src={item.image} alt="" className="rounded-3" />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="small fw-bold mb-0">{item.title}</h6>
                      <span className="small text-primary fw-bold">₹{item.price}</span>
                    </div>
                    <button 
                      className="btn btn-link text-danger p-0 ms-2"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      <i className="bi bi-trash3 fs-6"></i>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="summary-details mt-4 pt-4 border-top">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Item Total</span>
                  <span className="fw-bold">₹{total}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Service Fee</span>
                  <span className="text-success fw-bold">FREE</span>
                </div>
                <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                  <span className="fw-bold fs-5">To Pay</span>
                  <span className="fw-bold fs-5 text-primary">₹{total}</span>
                </div>
              </div>

              <div className="security-badge mt-4">
                <i className="bi bi-shield-check text-success me-2"></i>
                <span className="small text-muted">Secure 256-bit SSL encrypted payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
