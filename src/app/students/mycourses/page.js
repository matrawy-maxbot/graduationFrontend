'use client';

import Image from 'next/image';
import './styles/page.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyCourses() {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        
        // Get access token from cookies
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };
        
        const accessToken = getCookie('access_token');
        
        const response = await axios.get('http://localhost:3001/api/v1/course-registers/me/current-courses', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        console.log('API Response:', response.data);
        
        setCoursesData(response.data.data || response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!coursesData || coursesData.length === 0) {
    return <div className="no-data">No courses found</div>;
  }

  console.log("coursesData:", coursesData);

  return (
     <div className="courses-container">
          <h1 className="page-title">My Courses</h1>
          <div className="courses-grid">
          {
          coursesData.map((courseReg) => {
            const course = courseReg.Course;
            const semester = courseReg.semester;
            
            return (
              <div className="course-card" key={courseReg.id}>
                <div className="course-header">
                    <h2 className="course-title">{course.coursename}<span className="course-code">{course.coursecode}</span></h2>
                </div>
                <div className="course-badges">
                    <span className="badge exam">MidTerm Exam</span>
                    <span className="badge quiz">Quiz</span>
                    <span className="badge assignment">Assignment</span>
                </div>
                <div className="semester-info">
                    <span>{semester.semester} {semester.semesterstartyear}/{semester.semesterendyear}</span>
                </div>
                <div className="course-footer">
                    <div className="course-meta">
                        <span className="hours">{course.coursehours || 3} Hours</span>
                        <span className="class-type">Level {course.level || 1}</span>
                    </div>
                    <button className="visit-btn">Visit Community</button>
                </div>
              </div>
            );
          })}
          </div>
     </div>
  );
}