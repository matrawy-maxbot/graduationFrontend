'use client';

import Image from 'next/image';
import './styles/page.css';

export default function MyCourses() {
  return (
     <div className="courses-container">
          <h1 className="page-title">My Courses</h1>
          <div className="courses-grid">
          {/* Course Card 1 */}
          <div className="course-card">
               <div className="course-header">
                    <h2 className="course-title">Software Engineering<span className="course-code">C251</span></h2>
               </div>
               <div className="course-badges">
                    <span className="badge exam">MidTerm Exam</span>
                    <span className="badge quiz">Quiz</span>
                    <span className="badge assignment">Assignment</span>
               </div>
               <div className="course-footer">
                    <div className="course-meta">
                         <span className="hours">3 Hours</span>
                         <span className="class-type">First Class</span>
                    </div>
                    <button className="visit-btn">Visit Community</button>
               </div>
          </div>

          {/* Course Card 2 */}
          <div className="course-card">
               <div className="course-header">
                    <h2 className="course-title">Software Engineering<span className="course-code">C251</span></h2>
               </div>
               <div className="course-badges">
                    <span className="badge exam">MidTerm Exam</span>
                    <span className="badge quiz">Quiz</span>
                    <span className="badge assignment">Assignment</span>
               </div>
               <div className="course-footer">
                    <div className="course-meta">
                         <span className="hours">3 Hours</span>
                         <span className="class-type">First Class</span>
                    </div>
                    <button className="visit-btn">Visit Community</button>
               </div>
          </div>

          {/* Course Card 3 */}
          <div className="course-card">
               <div className="course-header">
                    <h2 className="course-title">Software Engineering<span className="course-code">C251</span></h2>
               </div>
               <div className="course-badges">
                    <span className="badge exam">MidTerm Exam</span>
                    <span className="badge quiz">Quiz</span>
                    <span className="badge assignment">Assignment</span>
               </div>
               <div className="course-footer">
                    <div className="course-meta">
                         <span className="hours">3 Hours</span>
                         <span className="class-type">First Class</span>
                    </div>
                    <button className="visit-btn">Visit Community</button>
               </div>
          </div>

          {/* Course Card 4 */}
          <div className="course-card">
               <div className="course-header">
                    <h2 className="course-title">Software Engineering<span className="course-code">C251</span></h2>
               </div>
               <div className="course-badges">
                    <span className="badge exam">MidTerm Exam</span>
                    <span className="badge quiz">Quiz</span>
                    <span className="badge assignment">Assignment</span>
               </div>
               <div className="course-footer">
                    <div className="course-meta">
                         <span className="hours">3 Hours</span>
                         <span className="class-type">First Class</span>
                    </div>
                    <button className="visit-btn">Visit Community</button>
               </div>
          </div>

          {/* Course Card 5 */}
          <div className="course-card">
               <div className="course-header">
                    <h2 className="course-title">Software Engineering<span className="course-code">C251</span></h2>
               </div>
               <div className="course-badges">
                    <span className="badge exam">MidTerm Exam</span>
                    <span className="badge quiz">Quiz</span>
                    <span className="badge assignment">Assignment</span>
               </div>
               <div className="course-footer">
                    <div className="course-meta">
                         <span className="hours">3 Hours</span>
                         <span className="class-type">First Class</span>
                    </div>
                    <button className="visit-btn">Visit Community</button>
               </div>
          </div>

          {/* Course Card 6 */}
          <div className="course-card">
               <div className="course-header">
                    <h2 className="course-title">Software Engineering<span className="course-code">C251</span></h2>
               </div>
               <div className="course-badges">
                    <span className="badge exam">MidTerm Exam</span>
                    <span className="badge quiz">Quiz</span>
                    <span className="badge assignment">Assignment</span>
               </div>
               <div className="course-footer">
                    <div className="course-meta">
                         <span className="hours">3 Hours</span>
                         <span className="class-type">First Class</span>
                    </div>
                    <button className="visit-btn">Visit Community</button>
               </div>
          </div>
          </div>
     </div>
  );
}