import React from 'react';
import { 
  Star, 
  ThumbsUp, 
  MessageSquare,
  User
} from 'lucide-react';

const ReviewsPage = () => {
  const reviews = [
    { id: 1, customer: 'Priyanshi Verma', rating: 5, comment: 'Excellent work! The sofa looks brand new now. Very professional.', date: '2 days ago' },
    { id: 2, customer: 'Amit Kumar', rating: 4, comment: 'On time and efficient. Good service quality.', date: '5 days ago' },
    { id: 3, customer: 'Sneha Kapur', rating: 5, comment: 'Very polite behavior and thorough cleaning. Highly recommended.', date: '1 week ago' },
    { id: 4, customer: 'Rajesh Singh', rating: 3, comment: 'Service was okay, but reached 15 mins late.', date: '2 weeks ago' },
  ];

  return (
    <div className="reviews-page">
      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-4">
          <div className="content-card shadow-sm text-center py-5">
            <h1 className="display-3 fw-bold mb-0">4.8</h1>
            <div className="text-warning mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill={i < 4 ? 'currentColor' : 'none'} />)}
            </div>
            <p className="text-muted">Average Rating</p>
            <hr className="my-4 mx-5 opacity-25" />
            <div className="space-y-2 px-4">
              {[5, 4, 3, 2, 1].map((s) => (
                <div key={s} className="d-flex align-items-center gap-2">
                  <span className="small text-muted" style={{ width: '20px' }}>{s}</span>
                  <div className="progress flex-grow-1" style={{ height: '6px' }}>
                    <div className="progress-bar bg-warning" style={{ width: `${s === 5 ? 80 : s === 4 ? 15 : 5}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8">
          <div className="content-card shadow-sm">
            <h5 className="fw-bold mb-4">Latest Feedback</h5>
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item p-3 border-bottom mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-3">
                      <div className="customer-avatar-small bg-light text-dark">
                        <User size={18} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0 small">{review.customer}</h6>
                        <div className="text-warning extra-small">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < review.rating ? 'currentColor' : 'none'} />)}
                        </div>
                      </div>
                    </div>
                    <span className="extra-small text-muted">{review.date}</span>
                  </div>
                  <p className="small text-muted mb-3">"{review.comment}"</p>
                  <div className="d-flex gap-3 flex-wrap">
                    <button className="btn btn-link btn-sm text-decoration-none p-0 extra-small text-primary"><ThumbsUp size={12} className="me-1" /> Helpful (12)</button>
                    <button className="btn btn-link btn-sm text-decoration-none p-0 extra-small text-muted"><MessageSquare size={12} className="me-1" /> Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
