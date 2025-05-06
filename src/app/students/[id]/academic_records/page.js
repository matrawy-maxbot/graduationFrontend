'use client';

import Image from 'next/image';
import './styles/page.css';
import { useEffect } from 'react';
import GpaChart from './components/script';

export default function AcademicRecord() {
  return (
    <div className="academic-record-container">
      {/* Header Card */}
      <div className="student-info-card">
        <div className="student-profile">
          <div className="profile-section">
            <div className="profile-image-container">
              <Image src="/images/shadcn.jpg" alt="Student Profile" className="profile-image" width={100} height={100} />
            </div>
            <div className="graduation-cap">
              <Image src="/images/student_cap.svg" alt="Graduation Cap" width={100} height={100} />
            </div>
          </div>
          <div className="student-details">
            <h2 className="student-name">Mohammed Saeed Elkhodary Saber</h2>
            <div className="student-id">202018932</div>
            <div className="level-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m21.56 10.739-1.36-1.58c-.26-.3-.47-.86-.47-1.26v-1.7c0-1.06-.87-1.93-1.93-1.93h-1.7c-.39 0-.96-.21-1.26-.47l-1.58-1.36c-.69-.59-1.82-.59-2.52 0l-1.57 1.37c-.3.25-.87.46-1.26.46H6.18c-1.06 0-1.93.87-1.93 1.93v1.71c0 .39-.21.95-.46 1.25l-1.35 1.59c-.58.69-.58 1.81 0 2.5l1.35 1.59c.25.3.46.86.46 1.25v1.71c0 1.06.87 1.93 1.93 1.93h1.73c.39 0 .96.21 1.26.47l1.58 1.36c.69.59 1.82.59 2.52 0l1.58-1.36c.3-.26.86-.47 1.26-.47h1.7c1.06 0 1.93-.87 1.93-1.93v-1.7c0-.39.21-.96.47-1.26l1.36-1.58c.58-.69.58-1.83-.01-2.52zm-5.4-.63-4.83 4.83a.75.75 0 0 1-1.06 0l-2.42-2.42c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l1.89 1.89 4.3-4.3c.29-.29.77-.29 1.06 0s.29.77 0 1.06z"></path></svg>
              Fourth Level
            </div>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-box advisor">
            <div className="stat-header">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
              </svg>
              <span>Academic Advisor</span>
            </div>
            <div className="advisor-name">DR. Mohammed Abd-Elsattar El-sayed Mohammed Hajjaj</div>
          </div>
          <div className="stat-box hours">
            <div className="stat-header">
              <span>Passed Hours</span>
            </div>
            <div className="stat-value">
              <span className="number">84</span>
              <span className="line"></span>
              <span className="total">136</span>
            </div>
          </div>
          <div className="stat-box gpa">
            <div className="stat-header">
              <span>GPA</span>
              <span className="grade">B</span>
            </div>
            <div className="stat-content">
              <span className="gpa-value">2.77</span>
            </div>
          </div>
        </div>
      </div>

      {/* GPA Analysis Chart */}
      <div className="gpa-analysis-card">
        <h3>GPA Analysis</h3>
        <GpaChart />
      </div>

      {/* Academic Record Table */}
      <div className="academic-record-table">
        <h2 className="table-title">Student Academic Record</h2>
        <p className="table-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>
        
        <div className="semester-section">
          <div className="semester-header">
            <div className="semester-info">
              <h3>Semester: <span>Fall 2020/2021</span></h3>
              <div className="semester-stats">
                <span>Semester Hours: <strong>18</strong></span>
                <span>Semester GPA: <strong>2.94</strong></span>
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Course Hours</th>
                  <th>Points</th>
                  <th>Grade</th>
                  <th>Course Level</th>
                  <th>Course Group</th>
                  <th>Requirement Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>223</td>
                  <td>Lorem ipsum dolor sit</td>
                  <td>3</td>
                  <td>22.5 / 30</td>
                  <td className="grade-status excellent">A</td>
                  <td>3</td>
                  <td>New</td>
                  <td>Mandatory University</td>
                </tr>
                <tr>
                  <td>223</td>
                  <td>Lorem ipsum dolor sit</td>
                  <td>3</td>
                  <td>22.5 / 30</td>
                  <td className="grade-status good">B+</td>
                  <td>3</td>
                  <td>New</td>
                  <td>Mandatory University</td>
                </tr>
                <tr>
                  <td>223</td>
                  <td>Lorem ipsum dolor sit</td>
                  <td>3</td>
                  <td>22.5 / 30</td>
                  <td className="grade-status pass">C+</td>
                  <td>3</td>
                  <td>New</td>
                  <td>Mandatory University</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="semester-section">
          <div className="semester-header">
            <div className="semester-info">
              <h3>Semester: <span>Fall 2020/2021</span></h3>
              <div className="semester-stats">
                <span>Semester Hours: <strong>18</strong></span>
                <span>Semester GPA: <strong>2.94</strong></span>
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Course Hours</th>
                  <th>Points</th>
                  <th>Grade</th>
                  <th>Course Level</th>
                  <th>Course Group</th>
                  <th>Requirement Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>223</td>
                  <td>Lorem ipsum dolor sit</td>
                  <td>3</td>
                  <td>22.5 / 30</td>
                  <td className="grade-status excellent">A</td>
                  <td>3</td>
                  <td>New</td>
                  <td>Mandatory University</td>
                </tr>
                <tr>
                  <td>223</td>
                  <td>Lorem ipsum dolor sit</td>
                  <td>3</td>
                  <td>22.5 / 30</td>
                  <td className="grade-status good">B+</td>
                  <td>3</td>
                  <td>New</td>
                  <td>Mandatory University</td>
                </tr>
                <tr>
                  <td>223</td>
                  <td>Lorem ipsum dolor sit</td>
                  <td>3</td>
                  <td>22.5 / 30</td>
                  <td className="grade-status pass">B+</td>
                  <td>3</td>
                  <td>New</td>
                  <td>Mandatory University</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
     