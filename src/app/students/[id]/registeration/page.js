'use client';

import './styles/page.css';
import RegistrationManager from './components/RegistrationManager';

export default function RegistrationPage() {
  return (
    <div className="registration-container">
      <div className="advisor-info-card">
        <div className="advisor-row">
          <div className="advisor-column">
            <h3>Academic Advisor : <span>DR . Mohammed Abd-Elsattar El-sayed Mohammed Hajjaj</span></h3>
          </div>
          <div className="advisor-column">
            <h3>Semester : <span>Fall 2024/2025</span></h3>
          </div>
          <div className="advisor-column">
            <h3>Level : <span>3</span></h3>
          </div>
        </div>
        <div className="hours-row">
          <div className="hours-column">
            <h3>Total Required Hours : <span>136</span></h3>
          </div>
          <div className="hours-column">
            <h3>Total Pass Hours: <span>100</span></h3>
          </div>
          <div className="hours-column">
            <h3>Total Remain Hours : <span>36</span></h3>
          </div>
        </div>
      </div>

      <RegistrationManager />

    </div>
  );
}