import React from 'react';

const Loader = ({ fadeOut }) => {
  return (
    <div className={`loader-wrapper ${fadeOut ? 'opacity-0' : ''}`} style={{ visibility: fadeOut ? 'hidden' : 'visible' }}>
      <div className="loader-logo">
        <div className="loader-icon-circle">
          <i className="bi bi-house-heart-fill"></i>
        </div>
        <div className="animate-fade-in">
          Urban-Easy
        </div>
      </div>
      <div className="loader-sub">
        Premium Home Services
      </div>
      <div className="loader-progress" style={{ width: '200px' }}>
        <div className="loader-progress-bar"></div>
      </div>
    </div>
  );
};

export default Loader;
