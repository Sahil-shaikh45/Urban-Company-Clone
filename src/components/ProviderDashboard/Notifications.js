import React from 'react';
import { 
  Bell, 
  Briefcase, 
  IndianRupee, 
  Star, 
  AlertCircle
} from 'lucide-react';

const Notifications = () => {
  const notifications = [
    { id: 1, type: 'JOB', title: 'New Job Request', message: 'AC Service in Sector 62, Noida. Earn up to ₹1,500.', time: '2 mins ago', icon: Briefcase, color: '#6366f1' },
    { id: 2, type: 'PAYMENT', title: 'Payment Received', message: '₹1,250 for Sofa Cleaning has been added to your wallet.', time: '1 hour ago', icon: IndianRupee, color: '#10b981' },
    { id: 3, type: 'REVIEW', title: 'New 5-Star Review', message: 'Customer Sonia Gupta left a review: "Excellent work!"', time: '3 hours ago', icon: Star, color: '#f59e0b' },
    { id: 4, type: 'SYSTEM', title: 'Account Verified', message: 'Your background verification is complete. You are now a Premium Partner.', time: '1 day ago', icon: AlertCircle, color: '#3b82f6' },
  ];

  return (
    <div className="notifications-page">
      <div className="content-card shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">All Notifications</h5>
          <button className="btn btn-link btn-sm text-decoration-none p-0 extra-small">Mark all as read</button>
        </div>
        
        <div className="notification-list">
          {notifications.map((n) => (
            <div key={n.id} className="notification-item-full d-flex gap-3 p-3 border-bottom">
              <div className="noti-icon-large" style={{ backgroundColor: `${n.color}15`, color: n.color }}>
                <n.icon size={20} />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h6 className="fw-bold mb-0 small">{n.title}</h6>
                  <span className="extra-small text-muted">{n.time}</span>
                </div>
                <p className="extra-small text-muted mb-0">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-soft-primary w-100 mt-4 py-2 small">Load More Notifications</button>
      </div>
    </div>
  );
};

export default Notifications;
