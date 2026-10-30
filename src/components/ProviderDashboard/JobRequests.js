import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Check, 
  X,
  User,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const JobRequests = () => {
  const [requests, setRequests] = useState([
    { 
      id: 101, 
      customer: 'Rahul Verma', 
      service: 'Deep House Cleaning', 
      address: 'Flat 402, Green Valley Apartments, Sector 45',
      dateTime: '18 March, 10:00 AM',
      price: 2499,
      distance: '3.2 km'
    },
    { 
      id: 102, 
      customer: 'Priya Sharma', 
      service: 'AC Gas Refilling', 
      address: 'Villa 12, Rosewood Estate, Cyber City',
      dateTime: '18 March, 01:30 PM',
      price: 1599,
      distance: '5.8 km'
    },
    { 
      id: 103, 
      customer: 'Ankit Gupta', 
      service: 'Full Body Massage', 
      address: 'H-Block, 2nd Floor, DLF Phase 3',
      dateTime: '19 March, 11:00 AM',
      price: 1899,
      distance: '2.1 km'
    }
  ]);

  const handleAccept = (id) => {
    // Simulate API call
    setRequests(prev => prev.filter(r => r.id !== id));
    Swal.fire({
      title: 'Job Accepted!',
      text: "Job Accepted! Check 'Active Jobs' to start service.",
      icon: 'success'
    });
  };

  const handleReject = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="job-requests">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Incoming Bookings</h4>
          <p className="text-muted small">You have {requests.length} new service requests nearby</p>
        </div>
        <div className="btn-group">
          <button className="btn btn-outline-primary btn-sm active">Newest</button>
          <button className="btn btn-outline-primary btn-sm">Nearby</button>
        </div>
      </div>

      <div className="row g-4">
        <AnimatePresence>
          {requests.map((request) => (
            <div key={request.id} className="col-12 col-md-6 col-xl-4">
              <motion.div 
                className="job-request-card shadow-sm h-100"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -5 }}
              >
                <div className="request-badge">New Request</div>
                <div className="p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="customer-avatar-small bg-primary-soft text-primary">
                      <User size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">{request.customer}</h6>
                      <p className="extra-small text-muted mb-0">{request.service}</p>
                    </div>
                  </div>

                  <div className="request-details space-y-3">
                    <div className="d-flex gap-2 align-items-start mb-3">
                      <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="small mb-0 fw-medium">{request.address}</p>
                        <span className="extra-small text-muted">{request.distance} away</span>
                      </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center mb-3">
                      <Calendar size={16} className="text-primary" />
                      <span className="small">{request.dateTime}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      <IndianRupee size={16} className="text-primary" />
                      <span className="fw-bold text-primary">₹{request.price}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer-actions d-flex border-top">
                  <button className="reject-action-btn flex-grow-1" onClick={() => handleReject(request.id)}>
                    <X size={18} /> Reject
                  </button>
                  <button className="accept-action-btn flex-grow-1" onClick={() => handleAccept(request.id)}>
                    <Check size={18} /> Accept
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </AnimatePresence>

        {requests.length === 0 && (
          <div className="col-12 text-center py-5">
            <div className="empty-state">
              <Clock size={64} className="text-muted opacity-25 mb-4" />
              <h5>No new requests</h5>
              <p className="text-muted">We'll notify you when new jobs are available in your area.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRequests;
