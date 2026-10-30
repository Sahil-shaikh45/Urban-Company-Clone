import React from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const EarningsPage = () => {
  const transactions = [
    { id: 1, type: 'Job Payout', service: 'Sofa Cleaning', date: '17 Mar, 2026', amount: 1250, status: 'Paid' },
    { id: 2, type: 'Job Payout', service: 'AC Repair', date: '16 Mar, 2026', amount: 899, status: 'Paid' },
    { id: 3, type: 'Bonus', service: 'Referral Reward', date: '15 Mar, 2026', amount: 500, status: 'Paid' },
    { id: 4, type: 'Withdrawal', service: 'Transfer to Bank', date: '14 Mar, 2026', amount: -5000, status: 'Processing' },
    { id: 5, type: 'Job Payout', service: 'Full House Painting', date: '12 Mar, 2026', amount: 4500, status: 'Paid' },
  ];

  return (
    <div className="earnings-page">
      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-8">
          <div className="content-card shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Total Balance</h5>
              <button className="btn btn-primary btn-sm rounded-pill px-4">Withdraw</button>
            </div>
            <div className="d-flex align-items-baseline gap-3 mb-4">
              <h1 className="display-4 fw-bold mb-0">₹12,450.00</h1>
              <span className="text-success small fw-bold"><TrendingUp size={16} className="me-1" /> +15.5%</span>
            </div>
            
            <div className="earnings-chart-placeholder rounded-4 bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
              <div className="text-center text-muted">
                <TrendingUp size={48} className="opacity-25 mb-2" />
                <p>Weekly Earnings Chart (Simulated)</p>
                <div className="d-flex gap-2 justify-content-center mt-3">
                  {[40, 70, 45, 90, 65, 85, 50].map((h, i) => (
                    <div key={i} className="bg-primary rounded-top" style={{ width: '20px', height: `${h}px` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="row g-4 h-100">
            <div className="col-12">
              <div className="content-card shadow-sm bg-primary text-white">
                <p className="extra-small text-uppercase fw-bold opacity-75 mb-1">Monthly Goal</p>
                <h4 className="fw-bold mb-3">₹45,000 / ₹50,000</h4>
                <div className="progress bg-white bg-opacity-25" style={{ height: '8px' }}>
                  <div className="progress-bar bg-white" style={{ width: '90%' }}></div>
                </div>
                <p className="extra-small mt-2 mb-0 opacity-75">You're 90% there! Keep it up.</p>
              </div>
            </div>
            <div className="col-12">
              <div className="content-card shadow-sm">
                <p className="extra-small text-uppercase fw-bold text-muted mb-1">Total Payouts</p>
                <h3 className="fw-bold mb-0">₹85,420</h3>
                <p className="extra-small text-muted mt-2 mb-0">Across 156 completed jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-card shadow-sm p-0 overflow-hidden">
        <div className="p-4 d-flex justify-content-between align-items-center border-bottom flex-wrap gap-2">
          <h5 className="fw-bold mb-0">Recent Transactions</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-light text-dark btn-sm border-0 bg-light"><Filter size={14} className="me-1" /> Filter</button>
            <button className="btn btn-outline-light text-dark btn-sm border-0 bg-light d-none d-sm-inline-block"><Download size={14} className="me-1" /> Export</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="border-0 small text-uppercase text-muted">Transaction</th>
                <th className="border-0 small text-uppercase text-muted">Date</th>
                <th className="border-0 small text-uppercase text-muted">Amount</th>
                <th className="border-0 small text-uppercase text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className={`transaction-icon ${t.amount > 0 ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'}`}>
                        {t.amount > 0 ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                      </div>
                      <div>
                        <p className="mb-0 fw-bold small">{t.type}</p>
                        <p className="extra-small text-muted mb-0">{t.service}</p>
                      </div>
                    </div>
                  </td>
                  <td className="small text-muted">{t.date}</td>
                  <td className={`fw-bold small ${t.amount > 0 ? 'text-success' : 'text-danger'}`}>
                    {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount)}
                  </td>
                  <td>
                    <span className={`status-badge-pill ${t.status.toLowerCase()}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
