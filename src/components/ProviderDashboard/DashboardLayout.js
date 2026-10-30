import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckCircle, 
  IndianRupee, 
  Star, 
  User, 
  ToggleLeft, 
  Bell, 
  LogOut,
  Menu,
  X,
  ArrowLeftRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import DashboardHome from './DashboardHome';
import JobRequests from './JobRequests';
import ActiveJobs from './ActiveJobs';
import EarningsPage from './EarningsPage';
import ReviewsPage from './ReviewsPage';
import ProfilePage from './ProfilePage';
import Availability from './Availability';
import Notifications from './Notifications';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const { user, logout } = useCart();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Job Requests', icon: Briefcase },
    { id: 'active', label: 'Active Jobs', icon: CheckCircle },
    { id: 'earnings', label: 'Earnings', icon: IndianRupee },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'availability', label: 'Availability', icon: ToggleLeft },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardHome />;
      case 'requests': return <JobRequests />;
      case 'active': return <ActiveJobs />;
      case 'earnings': return <EarningsPage />;
      case 'reviews': return <ReviewsPage />;
      case 'profile': return <ProfilePage />;
      case 'availability': return <Availability isOnline={isOnline} setIsOnline={setIsOnline} />;
      case 'notifications': return <Notifications />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && window.innerWidth < 992 && (
          <motion.div 
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Header */}
      <div className="mobile-header d-lg-none">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <span className="brand-name">Urban-Easy</span>
        <div className="header-actions-mobile">
          <button className="icon-btn-small">
            <Bell size={20} />
            <span className="badge">3</span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <motion.aside 
        className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 260 : (window.innerWidth < 992 ? 260 : 0),
          x: isSidebarOpen ? 0 : (window.innerWidth < 992 ? -260 : 0)
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="sidebar-header">
          <h2 className="brand-name">Urban-Easy</h2>
          <button className="d-lg-none" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 992) setIsSidebarOpen(false);
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item mb-2" onClick={() => navigate('/')} style={{ background: '#f1f5f9', color: '#1e293b' }}>
            <ArrowLeftRight size={20} />
            <span>User View</span>
          </button>
          <button className="logout-btn" onClick={() => { logout(); navigate('/'); }}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header d-none d-lg-flex">
          <div className="header-search">
            <h2>{menuItems.find(m => m.id === activeTab)?.label}</h2>
          </div>
          <div className="header-actions">
            <div className="status-toggle" onClick={() => setIsOnline(!isOnline)}>
              <span className={isOnline ? 'text-success' : 'text-danger'}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <div className={`toggle-switch ${isOnline ? 'on' : 'off'}`}>
                <div className="switch-knob"></div>
              </div>
            </div>
            <button className="icon-btn">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            <div className="user-profile">
              <div className="profile-avatar-small bg-primary text-white d-flex align-items-center justify-content-center fw-bold rounded-circle" style={{ width: '40px', height: '40px' }}>
                {user?.name ? user.name[0].toUpperCase() : 'P'}
              </div>
              <div className="user-info">
                <p className="user-name">{user?.name || 'Partner'}</p>
                <p className="user-role">{user?.role === 'PROVIDER' ? 'Premium Partner' : 'User'}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="page-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav d-lg-none">
        {menuItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            className={`bottom-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
        <button
          className={`bottom-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={20} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
