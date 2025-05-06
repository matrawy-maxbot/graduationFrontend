'use client';

import Image from 'next/image';
import './styles/page.css';

export default function Schedules() {
  return (
     <div className="schedule-container">
          <div className="schedule-header">
               <h1 className="page-title">Schedule</h1>
               <div className="header-actions">
                    <button className="action-btn export">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                         </svg>
                         Export
                    </button>
                    <button className="action-btn import">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                         </svg>
                         Import
                    </button>
               </div>
          </div>
          <div className="schedule-grid">
               {/* Schedule Card 1 */}
               <div className="schedule-card">
                    <div className="schedule-image">
                         <Image src="/images/schedule.jpg" alt="Schedule" width={300} height={200} />
                    </div>
                    <div className="schedule-content">
                         <h2 className="schedule-title">Software Engineering</h2>
                         <div className="footer">
                              <div className="schedule-meta">
                                   <div className="meta-item">
                                        <span className="meta-label">Created at</span>
                                        <span className="meta-value">11/11/2025</span>
                                   </div>
                                   <div className="meta-item">
                                        <span className="meta-label">Last edit at</span>
                                        <span className="meta-value">11/11/2025 11:10 AM</span>
                                   </div>
                              </div>
                              <div className="schedule-author">
                                   <Image src="/images/shadcn.jpg" alt="DR. Ahmed Emad" className="author-avatar" width={40} height={40} />
                                   <span className="author-name">DR. Ahmed Emad</span>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Schedule Card 2 */}
               <div className="schedule-card">
                    <div className="schedule-image">
                         <Image src="/images/schedule2.png" alt="Schedule" width={300} height={200} />
                    </div>
                    <div className="schedule-content">
                         <h2 className="schedule-title">Software Engineering</h2>
                         <div className="footer">
                              <div className="schedule-meta">
                                   <div className="meta-item">
                                        <span className="meta-label">Created at</span>
                                        <span className="meta-value">11/11/2025</span>
                                   </div>
                              </div>
                              <div className="schedule-author">
                                   <Image src="/images/shadcn.jpg" alt="DR. Ahmed Emad" className="author-avatar" width={40} height={40} />
                                   <span className="author-name">DR. Ahmed Emad</span>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Create New Schedule Card */}
               <div className="create-schedule-card">
                    <svg className="create-schedule-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                         <path d="M12 8v8"></path>
                         <path d="M8 12h8"></path>
                    </svg>
                    <h2 className="create-schedule-title">Create New Schedule</h2>
               </div>
          </div>
     </div>
  );
}