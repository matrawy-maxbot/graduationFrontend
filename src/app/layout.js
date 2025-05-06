import "@/app/globals.css";
import SidebarScript from "@/components/SidebarScript";
import Image from 'next/image'

export const metadata = {
  title: "Digital Collage Platform",
  description: "Digital Collage Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          
      </head>
      <body>
          <div className="group/sidebar-wrapper" style={{ "--sidebar-width": "16rem", "--sidebar-width-icon": "3rem" }}>
              <div className="sidebar group peer" data-state="collapsed" data-collapsible="" data-variant="sidebar" data-side="left">
                  <div className="sidebar-container">
                      <div data-sidebar="sidebar" className="sidebar-inner">
                          <div data-sidebar="header" className="sidebar-header">
                              <ul data-sidebar="menu" className="menu">
                                  <li data-sidebar="menu-item" className="group/menu-item">
                                      <button data-sidebar="menu-button" className="menu-button main" type="button">
                                          <div className="logo-container">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="M7 2h10"></path>
                                                  <path d="M5 6h14"></path>
                                                  <rect width="18" height="12" x="3" y="10" rx="2"></rect>
                                              </svg>
                                          </div>
                                          <div className="logo-text">
                                              <span className="title">Home</span>
                                              <span className="subtitle">Schedule</span>
                                          </div>
                                      </button>
                                  </li>
                                  <li data-sidebar="menu-item" className="group/menu-item inbox filled">
                                      <button data-sidebar="menu-button" className="menu-button main inbox" type="button">
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
                                      </button>
                                  </li>
                              </ul>
                          </div>

                          <div data-sidebar="content" className="sidebar-content">
                              <div data-sidebar="group" className="sidebar-group">
                                  <div data-sidebar="group-label" className="group-label">Platform</div>
                                  <ul data-sidebar="menu" className="menu">
                                      <li data-sidebar="menu-item" className="menu-item group/collapsible" data-state="open">
                                          <button data-sidebar="menu-button" className="menu-button" type="button">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="m7 11 2-2-2-2"></path>
                                                  <path d="M11 13h4"></path>
                                                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                              </svg>
                                              <span>Playground</span>
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                                                  <path d="m9 18 6-6-6-6"></path>
                                              </svg>
                                          </button>
                                          <div className="submenu-container" data-state="open">
                                              <ul data-sidebar="menu-sub" className="submenu">
                                                  <li><a href="#" className="submenu-item">History</a></li>
                                                  <li><a href="#" className="submenu-item">Starred</a></li>
                                                  <li><a href="#" className="submenu-item">Settings</a></li>
                                              </ul>
                                          </div>
                                      </li>
                                      <li data-sidebar="menu-item" className="menu-item">
                                          <button data-sidebar="menu-button" className="menu-button" type="button">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="M12 8V4H8"></path>
                                                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                                                  <path d="M2 14h2"></path>
                                                  <path d="M20 14h2"></path>
                                                  <path d="M15 13v2"></path>
                                                  <path d="M9 13v2"></path>
                                              </svg>
                                              <span>Models</span>
                                          </button>
                                      </li>
                                      <li data-sidebar="menu-item" className="menu-item">
                                          <button data-sidebar="menu-button" className="menu-button" type="button">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="M12 7v14"></path>
                                                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                                              </svg>
                                              <span>Documentation</span>
                                          </button>
                                      </li>
                                  </ul>
                              </div>

                              <div data-sidebar="group" className="sidebar-group">
                                  <div data-sidebar="group-label" className="group-label">Projects</div>
                                  <ul data-sidebar="menu" className="menu">
                                      <li data-sidebar="menu-item" className="menu-item group/collapsible" data-state="open">
                                          <button data-sidebar="menu-button" className="menu-button" type="button">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="m7 11 2-2-2-2"></path>
                                                  <path d="M11 13h4"></path>
                                                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                              </svg>
                                              <span>Playground</span>
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                                                  <path d="m9 18 6-6-6-6"></path>
                                              </svg>
                                          </button>
                                          <div className="submenu-container" data-state="open">
                                              <ul data-sidebar="menu-sub" className="submenu">
                                                  <li><a href="#" className="submenu-item">History</a></li>
                                                  <li><a href="#" className="submenu-item">Starred</a></li>
                                                  <li><a href="#" className="submenu-item">Settings</a></li>
                                              </ul>
                                          </div>
                                      </li>
                                      <li data-sidebar="menu-item" className="menu-item">
                                          <button data-sidebar="menu-button" className="menu-button" type="button">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="M12 8V4H8"></path>
                                                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                                                  <path d="M2 14h2"></path>
                                                  <path d="M20 14h2"></path>
                                                  <path d="M15 13v2"></path>
                                                  <path d="M9 13v2"></path>
                                              </svg>
                                              <span>Models</span>
                                          </button>
                                      </li>
                                      <li data-sidebar="menu-item" className="menu-item">
                                          <button data-sidebar="menu-button" className="menu-button" type="button">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="M12 7v14"></path>
                                                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                                              </svg>
                                              <span>Documentation</span>
                                          </button>
                                      </li>
                                  </ul>
                              </div>
                          </div>

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
                                              <a href="#" className="menu-item">
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                      <circle cx="12" cy="7" r="4"></circle>
                                                  </svg>
                                                  Account
                                              </a>
                                              <div className="nav-dropdown-divider"></div>
                                              <a href="#" className="menu-item">
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                                                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                                                  </svg>
                                                  Notifications
                                              </a>
                                              <div className="nav-dropdown-divider"></div>
                                              <a href="#" className="menu-item">
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                      <polyline points="16 17 21 12 16 7"></polyline>
                                                      <line x1="21" y1="12" x2="9" y2="12"></line>
                                                  </svg>
                                                  Log out
                                              </a>
                                          </div>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <button data-sidebar="rail" className="sidebar-rail" aria-label="Toggle Sidebar" title="Toggle Sidebar"></button>
                  </div>
              </div>

              <main className="main-content">
                  {/* Breadcrumb Navigation */}
                  <nav className="breadcrumb-nav">
                      <div className="breadcrumb-nav-inner">
                          <button className="sidebar-toggle" aria-label="Toggle Sidebar">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                  <line x1="9" y1="3" x2="9" y2="21"></line>
                              </svg>
                          </button>
                          <a href="#">Student</a>
                          <span className="breadcrumb-separator">›</span>
                          <span className="current">Courses</span>
                      </div>
                      <div className="tabs">
                          <button className="tab active">Dashboard</button>
                          <button className="tab filled">Inbox<span className="notification-badge">3</span></button>
                      </div>
                      <div className="nav-controls">
                          <div className="right-controls">
                              <button className="theme-toggle">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" id="Layer_2" data-name="Layer 2" viewBox="0 0 29 29">
                                      <g id="Layer_1-2" data-name="Layer 1">
                                          <path className="cls-1" d="M14.5.5c-3.87,3.87-3.87,10.13,0,14,3.87,3.87,10.13,3.87,14,0,0,7.73-6.27,14-14,14S.5,22.23.5,14.5,6.77.5,14.5.5Z"/>
                                      </g>
                                  </svg>
                              </button>
                              <div className="notifications-wrapper">
                                  <button className="notifications filled" id="notifications-trigger">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" id="Layer_2" data-name="Layer 2" viewBox="0 0 31.5 34.84" style={{ strokeWidth: "2.5px" }}>
                                          <g id="Layer_1-2" data-name="Layer 1">
                                              <g>
                                                  <path className="cls-1" d="M5.75,10.75C5.75,5.23,10.23.75,15.75.75s10,4.48,10,10c0,11.67,5,15,5,15H.75s5-3.33,5-15"/>
                                                  <path className="cls-1" d="M12.92,32.42c.86,1.56,2.83,2.14,4.39,1.28.54-.3.98-.74,1.28-1.28"/>
                                              </g>
                                          </g>
                                      </svg>
                                      <span className="notification-badge">3</span>
                                  </button>
                                  <div className="notifications-dropdown" id="notifications-dropdown">
                                      <div className="notifications-header">
                                          <h3>Notification</h3>
                                          <button className="close-btn">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="M18 6L6 18M6 6l12 12"/>
                                              </svg>
                                          </button>
                                      </div>
                                      <div className="notifications-tabs">
                                          <button className="notification-tab filled active" data-tab="general">General<span className="count">2</span></button>
                                          <button className="notification-tab" data-tab="teams">Teams<span className="count">1</span></button>
                                          <button className="notification-tab" data-tab="documents">Documents<span className="count">3</span></button>
                                      </div>
                                      <div className="notifications-content">
                                          <div className="tab-content active" data-content="general">
                                              <div className="notification-list">
                                                  <div className="notification-item">
                                                      <div className="avatar-wrapper unread">
                                                          <Image 
                                                            src="/images/shadcn.jpg" 
                                                            alt="User" 
                                                            width={40} 
                                                            height={40}
                                                            className="user-avatar" 
                                                          />
                                                          <span className="unread-badge"></span>
                                                      </div>
                                                      <div className="notification-info">
                                                          <p><strong>Sulastri Silami</strong> requests permission to change <strong>Project - Nganter App</strong></p>
                                                          <span className="meta">Project • 5 min ago</span>
                                                      </div>
                                                  </div>
                                                  <div className="notification-item">
                                                      <div className="avatar-wrapper">
                                                          <Image 
                                                            src="/images/shadcn.jpg" 
                                                            alt="User" 
                                                            width={40} 
                                                            height={40}
                                                            className="user-avatar" 
                                                          />
                                                          <span className="unread-badge"></span>
                                                      </div>
                                                      <div className="notification-info">
                                                          <p><strong>Michael Dandi</strong> requests permission to change <strong>Project - Andromeda Website</strong></p>
                                                          <span className="meta">Project • 21 min ago</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="tab-content" data-content="teams">
                                              <div className="notification-list">
                                                  <div className="notification-item">
                                                      <div className="avatar-wrapper unread">
                                                          <Image 
                                                            src="/images/shadcn.jpg" 
                                                            alt="User" 
                                                            width={40} 
                                                            height={40}
                                                            className="user-avatar" 
                                                          />
                                                          <span className="unread-badge"></span>
                                                      </div>
                                                      <div className="notification-info">
                                                          <p><strong>Team Alpha</strong> has added you as a member</p>
                                                          <span className="meta">Teams • 1 hour ago</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="tab-content" data-content="documents">
                                              <div className="notification-list">
                                                  <div className="no-notifications">
                                                      <p>There is no notifications yet</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="profile" id="header-profile">
                                  <Image 
                                    src="/images/shadcn.jpg" 
                                    alt="Profile" 
                                    width={40} 
                                    height={40}
                                    className="profile-img" 
                                  />
                                  <div className="nav-dropdown" id="header-dropdown">
                                      <div className="nav-dropdown-user">
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
                                          <a href="#" className="menu-item">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                  <circle cx="12" cy="7" r="4"></circle>
                                              </svg>
                                              Account
                                          </a>
                                          <div className="nav-dropdown-divider"></div>
                                          <a href="#" className="menu-item">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                                                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                                              </svg>
                                              Notifications
                                          </a>
                                          <div className="nav-dropdown-divider"></div>
                                          <a href="#" className="menu-item">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                  <polyline points="16 17 21 12 16 7"></polyline>
                                                  <line x1="21" y1="12" x2="9" y2="12"></line>
                                              </svg>
                                              Log out
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </nav>

                  {/* Content Area */}
                  <div className="content">
                      {children}
                  </div>
              </main>
          </div>
          
          {/* إضافة مكون SidebarScript هنا */}
          <SidebarScript />
      </body>
    </html>
  );
}
