import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Camera, 
  Briefcase,
  Wrench
} from 'lucide-react';
import Swal from 'sweetalert2';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@urban-easy.com',
    location: 'Sector 62, Noida, UP',
    experience: '5+ Years',
    category: 'Home Cleaning & Maintenance',
    skills: ['Sofa Cleaning', 'AC Repair', 'Electrical', 'Plumbing'],
    rating: 4.8,
    jobsCompleted: 156,
    memberSince: 'Oct 2024'
  });

  const handleImageChange = (e) => {
    Swal.fire({
      title: 'Profile Photo',
      text: "Profile photo update feature (Simulated)",
      icon: 'info'
    });
  };

  return (
    <div className="profile-page">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="content-card shadow-sm text-center">
            <div className="position-relative d-inline-block mb-4">
              <img src="https://i.pravatar.cc/150?u=partner1" alt="Profile" className="profile-img shadow-lg" />
              <label className="camera-badge shadow-sm">
                <Camera size={18} />
                <input type="file" className="d-none" onChange={handleImageChange} />
              </label>
            </div>
            <h4 className="fw-bold mb-1">{profile.name}</h4>
            <p className="text-muted small mb-3">{profile.category}</p>
            <div className="d-flex justify-content-center gap-2 mb-4">
              <span className="badge bg-warning-soft text-warning fw-bold"><Award size={14} className="me-1" /> Gold Partner</span>
              <span className="badge bg-success-soft text-success fw-bold">Verified</span>
            </div>
            <hr className="my-4" />
            <div className="row text-center g-2">
              <div className="col-6">
                <h5 className="fw-bold mb-0">{profile.rating} ★</h5>
                <p className="extra-small text-muted mb-0">Rating</p>
              </div>
              <div className="col-6">
                <h5 className="fw-bold mb-0">{profile.jobsCompleted}</h5>
                <p className="extra-small text-muted mb-0">Jobs Done</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="content-card shadow-sm mb-4">
            <h5 className="fw-bold mb-4">Personal Information</h5>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="info-group">
                  <label className="extra-small text-muted text-uppercase fw-bold mb-1">Full Name</label>
                  <div className="d-flex align-items-center gap-2">
                    <User size={18} className="text-primary" />
                    <span className="fw-medium">{profile.name}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-group">
                  <label className="extra-small text-muted text-uppercase fw-bold mb-1">Phone Number</label>
                  <div className="d-flex align-items-center gap-2">
                    <Phone size={18} className="text-primary" />
                    <span className="fw-medium">{profile.phone}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-group">
                  <label className="extra-small text-muted text-uppercase fw-bold mb-1">Email Address</label>
                  <div className="d-flex align-items-center gap-2">
                    <Mail size={18} className="text-primary" />
                    <span className="fw-medium">{profile.email}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-group">
                  <label className="extra-small text-muted text-uppercase fw-bold mb-1">Base Location</label>
                  <div className="d-flex align-items-center gap-2">
                    <MapPin size={18} className="text-primary" />
                    <span className="fw-medium">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-card shadow-sm">
            <h5 className="fw-bold mb-4">Professional Details</h5>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="info-group">
                  <label className="extra-small text-muted text-uppercase fw-bold mb-1">Work Experience</label>
                  <div className="d-flex align-items-center gap-2">
                    <Briefcase size={18} className="text-primary" />
                    <span className="fw-medium">{profile.experience}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="info-group">
                  <label className="extra-small text-muted text-uppercase fw-bold mb-2">Key Skills</label>
                  <div className="d-flex flex-wrap gap-2">
                    {profile.skills.map((skill, i) => (
                      <span key={i} className="skill-pill">
                        <Wrench size={12} className="me-1" /> {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-5 px-5 rounded-pill">Save Profile Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
