'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './styles/page.css';
import { formatTimeRemaining, calculateTimeElapsed, formatDate, setupClickOutsideHandler } from './components/script';

export default function Quizes() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const dialogRef = useRef(null);
  
  // Set isMounted to true after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());
    
    // Update current time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Mock quiz data with fixed date strings (to avoid hydration mismatch)
  const quizzes = [
    {
      id: 1,
      title: 'Quiz 2',
      course: 'Software Engineering',
      instructor: 'DR. Ahmed Emad',
      status: 'active',
      startTime: '2023-08-01T10:00:00.000Z', // Use fixed dates instead of relative ones
      endTime: '2023-08-01T14:00:00.000Z',
      createdAt: '2023-07-28T10:00:00.000Z',
      formLink: 'https://forms.google.com/quiz1',
      description: 'This quiz covers chapters 5-7 from the textbook. Focus on software architecture and design patterns.'
    },
    {
      id: 2,
      title: 'Quiz 3',
      course: 'Software Engineering',
      instructor: 'DR. Ahmed Emad',
      status: 'postponed',
      startTime: '2023-08-15T10:00:00.000Z',
      endTime: '2023-08-15T12:00:00.000Z',
      createdAt: '2023-07-25T10:00:00.000Z',
      formLink: 'https://forms.google.com/quiz2',
      description: 'This quiz will test your knowledge on agile methodologies and sprint planning techniques.'
    },
    {
      id: 3,
      title: 'Quiz 1',
      course: 'Software Engineering',
      instructor: 'DR. Ahmed Emad',
      status: 'completed',
      startTime: '2023-07-15T10:00:00.000Z',
      endTime: '2023-07-15T12:00:00.000Z',
      createdAt: '2023-07-10T10:00:00.000Z',
      formLink: 'https://forms.google.com/quiz3',
      description: 'Introduction to software engineering principles and methodologies.'
    }
  ];

  // Set up click outside handler when dialog is open
  useEffect(() => {
    let cleanup;
    
    if (isDialogOpen) {
      cleanup = setupClickOutsideHandler(() => {
        setIsDialogOpen(false);
      });
    }
    
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [isDialogOpen]);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setIsDialogOpen(true);
  };

  // Calculate time elapsed percentage for active quiz
  const getElapsedPercentage = (quiz) => {
    if (!isMounted || !currentTime || !quiz || quiz.status !== 'active') {
      return 0;
    }
    
    return calculateTimeElapsed(new Date(quiz.startTime), new Date(quiz.endTime), currentTime);
  };

  // Only render time-sensitive content after client-side hydration
  const renderTimeInfo = (quiz) => {
    if (!isMounted || !currentTime) {
      return <span className="time-left-text">Loading...</span>;
    }

    if (quiz.status === 'active') {
      return <span className="time-left-text">{formatTimeRemaining(new Date(quiz.endTime), currentTime)}</span>;
    } else if (quiz.status === 'postponed') {
      return <span className="time-left-text">Starts in {formatTimeRemaining(new Date(quiz.startTime), currentTime).replace('left', '')}</span>;
    } else {
      return <span className="time-left-text">Finished</span>;
    }
  };

  return (
    <div className="quizzes-container">
      <div className="course-section">
        <div className="course-header-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.34 42">
            <path d="M5.35,33.53h28.61c.09,0,.17-.01.25-.03,0,0,.01,0,.02,0,.61,0,1.11-.5,1.11-1.11V1.11c0-.61-.5-1.11-1.11-1.11H5.35C2.4,0,0,2.4,0,5.34c0,.04,0,.08.01.12,0,2.72-.04,27.72,0,31.01,0,.06,0,.13,0,.19,0,2.83,2.22,5.15,5.01,5.33.06,0,.11.02.17.02h29.05c.61,0,1.11-.5,1.11-1.11v-4.17c0-.61-.5-1.11-1.11-1.11s-1.11.5-1.11,1.11v3.06H5.35c-1.68,0-3.06-1.34-3.12-3,0-.03,0-.06,0-.09,0-.05,0-.12,0-.22.1-1.64,1.46-2.94,3.12-2.94h0ZM6.1,5.34c0-.61.5-1.11,1.11-1.11s1.11.5,1.11,1.11v22.48c0,.61-.5,1.11-1.11,1.11s-1.11-.5-1.11-1.11V5.34h0Z"/>
          </svg>
          <span>Course :</span> Software Engineering
        </div>

        {/* Quiz Cards */}
        {quizzes.map((quiz) => (
          <div 
            key={quiz.id} 
            className="quiz-card" 
            data-progress={getElapsedPercentage(quiz)}
            onClick={() => handleQuizClick(quiz)}
          >
            <div className="quiz-title">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {quiz.title}
              <span className={`status-badge ${quiz.status}`}>
                {quiz.status === 'active' ? 'Active' : quiz.status === 'postponed' ? 'Postponed' : 'Finished'}
              </span>
            </div>
            <div className="quiz-meta">
              <div className="quiz-author">
                <Image src="/images/shadcn.jpg" alt={quiz.instructor} className="author-avatar" width={40} height={40} />
                <div className="author-info">
                  <span className="author-name">{quiz.instructor}</span>
                  <span className="created-at">Created {isMounted ? formatTimeRemaining(new Date(quiz.createdAt), currentTime).replace('left', 'ago') : 'recently'}</span>
                </div>
              </div>
              <div className={`time-left ${quiz.status === 'active' ? 'active-time' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="time-icon" viewBox="0 0 72 72">
                  <path className="cls-1" d="M72,36c0,1.66-1.34,3-3,3s-3-1.34-3-3c-.02-16.56-13.44-29.98-30-30-1.66,0-3-1.34-3-3s1.34-3,3-3c19.87.02,35.98,16.13,36,36ZM48,39c1.66,0,3-1.34,3-3s-1.34-3-3-3h-6.83c-.52-.9-1.27-1.65-2.17-2.17v-9.83c0-1.66-1.34-3-3-3s-3,1.34-3,3v9.83c-2.86,1.65-3.85,5.31-2.2,8.17s5.31,3.85,8.17,2.2c.91-.53,1.67-1.29,2.2-2.2h6.83ZM5.48,20.35c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM6,36c0-1.66-1.34-3-3-3s-3,1.34-3,3,1.34,3,3,3,3-1.34,3-3ZM36,66c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM12.66,9.62c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3h0c0-1.66-1.34-3-3-3ZM23.34,2.52c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3h0c0-1.66-1.34-3-3-3h0ZM5.48,45.65c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM12.66,56.38c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM23.34,63.48c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM66.52,45.65c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3h0ZM59.34,56.38c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM48.66,63.48c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3Z"/>
                </svg>
                {renderTimeInfo(quiz)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Dialog */}
      {isDialogOpen && selectedQuiz && (
        <div className="quiz-dialog-overlay">
          <div className="quiz-dialog" ref={dialogRef}>
            <button 
              className="dialog-close-btn"
              onClick={() => setIsDialogOpen(false)}
            >
              &times;
            </button>
            
            <div className="quiz-dialog-header">
              <h2 className="dialog-title">{selectedQuiz.title}</h2>
              <span className={`status-badge ${selectedQuiz.status}`}>
                {selectedQuiz.status === 'active' ? 'Active' : selectedQuiz.status === 'postponed' ? 'Postponed' : 'Finished'}
              </span>
            </div>
            
            <div className="quiz-dialog-content">
              <div className="quiz-info-section">
                <div className="info-item">
                  <h3>Course:</h3>
                  <p>{selectedQuiz.course}</p>
                </div>
                
                <div className="info-item">
                  <h3>Instructor:</h3>
                  <p>{selectedQuiz.instructor}</p>
                </div>
                
                <div className="info-item">
                  <h3>Created on:</h3>
                  <p>{isMounted ? formatDate(selectedQuiz.createdAt) : 'Loading...'}</p>
                </div>
              </div>
              
              <div className="quiz-time-section">
                <h3>Quiz Schedule:</h3>
                <div className="time-details">
                  <div className="time-item">
                    <span className="time-label">Start Time:</span>
                    <span className="time-value">{isMounted ? formatDate(selectedQuiz.startTime) : 'Loading...'}</span>
                  </div>
                  <div className="time-item">
                    <span className="time-label">End Time:</span>
                    <span className="time-value">{isMounted ? formatDate(selectedQuiz.endTime) : 'Loading...'}</span>
                  </div>
                </div>
                
                {isMounted && selectedQuiz.status === 'active' && (
                  <div className="time-progress-container">
                    <div className="time-progress-label">
                      <span>Quiz Progress:</span>
                      <span>{getElapsedPercentage(selectedQuiz)}% completed</span>
                    </div>
                    <div className="time-progress">
                      <div 
                        className="time-progress-bar" 
                        style={{ width: `${getElapsedPercentage(selectedQuiz)}%` }}
                      ></div>
                    </div>
                    <div className="time-remaining">
                      Time remaining: {formatTimeRemaining(new Date(selectedQuiz.endTime), currentTime)}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="quiz-description-section">
                <h3>Description:</h3>
                <p>{selectedQuiz.description}</p>
              </div>
            </div>
            
            <div className="quiz-dialog-actions">
              {selectedQuiz.status === 'active' ? (
                <a 
                  className="take-quiz-btn"
                  href={selectedQuiz.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Take Quiz Now
                </a>
              ) : selectedQuiz.status === 'postponed' ? (
                <button className="disabled-btn">
                  Quiz Not Started Yet
                </button>
              ) : (
                <button className="disabled-btn">
                  Quiz Completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}