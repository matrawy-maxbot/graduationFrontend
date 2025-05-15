"use client";
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function InteractiveSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  let userType = 'student';

  // Determine user type based on URL path
  if (pathname.startsWith('/students')) {
    userType = 'student';
  } else if (pathname.startsWith('/teachers/doctors')) {
    userType = 'doctor';
  } else if (pathname.startsWith('/teachers/assistants')) {
    userType = 'assistant';
  } else if (pathname.startsWith('/admins')) {
    userType = 'admin';
  }

  // Generate the correct links based on user type
  const getHomeLink = () => {
    if (userType === 'student') return '/students/scheduling';
    if (userType === 'doctor') return '/teachers/doctors/scheduling';
    if (userType === 'assistant') return '/teachers/assistants/scheduling';
    if (userType === 'admin') return '/admins/statics';
    return '/';
  };

  const getInboxLink = () => {
    if (userType === 'student') return '/students/inbox';
    if (userType === 'doctor') return '/teachers/doctors/inbox';
    if (userType === 'assistant') return '/teachers/assistants/inbox';
    if (userType === 'admin') return '/admins/inbox';
    return '/';
  };

  const getSettingsLink = () => {
    if (userType === 'student') return '/students/settings';
    if (userType === 'doctor') return '/teachers/doctors/settings';
    if (userType === 'assistant') return '/teachers/assistants/settings';
    if (userType === 'admin') return '/admins/settings';
    return '/';
  };

  // Handle navigation with explicit routing
  const navigateToHome = (e) => {
    e.preventDefault();
    const path = getHomeLink();
    console.log('Navigating to home:', path);
    router.push(path);
  };

  const navigateToInbox = (e) => {
    e.preventDefault();
    const path = getInboxLink();
    console.log('Navigating to inbox:', path);
    router.push(path);
  };

  const getHomeTitle = () => {
    if (userType === 'admin') return 'Statistics';
    return 'Schedule';
  };

  return (
    <div className="sidebar group peer" data-state="collapsed" data-collapsible="" data-variant="sidebar" data-side="left">
      <div className="sidebar-container">
        <div data-sidebar="sidebar" className="sidebar-inner">
          <div data-sidebar="header" className="sidebar-header">
            <ul data-sidebar="menu" className="menu">
              <li data-sidebar="menu-item" className="group/menu-item">
                <a 
                  data-sidebar="menu-button" 
                  className="menu-button main"
                  href={getHomeLink()}
                  onClick={navigateToHome}
                >
                  <div className="logo-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                      <path d="M7 2h10"></path>
                      <path d="M5 6h14"></path>
                      <rect width="18" height="12" x="3" y="10" rx="2"></rect>
                    </svg>
                  </div>
                  <div className="logo-text">
                    <span className="title">Home</span>
                    <span className="subtitle">{getHomeTitle()}</span>
                  </div>
                </a>
              </li>
              <li data-sidebar="menu-item" className="group/menu-item inbox filled">
                <a 
                  data-sidebar="menu-button" 
                  className="menu-button inbox"
                  href={getInboxLink()}
                  onClick={navigateToInbox}
                >
                  <div className="logo-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                      <g>
                        <path d="M19.5 3.998h-1.528a4.506 4.506 0 0 0-4.472-4h-9a4.505 4.505 0 0 0-4.5 4.5v13.854A1.643 1.643 0 0 0 1.648 20c.319 0 .638-.093.914-.277l3.524-2.349a4.508 4.508 0 0 0 4.414 3.623h6.849l4.089 2.726a1.637 1.637 0 0 0 1.691.082c.537-.287.871-.844.871-1.453V8.498c0-2.481-2.019-4.5-4.5-4.5ZM2.007 18.892a.635.635 0 0 1-.665.032.638.638 0 0 1-.342-.571V4.498c0-1.93 1.57-3.5 3.5-3.5h9c1.93 0 3.5 1.57 3.5 3.5v8c0 1.93-1.57 3.5-3.5 3.5H6.563a.755.755 0 0 0-.345.087l-4.211 2.806ZM23 22.353a.638.638 0 0 1-.342.571.64.64 0 0 1-.665-.032l-4.215-2.81a.498.498 0 0 0-.277-.084h-7a3.505 3.505 0 0 1-3.464-3h6.464c2.481 0 4.5-2.019 4.5-4.5v-7.5h1.5c1.93 0 3.5 1.57 3.5 3.5v13.854Z"></path>
                      </g>
                    </svg>
                    <span className="unread-badge red"></span>
                  </div>
                  <div className="logo-text">
                    <span className="title">Inbox</span>
                  </div>
                  <span className="notification-badge">3</span>
                </a>
              </li>
            </ul>
          </div>

          {userType === 'student' && (
            <div data-sidebar="content" className="sidebar-content">
              <div data-sidebar="group" className="sidebar-group">
                <div data-sidebar="group-label" className="group-label">Academic Affairs</div>
                <ul data-sidebar="menu" className="menu">
                  <li data-sidebar="menu-item" className="menu-item">
                    <Link href="/students/academic_records" legacyBehavior >
                      <a data-sidebar="menu-button" className="menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <line x1="10" y1="9" x2="8" y2="9"></line>
                        </svg>
                        <span>academic records</span>
                      </a>
                    </Link>
                  </li>
                  <li data-sidebar="menu-item" className="menu-item">
                    <Link href="/students/mycourses" legacyBehavior>
                      <a data-sidebar="menu-button" className="menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        <span>my courses</span>
                      </a>
                    </Link>
                  </li>
                  <li data-sidebar="menu-item" className="menu-item">
                    <Link href="/students/registeration" legacyBehavior>
                      <a data-sidebar="menu-button" className="menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        <span>registeration</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div data-sidebar="group" className="sidebar-group">
                <div data-sidebar="group-label" className="group-label">Assessments</div>
                <ul data-sidebar="menu" className="menu">
                  <li data-sidebar="menu-item" className="menu-item">
                    <Link href="/students/quizzes" legacyBehavior>
                      <a data-sidebar="menu-button" className="menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <span>quizzes</span>
                      </a>
                    </Link>
                  </li>
                  <li data-sidebar="menu-item" className="menu-item">
                    <Link href="/students/assignments" legacyBehavior>
                      <a data-sidebar="menu-button" className="menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                        <span>assignments</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {userType === 'doctor' && (
            <div data-sidebar="content" className="sidebar-content">
              <div data-sidebar="group" className="sidebar-group">
                <div data-sidebar="group-label" className="group-label">Teaching</div>
                <ul data-sidebar="menu" className="menu">
                  <li data-sidebar="menu-item" className="menu-item group/collapsible" data-state="closed">
                    <button data-sidebar="menu-button" className="menu-button" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                      <span className="text-indigo-600">Software Engineering</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                    <div className="submenu-container">
                      <ul data-sidebar="menu-sub" className="submenu submenu-indigo">
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/assignments" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-123/assignments");
                            }}
                          >
                            Assignments
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/quizes" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-123/quizes");
                            }}
                          >
                            Quizzes
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/grades" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-123/grades");
                            }}
                          >
                            Grades
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/preview" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-123/preview");
                            }}
                          >
                            Preview
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  
                  <li data-sidebar="menu-item" className="menu-item group/collapsible" data-state="closed">
                    <button data-sidebar="menu-button" className="menu-button" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                      <span className="text-sky-600">Data Structures</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                    <div className="submenu-container">
                      <ul data-sidebar="menu-sub" className="submenu submenu-sky">
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/assignments" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-456/assignments");
                            }}
                          >
                            Assignments
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/quizes" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-456/quizes");
                            }}
                          >
                            Quizzes
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/grades" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-456/grades");
                            }}
                          >
                            Grades
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/preview" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-456/preview");
                            }}
                          >
                            Preview
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  
                  <li data-sidebar="menu-item" className="menu-item group/collapsible" data-state="closed">
                    <button data-sidebar="menu-button" className="menu-button" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                      <span className="text-emerald-600">Artificial Intelligence</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                    <div className="submenu-container">
                      <ul data-sidebar="menu-sub" className="submenu submenu-emerald">
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/assignments" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-789/assignments");
                            }}
                          >
                            Assignments
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/quizes" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-789/quizes");
                            }}
                          >
                            Quizzes
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/grades" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-789/grades");
                            }}
                          >
                            Grades
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/doctors/courses/[courseId]/preview" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              // You would replace '[courseId]' with the actual course ID
                              router.push("/teachers/doctors/courses/course-789/preview");
                            }}
                          >
                            Preview
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {userType === 'assistant' && (
            <div data-sidebar="content" className="sidebar-content">
              <div data-sidebar="group" className="sidebar-group">
                <div data-sidebar="group-label" className="group-label">Teaching Assistant</div>
                <ul data-sidebar="menu" className="menu">
                  <li data-sidebar="menu-item" className="menu-item group/collapsible" data-state="closed">
                    <button data-sidebar="menu-button" className="menu-button" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ff9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                      <span className="text-amber-600">Introduction to CS</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                    <div className="submenu-container">
                      <ul data-sidebar="menu-sub" className="submenu submenu-amber">
                        <li>
                          <a 
                            href="/teachers/assistants/courses/[courseId]/assignments" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/teachers/assistants/courses/course-101/assignments");
                            }}
                          >
                            Assignments
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/assistants/courses/[courseId]/quizes" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/teachers/assistants/courses/course-101/quizes");
                            }}
                          >
                            Quizzes
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/assistants/courses/[courseId]/grades" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/teachers/assistants/courses/course-101/grades");
                            }}
                          >
                            Grades
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/assistants/courses/[courseId]/preview" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/teachers/assistants/courses/course-101/preview");
                            }}
                          >
                            Preview
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                   
                  <li data-sidebar="menu-item" className="menu-item group/collapsible" data-state="closed">
                    <button data-sidebar="menu-button" className="menu-button" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                      <span className="text-rose-600">Web Development</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                    <div className="submenu-container">
                      <ul data-sidebar="menu-sub" className="submenu submenu-rose">
                        <li>
                          <a 
                            href="/teachers/assistants/courses/[courseId]/assignments" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/teachers/assistants/courses/course-202/assignments");
                            }}
                          >
                            Assignments
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/assistants/courses/[courseId]/quizes" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/teachers/assistants/courses/course-202/quizes");
                            }}
                          >
                            Quizzes
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/assistants/courses/[courseId]/grades" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/teachers/assistants/courses/course-202/grades");
                            }}
                          >
                            Grades
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/teachers/assistants/courses/[courseId]/preview" 
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/teachers/assistants/courses/course-202/preview");
                            }}
                          >
                            Preview
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {userType === 'admin' && (
            <div data-sidebar="content" className="sidebar-content">
              <div data-sidebar="group" className="sidebar-group">
                <div data-sidebar="group-label" className="group-label">Administration</div>
                <ul data-sidebar="menu" className="menu">
                  
                  <li data-sidebar="menu-item" className="menu-item">
                    <Link href="/admins/schedules" legacyBehavior>
                      <a data-sidebar="menu-button" className="menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span className="text-pink-600">Schedules</span>
                      </a>
                    </Link>
                  </li>
                  
                  <li data-sidebar="menu-item" className="menu-item">
                    <Link href="/admins/groups" legacyBehavior>
                      <a data-sidebar="menu-button" className="menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="text-sky-600">Groups</span>
                      </a>
                    </Link>
                  </li>

                  <li data-sidebar="menu-item" className="menu-item">
                    <Link href="/admins/auditlog" legacyBehavior >
                      <a data-sidebar="menu-button" className="menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <span className="text-violet-600">Audit Log</span>
                      </a>
                    </Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          )}

          <div data-sidebar="footer" className="sidebar-footer">
            <ul data-sidebar="menu" className="menu">
              <li data-sidebar="menu-item" className="menu-item">
                <button data-sidebar="menu-button" className="menu-button user-button" type="button" id="account-trigger">
                  <Image
                    src="/images/shadcn.jpg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="profile-img"
                  />
                  <div className="user-info">
                    <span className="user-name">shadcn</span>
                    <span className="user-email">m@example.com</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                    <path d="m7 15 5 5 5-5"></path>
                    <path d="m7 9 5-5 5 5"></path>
                  </svg>
                </button>
                <div className="sidebar-dropdown" id="account-dropdown">
                  <div className="sidebar-dropdown-user">
                    <Image
                      src="/images/shadcn.jpg"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="profile-img"
                    />
                    <div className="user-info">
                      <span className="user-name">shadcn</span>
                      <span className="user-email">m@example.com</span>
                    </div>
                  </div>
                  <div className="nav-dropdown-menu">
                    <a 
                      className="menu-item" 
                      href={getSettingsLink()}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(getSettingsLink());
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Account
                    </a>
                    <div className="nav-dropdown-divider"></div>
                    <a 
                      className="menu-item"
                      href={getSettingsLink()}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(getSettingsLink());
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                      </svg>
                      Notifications
                    </a>
                    <div className="nav-dropdown-divider"></div>
                    <Link href="/login" legacyBehavior>
                      <a className="menu-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Log out
                      </a>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button data-sidebar="rail" className="sidebar-rail" aria-label="Toggle Sidebar" title="Toggle Sidebar"></button>
      </div>
    </div>
  );
} 