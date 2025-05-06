'use client';

import { useEffect, useState, useRef } from 'react';

// Default available courses data
const AVAILABLE_COURSES = [
  {
    id: 'C345-SoftwareEngineering-1',
    name: 'Software Engineering',
    code: 'C345',
    hours: 3,
    description: 'Introduction to software engineering principles and practices',
    prerequisites: ['C200', 'C201'],
    instructor: 'Dr. John Smith'
  },
  {
    id: 'C346-DatabaseSystems-1',
    name: 'Database Systems',
    code: 'C346',
    hours: 3,
    description: 'Fundamentals of database design and management',
    prerequisites: ['C200', 'C201'],
    instructor: 'Dr. Sarah Johnson'
  },
  {
    id: 'C347-WebDevelopment-1',
    name: 'Web Development',
    code: 'C347',
    hours: 3,
    description: 'Modern web development technologies and frameworks',
    prerequisites: ['C200', 'C201'],
    instructor: 'Dr. Michael Brown'
  },
  {
    id: 'C348-ArtificialIntelligence-1',
    name: 'Artificial Intelligence',
    code: 'C348',
    hours: 3,
    description: 'Introduction to AI concepts and applications',
    prerequisites: ['C300', 'C301'],
    instructor: 'Dr. Emily Davis'
  },
  {
    id: 'C349-ComputerNetworks-1',
    name: 'Computer Networks',
    code: 'C349',
    hours: 3,
    description: 'Network architecture, protocols, and security',
    prerequisites: ['C200', 'C201'],
    instructor: 'Dr. Robert Wilson'
  },
  {
    id: 'C350-OperatingSystems-1',
    name: 'Operating Systems',
    code: 'C350',
    hours: 3,
    description: 'Operating system concepts and implementation',
    prerequisites: ['C200', 'C201'],
    instructor: 'Dr. Lisa Anderson'
  },
  {
    id: 'C351-CloudComputing-1',
    name: 'Cloud Computing',
    code: 'C351',
    hours: 3,
    description: 'Cloud computing concepts, services, and deployment models',
    prerequisites: ['C300', 'C301'],
    instructor: 'Dr. James Wilson'
  },
  {
    id: 'C352-MobileAppDevelopment-1',
    name: 'Mobile App Development',
    code: 'C352',
    hours: 3,
    description: 'Development of mobile applications for iOS and Android platforms',
    prerequisites: ['C200', 'C201'],
    instructor: 'Dr. Maria Garcia'
  }
];

export default function RegistrationManager() {
  const [selectedHours, setSelectedHours] = useState(0);
  const [maxHours, setMaxHours] = useState(18);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState(AVAILABLE_COURSES);

  const semesterFooterRef = useRef(null);

  const addCourseToSelected = (course) => {
    if (selectedHours + course.hours > maxHours) {
      setIsErrorDialogOpen(true);
      return;
    }

    setSelectedCourses([...selectedCourses, course]);
    setAvailableCourses(availableCourses.filter(c => c.id !== course.id));
    setSelectedHours(selectedHours + course.hours);
  };

  const removeCourseFromSelected = (course) => {
    setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
    setAvailableCourses([...availableCourses, course]);
    setSelectedHours(selectedHours - course.hours);
  };

  const handleRegister = () => {
    if (selectedHours === 0) {
      alert('Please select at least one course to register.');
      return;
    }
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmDialogOpen(false);
    setIsSuccessDialogOpen(true);
    // Here you would typically send the data to a server
  };

  return (
    <>
      <div className="courses-selection-container">
        <div className="courses-column">
          <h2 className="courses-title">Available Courses</h2>
          <p className="courses-subtitle">Select courses to register</p>
          
          <div className="courses-list">
            {availableCourses.map(course => (
              <div key={course.id} className="course-item" data-id={course.id}>
                <div className="course-info">
                  <h3>{course.name}</h3>
                  <div className="course-details">
                    <span className="course-code">{course.code}</span>
                    <span className="course-hours">{course.hours} Hours</span>
                  </div>
                </div>
                <button 
                  className="add-course-btn"
                  onClick={() => addCourseToSelected(course)}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="courses-column">
          <h2 className="courses-title">Selected Courses</h2>
          <p className="courses-subtitle">Courses to be registered</p>
          
          <div className="courses-list">
            {selectedCourses.map(course => (
              <div key={course.id} className="course-item selected" data-id={course.id}>
                <div className="course-info">
                  <h3>{course.name}</h3>
                  <div className="course-details">
                    <span className="course-code">{course.code}</span>
                    <span className="course-hours">{course.hours} Hours</span>
                  </div>
                </div>
                <button 
                  className="remove-course-btn"
                  onClick={() => removeCourseFromSelected(course)}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="semester-footer" ref={semesterFooterRef}>
        <div className="semester-info">
          <div className="semester-detail">
            <p>Semester : <span>Fall 2024/2025</span></p>
          </div>
          <div className="semester-detail">
            <p>Max Hours : <span>{maxHours}</span></p>
          </div>
          <div className="semester-detail">
            <p>Selected Hours : <span>{selectedHours}</span></p>
          </div>
        </div>
        <button 
          className={`register-button ${selectedHours === 0 ? 'disabled' : ''}`}
          onClick={handleRegister}
          disabled={selectedHours === 0}
        >
          Register
        </button>
      </div>

      {/* Dialogs */}
      {isConfirmDialogOpen && (
        <div className="registration-dialog" id="registration-confirm-dialog">
          <div className="dialog-content">
            <div className="dialog-header">
              <h3>Confirm Registration</h3>
              <button className="close-dialog" onClick={() => setIsConfirmDialogOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="dialog-body">
              <p className="dialog-message">You are about to register for the following courses:</p>
              <div className="selected-courses-list">
                {selectedCourses.map(course => (
                  <div key={course.id} className="course-row">
                    <div className="course-info-dialog">
                      <div className="course-title">{course.name}</div>
                      <div className="course-details-small">
                        <span>{course.code}</span>
                        <span>{course.hours} Hours</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hours-summary">
                <p>Total Credit Hours: <span className="total-hours">{selectedHours}</span></p>
              </div>
            </div>
            <div className="dialog-footer">
              <button className="cancel-btn" onClick={() => setIsConfirmDialogOpen(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleConfirm}>Confirm Registration</button>
            </div>
          </div>
        </div>
      )}

      {isSuccessDialogOpen && (
        <div className="registration-dialog" id="registration-success-dialog">
          <div className="dialog-content">
            <div className="dialog-header">
              <h3>Registration Successful</h3>
              <button className="close-dialog" onClick={() => setIsSuccessDialogOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="dialog-body">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="dialog-message">Your course registration has been completed successfully.</p>
            </div>
            <div className="dialog-footer">
              <button className="confirm-btn" onClick={() => setIsSuccessDialogOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {isErrorDialogOpen && (
        <div className="registration-dialog" id="max-hours-error-dialog">
          <div className="dialog-content">
            <div className="dialog-header">
              <h3>Maximum Hours Exceeded</h3>
              <button className="close-dialog" onClick={() => setIsErrorDialogOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="dialog-body">
              <div className="error-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="15" r="1" fill="currentColor"/>
                </svg>
              </div>
              <p className="dialog-message">Cannot add this course. Maximum hours (<span className="max-hours">{maxHours}</span>) would be exceeded.</p>
            </div>
            <div className="dialog-footer">
              <button className="confirm-btn" onClick={() => setIsErrorDialogOpen(false)}>Understood</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 