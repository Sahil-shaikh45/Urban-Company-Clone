import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sections, categories } from '../data/services';
import ServiceGrid from './ServiceGrid';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Find the category object for styling/icons
  const categoryInfo = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());

  // Map category names to section titles
  const categoryMap = {
    "women's salon": ["Salon Services"],
    "men's salon": ["Salon Services"],
    "cleaning": ["Cleaning Essentials"],
    "ac repair": ["Appliance Repair"],
    "electrician": ["Home Repair & Installation"],
    "plumber": ["Home Repair & Installation"],
    "painting": ["Home Repair & Installation"]
  };

  const filteredSections = useMemo(() => {
    const allowedTitles = categoryMap[categoryName.toLowerCase()] || [];
    return sections.filter(section => allowedTitles.includes(section.title));
  }, [categoryName]);

  return (
    <div className="pt-5 mt-5">
      <div className="bg-soft py-5 border-bottom">
        <div className="container py-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="d-flex align-items-center gap-4"
          >
            <div 
              className="category-icon-box active m-0" 
              style={{ width: '70px', height: '70px', cursor: 'default' }}
            >
              <i className={`bi ${categoryInfo?.icon || 'bi-gear-fill'} fs-3`}></i>
            </div>
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item"><span className="text-primary cursor-pointer" onClick={() => navigate('/')}>Home</span></li>
                  <li className="breadcrumb-item active">{categoryName}</li>
                </ol>
              </nav>
              <h1 className="fw-bold mb-0">{categoryName}</h1>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container py-5">
        {filteredSections.length > 0 ? (
          filteredSections.map((section, idx) => (
            <div key={idx} className="mb-5 animate-fade-in">
              <ServiceGrid title={section.title} items={section.items} />
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-tools display-1 text-muted opacity-25"></i>
            <h3 className="mt-4">Services Coming Soon</h3>
            <p className="text-muted">We are currently onboarding top professionals for {categoryName}.</p>
            <button className="btn btn-premium mt-3" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
