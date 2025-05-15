'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './styles/page.css';
import ScheduleDialog from './components/ScheduleDialog';
import { useScheduleDialog } from './components/script';

export default function Schedules() {
  const scheduleDialogHookData = useScheduleDialog();
  const { 
    isDialogOpen, 
    openDialog,
    closeDialog,
    scheduleType, 
    setScheduleType, 
    scheduleTitle, 
    setScheduleTitle, 
    departments, 
    setDepartments, 
    groups, 
    setGroups, 
    timePeriods, 
    setTimePeriods, 
    scheduleData: tableDataForDialog,
    setScheduleData,
    resizingCell,
    handleCellClick, 
    handleCellDoubleClick, 
    addSession, 
    addDynamicRow,
    startResize,
    getCellSession, 
    increaseColspan, 
    increaseRowspan, 
    decreaseColspan, 
    decreaseRowspan,
    resetSelection, 
    editMode,
    setEditMode,
    handleSessionDrop, 
    tableScale, 
    zoomIn, 
    zoomOut,
    deleteSession
  } = scheduleDialogHookData;
  
  const [showNotification, setShowNotification] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: "Software Engineering",
      image: "/images/schedule.jpg",
      createdAt: "11/11/2025",
      lastEditAt: "11/11/2025 11:10 AM",
      author: {
        name: "DR. Ahmed Emad",
        avatar: "/images/shadcn.jpg"
      },
      scheduleData: {
        weekly: {
          Saturday: Array(9).fill(null),
          Sunday: Array(9).fill(null),
          Monday: Array(9).fill(null),
          Tuesday: Array(9).fill(null),
          Wednesday: Array(9).fill(null),
          Thursday: Array(9).fill(null),
        },
        dynamic: []
      },
      scheduleType: 'weekly'
    },
    {
      id: 2,
      title: "Software Engineering",
      image: "/images/schedule2.png",
      createdAt: "11/11/2025",
      author: {
        name: "DR. Ahmed Emad",
        avatar: "/images/shadcn.jpg"
      },
      scheduleData: {
        weekly: {
          Saturday: Array(9).fill(null),
          Sunday: Array(9).fill(null),
          Monday: Array(9).fill(null),
          Tuesday: Array(9).fill(null),
          Wednesday: Array(9).fill(null),
          Thursday: Array(9).fill(null),
        },
        dynamic: []
      },
      scheduleType: 'weekly'
    }
  ]);

  // Handle click on existing schedule card
  const handleScheduleClick = (schedule) => {
    setIsEditMode(true);
    setCurrentScheduleId(schedule.id);
    
    // Load schedule data into dialog
    setScheduleTitle(schedule.title);
    setScheduleType(schedule.scheduleType || 'weekly');
    setScheduleData(schedule.scheduleData || tableDataForDialog);
    
    // Open dialog in edit mode
    openDialog();
  };

  // Handle new schedule creation
  const handleCreateNewClick = () => {
    // Reset all fields for new schedule
    setIsEditMode(false);
    setCurrentScheduleId(null);
    setScheduleTitle('');
    setScheduleType('weekly');
    setScheduleData({
      weekly: {
        Saturday: Array(9).fill(null),
        Sunday: Array(9).fill(null),
        Monday: Array(9).fill(null),
        Tuesday: Array(9).fill(null),
        Wednesday: Array(9).fill(null),
        Thursday: Array(9).fill(null),
      },
      dynamic: []
    });
    
    openDialog();
  };

  // Handle dialog close with success
  const handleDialogClose = (saved = false) => {
    closeDialog();
    
    if (saved) {
      if (isEditMode && currentScheduleId) {
        // Update existing schedule
        const updatedSchedules = schedules.map(schedule => {
          if (schedule.id === currentScheduleId) {
            return {
              ...schedule,
              title: scheduleTitle,
              lastEditAt: new Date().toLocaleString(),
              scheduleData: tableDataForDialog,
              scheduleType: scheduleType
            };
          }
          return schedule;
        });
        
        setSchedules(updatedSchedules);
        
        // Show success notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } 
      else if (scheduleTitle) {
        // Create new schedule entry
        const newSchedule = {
          id: schedules.length + 1,
          title: scheduleTitle,
          image: "/images/schedule.jpg", // Default image
          createdAt: new Date().toLocaleDateString(),
          lastEditAt: new Date().toLocaleString(),
          author: {
            name: "Admin User",
            avatar: "/images/shadcn.jpg"
          },
          scheduleData: tableDataForDialog,
          scheduleType: scheduleType
        };
        
        // Add to schedules list
        setSchedules([...schedules, newSchedule]);
        
        // Show success notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }
  };
  
  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1 className="page-title">Schedule</h1>
        <div className="header-actions">
          {/* <button className="action-btn export">
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
          </button> */}
        </div>
      </div>
      
      {/* Success Notification */}
      {showNotification && (
        <div className="notification success">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>{isEditMode ? "Schedule updated successfully!" : "Schedule created successfully!"}</span>
        </div>
      )}
      
      <div className="schedule-grid">
        {/* Schedule Cards */}
        {schedules.map((schedule) => (
          <div key={schedule.id} className="schedule-card" onClick={() => handleScheduleClick(schedule)}>
            <div className="schedule-image">
                <Image src={schedule.image} alt={schedule.title} width={300} height={200} />
            </div>
            <div className="schedule-content">
                <h2 className="schedule-title">{schedule.title}</h2>
                <div className="footer">
                    <div className="schedule-meta">
                        <div className="meta-item">
                            <span className="meta-label">Created at</span>
                            <span className="meta-value">{schedule.createdAt}</span>
                        </div>
                        {schedule.lastEditAt && (
                          <div className="meta-item">
                              <span className="meta-label">Last edit at</span>
                              <span className="meta-value">{schedule.lastEditAt}</span>
                          </div>
                        )}
                    </div>
                    <div className="schedule-author">
                        <Image src={schedule.author.avatar} alt={schedule.author.name} className="author-avatar" width={40} height={40} />
                        <span className="author-name">{schedule.author.name}</span>
                    </div>
                </div>
            </div>
          </div>
        ))}

        {/* Create New Schedule Card */}
        <div className="create-schedule-card" onClick={handleCreateNewClick}>
            <svg className="create-schedule-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="M8 12h8"></path>
            </svg>
            <h2 className="create-schedule-title">Create New Schedule</h2>
        </div>
      </div>

      {/* Schedule Dialog */}
      <ScheduleDialog 
        isOpen={isDialogOpen} 
        onClose={handleDialogClose} 
        scheduleType={scheduleType}
        setScheduleType={setScheduleType}
        scheduleTitle={scheduleTitle}
        setScheduleTitle={setScheduleTitle}
        departments={departments}
        setDepartments={setDepartments}
        groups={groups}
        setGroups={setGroups}
        timePeriods={timePeriods}
        setTimePeriods={setTimePeriods}
        tableData={tableDataForDialog}
        resizingCell={resizingCell}
        handleCellClick={handleCellClick}
        handleCellDoubleClick={handleCellDoubleClick}
        addSession={addSession}
        addDynamicRow={addDynamicRow}
        startResize={startResize}
        getCellSession={getCellSession}
        increaseColspan={increaseColspan}
        increaseRowspan={increaseRowspan}
        decreaseColspan={decreaseColspan}
        decreaseRowspan={decreaseRowspan}
        resetSelection={resetSelection}
        editMode={editMode}
        setEditMode={setEditMode}
        handleSessionDrop={handleSessionDrop}
        tableScale={tableScale}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        deleteSession={deleteSession}
        isEditMode={isEditMode}
      />
    </div>
  );
}