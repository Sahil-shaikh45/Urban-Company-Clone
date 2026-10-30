import React from 'react';
import { 
  Power, 
  Clock, 
  Calendar,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const Availability = ({ isOnline, setIsOnline }) => {
  return (
    <div className="availability-page">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="content-card shadow-sm h-100">
            <h5 className="fw-bold mb-4">Live Status</h5>
            <div className={`status-hero-card ${isOnline ? 'online' : 'offline'}`}>
              <div className="status-icon-large">
                <Power size={48} />
              </div>
              <h2 className="fw-bold mb-2">{isOnline ? "You're Online" : "You're Offline"}</h2>
              <p className="opacity-75 small mb-4">
                {isOnline 
                  ? "Customers can see you and send new job requests." 
                  : "Go online to start receiving new job requests in your area."}
              </p>
              <button 
                className={`btn btn-lg rounded-pill px-5 fw-bold ${isOnline ? 'btn-light text-success' : 'btn-success'}`}
                onClick={() => setIsOnline(!isOnline)}
              >
                {isOnline ? "Go Offline" : "Go Online Now"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="content-card shadow-sm mb-4">
            <h5 className="fw-bold mb-4"><Clock size={18} className="me-2" /> Working Hours</h5>
            <div className="space-y-3">
              {['Monday - Friday', 'Saturday', 'Sunday'].map((day, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                  <span className="fw-medium small">{day}</span>
                  <span className="text-primary fw-bold small">{i === 2 ? 'Off' : '09:00 AM - 07:00 PM'}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-soft-primary w-100 mt-4">Edit Schedule</button>
          </div>

          <div className="content-card shadow-sm">
            <h5 className="fw-bold mb-3"><AlertCircle size={18} className="me-2" /> Important Note</h5>
            <p className="small text-muted mb-0">
              Maintaining high availability during peak hours (10 AM - 4 PM) increases your chances of getting high-value bookings by 40%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;
