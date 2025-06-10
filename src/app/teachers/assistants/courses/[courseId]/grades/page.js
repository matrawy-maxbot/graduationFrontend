<<<<<<< HEAD
'use client';

import Image from 'next/image';
import './styles/page.css';
import TableManager from '@/components/TableManager';
import { useRef } from 'react';
import { useImportDialog } from './components/script';

export default function Grades() {
  const tableRef = useRef(null);
  const tableContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const tableManagerRef = useRef(null);

  const {
    isDialogOpen,
    isDragging,
    selectedOption,
    importDialogRef,
    fileInputRef,
    fileDropAreaRef,
    warningMessageRef,
    applyBtnRef,
    handleImportClick,
    handleCloseDialog,
    handleOptionChange,
    handleApplyClick
  } = useImportDialog();

  const tableData = [
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=1',
         name: 'John Doe',
         id: '1234567890'
       },
       date: '2024/02/15',
       grade: '95',
       assignments: '48/50', 
       quizzes: '47/50',
       status: 'excellent'
     },
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=2',  
         name: 'Jane Smith',
         id: '1234567891'
       },
       date: '2024/02/16',
       grade: '88',
       assignments: '45/50', 
       quizzes: '43/50',
       status: 'good'
     },
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=3',  
         name: 'Michael Brown',
         id: '1234567892'
       },
       date: '2024/02/17',
       grade: '75',
       assignments: '40/50', 
       quizzes: '38/50',
       status: 'average'
     },
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=4',  
         name: 'Emily Davis',
         id: '1234567893'
       },
       date: '2024/02/18',
       grade: '65',
       assignments: '35/50', 
       quizzes: '32/50',
       status: 'needs_improvement'
     },
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=5',  
         name: 'Daniel Wilson',
         id: '1234567894'
       },
       date: '2024/02/19',
       grade: '55',
       assignments: '30/50', 
       quizzes: '28/50',
       status: 'failing'
     }
   ];

  const handleDataChange = (data) => {
    console.log('Table data updated:', data);
  };

  // Handle search input focus
  const handleSearchFocus = () => {
     // console.log("handleSearchFocus");
     if (tableManagerRef.current) {
       tableManagerRef.current.focusSearch();
     }
   };

  return (
    <div className="grades-container" ref={tableContainerRef}>
      <div className="grades-header">
        <div className="grades-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          <h1>Grades</h1>
        </div>
        <div className="grades-actions">
          <div className="grades-actions-secondary">
            <button className="action-btn export">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Export as Excel
            </button>
            <button className="action-btn import" onClick={handleImportClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Import
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grades-filters">
        <div className="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="search for student..."
            ref={searchInputRef}
            onFocus={handleSearchFocus}
          />
        </div>
      </div>

      {/* Grades Table */}
      <div className="grades-table-wrapper">
        <table className="grades-table" ref={tableRef}></table>
      </div>

      {/* Import Dialog */}
      <div className={`import-dialog ${isDialogOpen ? 'show' : ''}`} ref={importDialogRef}>
        <div className="dialog-header">
          <h3>Import Excel File</h3>
          <button className="close-dialog" onClick={handleCloseDialog}>&times;</button>
        </div>
        <div className="dialog-content">
          <div className="dialog-body">
            <div className={`file-drop-area ${isDragging ? 'dragover' : ''}`} ref={fileDropAreaRef}>
              <div className="file-drop-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>Drag and drop your Excel file here</p>
                <input type="file" id="fileInput" accept=".xlsx,.xls" hidden ref={fileInputRef} />
              </div>
            </div>
            
            <div className="import-options">
              <h4>Import Options</h4>
              <div className="option-group">
                <div className="option-item">
                  <input 
                    type="radio" 
                    name="importOption" 
                    id="option1" 
                    value="replace" 
                    checked={selectedOption === 'replace'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="option1">
                    <span className="option-title">Replace All Columns</span>
                    <span className="option-description">Delete all existing columns and import new ones from the file</span>
                  </label>
                </div>
                <div className="option-item">
                  <input 
                    type="radio" 
                    name="importOption" 
                    id="option2" 
                    value="add" 
                    checked={selectedOption === 'add'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="option2">
                    <span className="option-title">Add New Columns Only</span>
                    <span className="option-description">Keep existing columns and add only new ones from the file</span>
                  </label>
                </div>
                <div className="option-item">
                  <input 
                    type="radio" 
                    name="importOption" 
                    id="option3" 
                    value="none" 
                    checked={selectedOption === 'none'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="option3">
                    <span className="option-title">No Column Changes</span>
                    <span className="option-description">Import data without adding or removing any columns</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="warning-message" ref={warningMessageRef}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>Warning: This action cannot be undone. All existing columns will be permanently deleted.</span>
            </div>
          </div>
          <div className="dialog-footer">
            <button className="cancel-btn" onClick={handleCloseDialog}>Cancel</button>
            <button className="apply-btn" ref={applyBtnRef} onClick={handleApplyClick} disabled>Apply Changes</button>
          </div>
        </div>
      </div>

      <TableManager
        ref={tableManagerRef}
        containerRef={tableContainerRef}
        rowsPerPage={10}
        onDataChange={handleDataChange}
        initialData={tableData}
        tableRef={tableRef}
        editColumns={true}
        tableHeaders={[
          {
            id: "student",
            label: "Student",
            sortable: true,
            editable: false
          },
          {
            id: "date",
            label: "Date",
            sortable: true,
            editable: false
          },
          {
            id: "grade",
            label: "Grade",
            sortable: true,
            editable: true
          },
          {
            id: "assignments",
            label: "Assignments",
            sortable: true,
            editable: true
          },
          {
            id: "quizzes",
            label: "Quizzes",
            sortable: true,
            editable: true
          },
          {
            id: "status",
            label: "Status",
            sortable: true,
            editable: true
          }
        ]}
        tableCellValuesHTML={{
          "Student": (row) => (
            <div className="student-info">
              <Image 
                src={row.student.avatar} 
                alt="Student Avatar" 
                width={40} 
                height={40} 
                className="student-avatar"
              />
              <div>
                <div className="student-name">{row.student.name}</div>
                <div className="student-id">ID: {row.student.id}</div>
              </div>
            </div>
          ),
          "Date": (row) => row.date,
          "Grade": (row) => row.grade,
          "Assignments": (row) => row.assignments,
          "Quizzes": (row) => row.quizzes,
          "Status": (row) => (
            <div className={`grade-status ${row.status}`}>{row.status}</div>
          )
        }}
        searchOptions={{
          placeholder: "Search by student name or ID...",
          debounceTime: 300,
          caseSensitive: false,
          searchFields: ['student.name', 'student.id'],
          highlightMatches: true,
          showResultsCount: false,
          searchRef: searchInputRef
        }}
      />
    </div>
  );
=======
'use client';

import Image from 'next/image';
import './styles/page.css';
import TableManager from '@/components/TableManager';
import { useRef } from 'react';
import { useImportDialog } from './components/script';

export default function Grades() {
  const tableRef = useRef(null);
  const tableContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const tableManagerRef = useRef(null);

  const {
    isDialogOpen,
    isDragging,
    selectedOption,
    importDialogRef,
    fileInputRef,
    fileDropAreaRef,
    warningMessageRef,
    applyBtnRef,
    handleImportClick,
    handleCloseDialog,
    handleOptionChange,
    handleApplyClick
  } = useImportDialog();

  const tableData = [
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=1',
         name: 'John Doe',
         id: '1234567890'
       },
       date: '2024/02/15',
       grade: '95',
       assignments: '48/50', 
       quizzes: '47/50',
       status: 'excellent'
     },
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=2',  
         name: 'Jane Smith',
         id: '1234567891'
       },
       date: '2024/02/16',
       grade: '88',
       assignments: '45/50', 
       quizzes: '43/50',
       status: 'good'
     },
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=3',  
         name: 'Michael Brown',
         id: '1234567892'
       },
       date: '2024/02/17',
       grade: '75',
       assignments: '40/50', 
       quizzes: '38/50',
       status: 'average'
     },
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=4',  
         name: 'Emily Davis',
         id: '1234567893'
       },
       date: '2024/02/18',
       grade: '65',
       assignments: '35/50', 
       quizzes: '32/50',
       status: 'needs_improvement'
     },
     {
       student: {
         avatar: 'https://i.pravatar.cc/150?img=5',  
         name: 'Daniel Wilson',
         id: '1234567894'
       },
       date: '2024/02/19',
       grade: '55',
       assignments: '30/50', 
       quizzes: '28/50',
       status: 'failing'
     }
   ];

  const handleDataChange = (data) => {
    console.log('Table data updated:', data);
  };

  // Handle search input focus
  const handleSearchFocus = () => {
     // console.log("handleSearchFocus");
     if (tableManagerRef.current) {
       tableManagerRef.current.focusSearch();
     }
   };

  return (
    <div className="grades-container" ref={tableContainerRef}>
      <div className="grades-header">
        <div className="grades-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          <h1>Grades</h1>
        </div>
        <div className="grades-actions">
          <div className="grades-actions-secondary">
            <button className="action-btn export">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Export as Excel
            </button>
            <button className="action-btn import" onClick={handleImportClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Import
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grades-filters">
        <div className="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="search for student..."
            ref={searchInputRef}
            onFocus={handleSearchFocus}
          />
        </div>
      </div>

      {/* Grades Table */}
      <div className="grades-table-wrapper">
        <table className="grades-table" ref={tableRef}></table>
      </div>

      {/* Import Dialog */}
      <div className={`import-dialog ${isDialogOpen ? 'show' : ''}`} ref={importDialogRef}>
        <div className="dialog-header">
          <h3>Import Excel File</h3>
          <button className="close-dialog" onClick={handleCloseDialog}>&times;</button>
        </div>
        <div className="dialog-content">
          <div className="dialog-body">
            <div className={`file-drop-area ${isDragging ? 'dragover' : ''}`} ref={fileDropAreaRef}>
              <div className="file-drop-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>Drag and drop your Excel file here</p>
                <input type="file" id="fileInput" accept=".xlsx,.xls" hidden ref={fileInputRef} />
              </div>
            </div>
            
            <div className="import-options">
              <h4>Import Options</h4>
              <div className="option-group">
                <div className="option-item">
                  <input 
                    type="radio" 
                    name="importOption" 
                    id="option1" 
                    value="replace" 
                    checked={selectedOption === 'replace'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="option1">
                    <span className="option-title">Replace All Columns</span>
                    <span className="option-description">Delete all existing columns and import new ones from the file</span>
                  </label>
                </div>
                <div className="option-item">
                  <input 
                    type="radio" 
                    name="importOption" 
                    id="option2" 
                    value="add" 
                    checked={selectedOption === 'add'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="option2">
                    <span className="option-title">Add New Columns Only</span>
                    <span className="option-description">Keep existing columns and add only new ones from the file</span>
                  </label>
                </div>
                <div className="option-item">
                  <input 
                    type="radio" 
                    name="importOption" 
                    id="option3" 
                    value="none" 
                    checked={selectedOption === 'none'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="option3">
                    <span className="option-title">No Column Changes</span>
                    <span className="option-description">Import data without adding or removing any columns</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="warning-message" ref={warningMessageRef}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>Warning: This action cannot be undone. All existing columns will be permanently deleted.</span>
            </div>
          </div>
          <div className="dialog-footer">
            <button className="cancel-btn" onClick={handleCloseDialog}>Cancel</button>
            <button className="apply-btn" ref={applyBtnRef} onClick={handleApplyClick} disabled>Apply Changes</button>
          </div>
        </div>
      </div>

      <TableManager
        ref={tableManagerRef}
        containerRef={tableContainerRef}
        rowsPerPage={10}
        onDataChange={handleDataChange}
        initialData={tableData}
        tableRef={tableRef}
        editColumns={true}
        tableHeaders={[
          {
            id: "student",
            label: "Student",
            sortable: true,
            editable: false
          },
          {
            id: "date",
            label: "Date",
            sortable: true,
            editable: false
          },
          {
            id: "grade",
            label: "Grade",
            sortable: true,
            editable: true
          },
          {
            id: "assignments",
            label: "Assignments",
            sortable: true,
            editable: true
          },
          {
            id: "quizzes",
            label: "Quizzes",
            sortable: true,
            editable: true
          },
          {
            id: "status",
            label: "Status",
            sortable: true,
            editable: true
          }
        ]}
        tableCellValuesHTML={{
          "Student": (row) => (
            <div className="student-info">
              <Image 
                src={row.student.avatar} 
                alt="Student Avatar" 
                width={40} 
                height={40} 
                className="student-avatar"
              />
              <div>
                <div className="student-name">{row.student.name}</div>
                <div className="student-id">ID: {row.student.id}</div>
              </div>
            </div>
          ),
          "Date": (row) => row.date,
          "Grade": (row) => row.grade,
          "Assignments": (row) => row.assignments,
          "Quizzes": (row) => row.quizzes,
          "Status": (row) => (
            <div className={`grade-status ${row.status}`}>{row.status}</div>
          )
        }}
        searchOptions={{
          placeholder: "Search by student name or ID...",
          debounceTime: 300,
          caseSensitive: false,
          searchFields: ['student.name', 'student.id'],
          highlightMatches: true,
          showResultsCount: false,
          searchRef: searchInputRef
        }}
      />
    </div>
  );
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
}