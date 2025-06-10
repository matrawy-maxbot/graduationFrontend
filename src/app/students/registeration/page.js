<<<<<<< HEAD
'use client';

import './styles/page.css';
import './styles/registeration.css';
import RegistrationManager from './components/RegistrationManager';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RegistrationPage() {
  const [studentData, setStudentData] = useState(null);
  const [registrationSettings, setRegistrationSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching student data...");
        
        // Get access token from cookies
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };

        const accessToken = getCookie('access_token');
        
        // Fetch student registration info
        const studentResponse = await axios.get('http://localhost:3001/api/v1/students/me/registration-info', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        // Fetch registration settings
        const settingsResponse = await axios.get('http://localhost:3001/api/v1/course-registration-settings', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        console.log('Student API Response:', studentResponse.data);
        console.log('Settings API Response:', settingsResponse.data);
        
        setStudentData(studentResponse.data.data || studentResponse.data || {});
        setRegistrationSettings(settingsResponse.data.data || settingsResponse.data || {});
        console.log('Student Data:', studentData);
        console.log('Registration Settings:', registrationSettings);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load registration information');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading registration information...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!studentData) return <div className="no-data">No student information found</div>;

  // Extract data from the new response format
  const student = studentData.student || {};
  const advisor = studentData.level?.User || studentData.advisor || {};
  const semester = studentData.currentSemester || {};
  const level = studentData.level?.level || 1;
  const passedHours = studentData.passedHours || 0;
  const totalRequiredHours = student.maxhours || 136;
  const totalRemainingHours = totalRequiredHours - passedHours;
  
  // Check if registration is allowed
  const hasRegistrationAccess = student.registerationaccess === true;
  const isRegistrationOpen = registrationSettings?.open === true;
  const canRegister = hasRegistrationAccess && isRegistrationOpen;
  
  // Registration blocked message
  let registrationBlockedMessage = "";
  if (!hasRegistrationAccess) {
    registrationBlockedMessage = "Registration access is disabled for your account. Please contact administration.";
  } else if (!isRegistrationOpen) {
    registrationBlockedMessage = "Course registration is currently closed.";
  }

  return (
    <div className="registration-container">
      <div className="advisor-info-card">
        <div className="advisor-row">
          <div className="advisor-column">
            <h3>Academic Advisor : <span>{`DR. ${advisor.firstname || ''} ${advisor.secondname || ''} ${advisor.lastname || ''}`}</span></h3>
          </div>
          <div className="advisor-column">
            <h3>Semester : <span>{`${semester.semester || 'Fall'} ${semester.semesterstartyear || '2024'}/${semester.semesterendyear || '2025'}`}</span></h3>
          </div>
          <div className="advisor-column">
            <h3>Level : <span>{level}</span></h3>
          </div>
        </div>
        <div className="hours-row">
          <div className="hours-column">
            <h3>Total Required Hours : <span>{totalRequiredHours}</span></h3>
          </div>
          <div className="hours-column">
            <h3>Total Pass Hours: <span>{passedHours}</span></h3>
          </div>
          <div className="hours-column">
            <h3>Total Remain Hours : <span>{totalRemainingHours}</span></h3>
          </div>
        </div>
        
        {!canRegister && (
          <div className="registration-blocked-message">
            <p>{registrationBlockedMessage}</p>
          </div>
        )}
        
        {registrationSettings && (
          <div className="registration-settings-info">
            <h4>Registration Settings</h4>
            <div className="settings-details">
              <p>Min Hours: <span>{registrationSettings.minhours || 0}</span></p>
              <p>Max Hours: <span>{registrationSettings.maxhours || 0}</span></p>
              <p>Status: <span>{registrationSettings.open ? 'Open' : 'Closed'}</span></p>
            </div>
          </div>
        )}
      </div>

      {canRegister ? (
        <RegistrationManager 
          studentData={studentData} 
          currentSemester={semester}
          registrationSettings={registrationSettings}
        />
      ) : (
        <div className="registration-disabled">
          <h2>Course Registration Unavailable</h2>
          <p>{registrationBlockedMessage}</p>
        </div>
      )}
    </div>
  );
=======
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
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
}