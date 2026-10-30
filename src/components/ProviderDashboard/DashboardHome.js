import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  IndianRupee,
  Briefcase,
  Bell,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './ProviderDashboard.css';

const DashboardHome = () => {
  const { user } = useCart();
  const stats = [
    { title: 'Total Earnings', value: '₹45,280', icon: IndianRupee, color: '#6366f1', trend: '+12%' },
    { title: "Today's Earnings", value: '₹2,450', icon: TrendingUp, color: '#10b981', trend: '+5%' },
    { title: 'Total Jobs', value: '156', icon: Briefcase, color: '#f59e0b', trend: '+8%' },
    { title: 'Pending Jobs', value: '4', icon: Clock, color: '#ef4444', trend: '-2%' },
  ];

  const todaySchedule = [
    { id: 1, time: '10:00 AM', customer: 'Amit Patel', service: 'AC Repair', status: 'Upcoming' },
    { id: 2, time: '02:30 PM', customer: 'Sonia Gupta', service: 'Sofa Cleaning', status: 'In Progress' },
    { id: 3, time: '05:00 PM', customer: 'Vikram Singh', service: 'House Painting', status: 'Pending' },
  ];

  return (
    <div className="dashboard-home">
      <div className="welcome-banner mb-4">
        <div>
          <h1>Welcome back, {user?.name || 'Partner'}!</h1>
          <p>You have 3 jobs scheduled for today. You're doing great!</p>
        </div>
        <div className="banner-stats d-none d-md-flex">
          <div className="b-stat">
            <span className="label">Rating</span>
            <span className="value">4.8 ★</span>
          </div>
          <div className="b-stat">
            <span className="label">Level</span>
            <span className="value">Gold</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-12 col-md-6 col-xl-3">
            <motion.div 
              className="stat-card shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-title">{stat.title}</p>
                <div className="d-flex align-items-baseline gap-2">
                  <h3 className="stat-value mb-0">{stat.value}</h3>
                  <span className={`stat-trend ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Today's Schedule */}
        <div className="col-12 col-lg-8">
          <div className="content-card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-bold"><Calendar size={18} className="me-2 text-primary" /> Today's Schedule</h5>
              <button className="btn btn-link btn-sm text-decoration-none p-0">View All</button>
            </div>
            <div className="schedule-list">
              {todaySchedule.map((item) => (
                <div key={item.id} className="schedule-item d-flex align-items-center justify-content-between p-3 mb-2 rounded-3 bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <div className="time-badge">{item.time}</div>
                    <div>
                      <h6 className="mb-1 fw-bold">{item.customer}</h6>
                      <p className="small text-muted mb-0">{item.service}</p>
                    </div>
                  </div>
                  <span className={`status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="col-12 col-lg-4">
          <div className="content-card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-bold"><Bell size={18} className="me-2 text-primary" /> Recent Updates</h5>
            </div>
            <div className="notification-mini-list">
              <div className="noti-item d-flex gap-3 mb-3">
                <div className="noti-icon bg-blue-soft text-blue"><CheckCircle size={16} /></div>
                <div>
                  <p className="mb-1 small"><strong>Payment Received</strong></p>
                  <p className="mb-0 extra-small text-muted">₹1,250 for Salon Service</p>
                  <span className="extra-small text-muted opacity-50">2 mins ago</span>
                </div>
              </div>
              <div className="noti-item d-flex gap-3 mb-3">
                <div className="noti-icon bg-yellow-soft text-yellow"><AlertCircle size={16} /></div>
                <div>
                  <p className="mb-1 small"><strong>New Request</strong></p>
                  <p className="mb-0 extra-small text-muted">AC Service in Sector 62</p>
                  <span className="extra-small text-muted opacity-50">15 mins ago</span>
                </div>
              </div>
              <div className="noti-item d-flex gap-3">
                <div className="noti-icon bg-green-soft text-green"><Star size={16} /></div>
                <div>
                  <p className="mb-1 small"><strong>5-Star Review</strong></p>
                  <p className="mb-0 extra-small text-muted">"Excellent work!" - Priyanshi</p>
                  <span className="extra-small text-muted opacity-50">1 hour ago</span>
                </div>
              </div>
            </div>
            <button className="btn btn-soft-primary w-100 mt-3 btn-sm">See All Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
