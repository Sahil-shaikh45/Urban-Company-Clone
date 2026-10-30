import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OfferSection from './components/OfferSection';
import ServiceGrid from './components/ServiceGrid';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import CategoryPage from './components/CategoryPage';
import Register from './components/Register';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ConfirmationPage from './components/ConfirmationPage';
import ProfilePage from './components/ProfilePage';
import ProviderDashboard from './components/ProviderDashboard';
import { mostBooked, sections, flatServices } from './data/services';
import { CartProvider, useCart } from './context/CartContext';
import './App.css';

// --- HELP COMPONENTS ---

const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { icon: "bi-whatsapp", title: "Chat on WhatsApp", color: "#25D366", link: "https://wa.me/1234567890" },
    { icon: "bi-telephone-fill", title: "Call Support", color: "#6366f1", link: "tel:+9118004567890" },
    { icon: "bi-ticket-perforated-fill", title: "Raise a Ticket", color: "#f43f5e", link: "/contact" },
    { icon: "bi-question-circle-fill", title: "View FAQs", color: "#64748b", link: "/about" }
  ];

  return (
    <div className="floating-help">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="help-menu-container"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
          >
            <div className="help-menu-header">
              <h6 className="text-uppercase">How can we help?</h6>
            </div>
            {options.map((opt, i) => (
              <a key={i} href={opt.link} className="help-option-item" onClick={() => setIsOpen(false)}>
                <i className={`bi ${opt.icon}`} style={{ backgroundColor: `${opt.color}15`, color: opt.color }}></i>
                <span className="fw-bold small">{opt.title}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div onClick={() => setIsOpen(!isOpen)} style={{ position: 'relative' }}>
        <span className={`help-text-label text-primary ${isOpen ? 'd-none' : ''}`}>Need Help?</span>
        <div className={`help-pulse shadow-lg ${isOpen ? 'active' : ''}`}>
          <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-chat-dots-fill'}`} style={{ fontSize: isOpen ? '1.5rem' : '1.8rem' }}></i>
        </div>
      </div>
    </div>
  );
};

const NeedHelpSection = () => (
  <div className="container py-5 my-5">
    <motion.div 
      className="help-section-bg shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="row align-items-center">
        <div className="col-lg-7">
          <h2 className="fw-bold display-5 mb-3">Still have <span className="gradient-text">questions?</span></h2>
          <p className="fs-5 text-muted mb-5">Our support team is available 24/7 to help you with bookings, payments, or any service related query.</p>
          <div className="d-flex flex-wrap gap-4">
            <div className="d-flex align-items-center">
              <div className="stats-icon bg-success bg-opacity-10 text-success me-3">
                <i className="bi bi-whatsapp"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-0">WhatsApp</h6>
                <small className="text-muted">Instant response</small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="stats-icon bg-primary bg-opacity-10 text-primary me-3">
                <i className="bi bi-headset"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-0">Help Center</h6>
                <small className="text-muted">Expert assistance</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 text-end d-none d-lg-block">
          <Link to="/contact" className="btn btn-premium px-5 py-3 rounded-pill fs-5">
            Contact Support <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
);

// --- DASHBOARD COMPONENTS ---

const TrustMarkers = () => (
  <div className="bg-soft py-5 mt-5">
    <div className="container">
      <h2 className="section-title text-center mb-5 mx-auto">Why Choose Urban-Easy?</h2>
      <div className="row g-5">
        <div className="col-md-4 trust-item">
          <div className="trust-icon-circle shadow-sm"><i className="bi bi-shield-check"></i></div>
          <h5 className="fw-bold">Safety First</h5>
          <p className="text-muted">Background verified professionals and contact-less services.</p>
        </div>
        <div className="col-md-4 trust-item">
          <div className="trust-icon-circle shadow-sm"><i className="bi bi-star"></i></div>
          <h5 className="fw-bold">Top Quality</h5>
          <p className="text-muted">Highly trained professionals using premium grade materials.</p>
        </div>
        <div className="col-md-4 trust-item">
          <div className="trust-icon-circle shadow-sm"><i className="bi bi-currency-rupee"></i></div>
          <h5 className="fw-bold">Transparent Pricing</h5>
          <p className="text-muted">Upfront pricing with no hidden charges. Pay after service.</p>
        </div>
      </div>
    </div>
  </div>
);

const ReferBanner = () => (
  <div className="container py-5 my-5">
    <div className="refer-banner shadow-lg">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <h1 className="fw-bold mb-3">Refer & Earn ₹500</h1>
          <p className="fs-5 mb-4 opacity-75">Share the love with your friends. Invite them to Urban-Easy and both get cashback!</p>
          <div className="d-flex gap-3">
            <button className="btn btn-light rounded-pill px-4 py-2 fw-bold text-primary shadow">Invite Now</button>
            <button className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold border-2">Learn More</button>
          </div>
        </div>
        <div className="col-lg-4 text-center d-none d-lg-block">
          <i className="bi bi-gift display-1 opacity-50"></i>
        </div>
      </div>
    </div>
  </div>
);

const BecomePartnerBanner = () => {
  const { openRegister } = useCart();
  
  return (
    <div className="container py-5 my-5">
      <motion.div 
        className="become-partner-banner shadow-lg overflow-hidden position-relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="row align-items-center g-0">
          <div className="col-lg-7 p-5 text-white position-relative z-1">
            <h1 className="fw-bold display-4 mb-4">Become an <span className="text-warning">Urban-Easy Partner</span></h1>
            <p className="fs-5 mb-5 opacity-90">Join 50,000+ professionals who have grown their business with Urban-Easy. Get more jobs, earn more, and work on your own terms.</p>
            
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="icon-circle-small bg-white bg-opacity-20"><i className="bi bi-graph-up-arrow"></i></div>
                  <span className="small fw-bold">Grow Business</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="icon-circle-small bg-white bg-opacity-20"><i className="bi bi-calendar-check"></i></div>
                  <span className="small fw-bold">Flexible Hours</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="icon-circle-small bg-white bg-opacity-20"><i className="bi bi-shield-check"></i></div>
                  <span className="small fw-bold">Safe Payments</span>
                </div>
              </div>
            </div>

            <button 
              className="btn btn-warning rounded-pill px-5 py-3 fw-bold fs-5 shadow"
              onClick={() => openRegister('PROVIDER')}
            >
              Register as Partner <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
          <div className="col-lg-5 d-none d-lg-block">
            <div className="partner-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1581578731522-745505146317?auto=format&fit=crop&w=800&q=80" 
                alt="Partner" 
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>
        </div>
        <div className="banner-bg-accent"></div>
      </motion.div>
    </div>
  );
};

const Testimonials = () => (
  <div className="container py-5">
    <h2 className="section-title mb-5">What Our Customers Say</h2>
    <div className="row g-4">
      {[
        { name: "Ananya Sharma", role: "Software Engineer", text: "The sofa cleaning was top notch. The professional was very thorough and polite.", rating: 5, avatar: "https://i.pravatar.cc/150?u=ananya" },
        { name: "Rahul Varma", role: "Business Owner", text: "Got my AC serviced in just 2 hours. Very impressed with the speed and quality!", rating: 4, avatar: "https://i.pravatar.cc/150?u=rahul" },
        { name: "Priya Singh", role: "Home Maker", text: "Urban-Easy is my go-to for salon services. The therapist was amazing.", rating: 5, avatar: "https://i.pravatar.cc/150?u=priya" }
      ].map((t, idx) => (
        <div key={idx} className="col-lg-4 col-md-6">
          <div className="testimonial-card h-100 border-0 shadow-sm">
            <div className="d-flex align-items-center mb-4">
              <img src={t.avatar} className="testimonial-avatar shadow-sm border border-2 border-white" alt={t.name} />
              <div>
                <h6 className="fw-bold mb-0">{t.name}</h6>
                <small className="text-muted">{t.role}</small>
              </div>
            </div>
            <div className="mb-3 text-warning">
              {[...Array(t.rating)].map((_, i) => <i key={i} className="bi bi-star-fill me-1"></i>)}
            </div>
            <p className="text-muted font-italic">"{t.text}"</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- PAGE COMPONENTS ---

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  
  const service = useMemo(() => flatServices.find(s => s.id === parseInt(id)), [id]);
  
  if (!service && cart.length === 0) return (
    <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
      <h3>No service selected</h3>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Back Home</button>
    </div>
  );

  const displayItems = service ? [service, ...cart.filter(c => c.id !== service.id)] : cart;
  const total = displayItems.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    clearCart();
    navigate('/confirmation');
  };

  return (
    <div className="container py-5" style={{ marginTop: '100px' }}>
      <div className="row g-4 justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg p-4 mb-4 animate-fade-in border-0 rounded-4">
            <h4 className="fw-bold mb-4">Review Service Details</h4>
            {displayItems.map((item, idx) => (
              <div key={idx} className="d-flex align-items-center mb-3 p-3 bg-light rounded-4 shadow-sm border-0">
                <img src={item.image} alt="" className="rounded-4 shadow-sm" style={{width: '80px', height: '80px', objectFit: 'cover'}} />
                <div className="ms-3 flex-grow-1">
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  <p className="small text-muted mb-0">High-quality professional service</p>
                  <p className="fw-bold text-primary mb-0">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card shadow-lg p-4 animate-fade-in border-0" style={{animationDelay: '0.1s', borderRadius: '25px'}}>
            <h5 className="fw-bold mb-3">Choose Payment Method</h5>
            <div className="list-group border-0">
              {['UPI (PhonePe, GPay)', 'Credit / Debit Card', 'Net Banking', 'Cash on Delivery'].map((method, idx) => (
                <label key={idx} className="list-group-item d-flex align-items-center cursor-pointer p-3 border-0 bg-light rounded-4 mb-3">
                  <input className="form-check-input me-3" type="radio" name="payment" defaultChecked={idx === 0} />
                  <i className={`bi bi-${idx === 0 ? 'phone' : idx === 1 ? 'credit-card' : idx === 2 ? 'bank' : 'cash'} me-3 text-primary fs-5`}></i>
                  <span className="fw-bold">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-lg p-4 position-sticky rounded-4 border-0" style={{top: '120px'}}>
            <h5 className="fw-bold mb-4">Price Details</h5>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal ({displayItems.length} items)</span>
              <span className="fw-bold">₹{total}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Service Fee</span>
              <span className="fw-bold">₹49</span>
            </div>
            <div className="d-flex justify-content-between mb-2 text-success">
              <span className="fw-bold">Discount</span>
              <span>-₹49</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <h1 className="fw-bold fs-2 text-primary mb-0">₹{total}</h1>
            </div>
            <button className="btn btn-premium w-100 py-3 fw-bold fs-5 shadow-lg" onClick={handlePayment}>
              Confirm Booking
            </button>
            <p className="text-center small text-muted mt-4 mb-0">
              <i className="bi bi-shield-check me-1"></i>
              Verified Service Provider
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { searchQuery } = useCart();

  const filteredMostBooked = useMemo(() => {
    return mostBooked.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredSections = useMemo(() => {
    let result = sections;
    if (searchQuery) {
      result = result.map(section => ({
        ...section,
        items: section.items.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.items.length > 0);
    }
    return result;
  }, [searchQuery]);

  const isSearching = searchQuery !== '';

  return (
    <main>
      <Hero />
      {!isSearching && (
        <>
          <OfferSection />
        </>
      )}
      
      {isSearching && filteredMostBooked.length === 0 && filteredSections.length === 0 && (
        <div className="container py-5 text-center">
          <i className="bi bi-search display-1 text-muted opacity-25"></i>
          <h3 className="mt-4">No services found</h3>
          <p className="text-muted">Try a different keyword</p>
        </div>
      )}

      {filteredMostBooked.length > 0 && (
        <ServiceGrid title={isSearching ? "Found Services" : "Most Booked Services"} items={filteredMostBooked} />
      )}
      
      {filteredSections.map((section, idx) => (
        <div key={idx} className={idx % 2 !== 0 ? 'bg-soft' : ''}>
          <ServiceGrid title={section.title} items={section.items} />
        </div>
      ))}

      {!isSearching && (
        <>
          <ReferBanner />
          <BecomePartnerBanner />
          <TrustMarkers />
          <Testimonials />
          <NeedHelpSection />
        </>
      )}
    </main>
  );
};

function App() {
  const { user } = useCart();
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('ue_splash_shown');
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('ue_splash_shown', 'true');
        }, 600);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <Router>
      {loading && <Loader fadeOut={fadeOut} />}
      <ScrollToTop />
      <div className="App">
        {/* Only hide standard UI components when specifically on the provider dashboard route */}
        <Routes>
          <Route path="/provider" element={null} />
          <Route path="*" element={<><Navbar /><FloatingHelp /></>} />
        </Routes>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/service/:id" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/provider" element={<ProviderDashboard />} />
        </Routes>

        <Routes>
          <Route path="/provider" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
