<<<<<<< HEAD
'use client';

import Image from 'next/image';
import './styles/page.css';
import TableManager from '@/components/TableManager';
import { useRef, useState, useEffect } from 'react';
import { useImportDialog } from './components/script';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// Error/Success Modal Component
const StatusModal = ({ isOpen, onClose, title, message, details, type = "error", confirmAction = null }) => {
  if (!isOpen) return null;
  
  const isConfirmation = type === "confirm";
  
  // Determine the proper button text based on the title
  const getActionButtonText = () => {
    if (title.toLowerCase().includes("delete")) {
      return "Delete";
    }
    if (title.toLowerCase().includes("save")) {
      return "Save";
    }
    return title; // Default to the title if no specific action is detected
  };
  
  return (
    <div className="status-modal-overlay">
      <div className="status-modal" data-type={type}>
        <div className="status-modal-header">
          <h3>{title}</h3>
        </div>
        <div className="status-modal-body">
          <div className="status-modal-message">
            <p>{message}</p>
            {details && (
              <div className="status-modal-details">
                <h4>Details:</h4>
                <pre>{details}</pre>
              </div>
            )}
          </div>
        </div>
        <div className="status-modal-footer">
          {isConfirmation ? (
            <>
              <button 
                className="status-modal-button cancel" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className="status-modal-button delete" 
                onClick={() => {
                  if (confirmAction) confirmAction();
                  onClose();
                }}
              >
                {getActionButtonText()}
              </button>
            </>
          ) : (
            <button 
              className="status-modal-button primary" 
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Grades() {
  const tableRef = useRef(null);
  const tableContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const tableManagerRef = useRef(null);
  const params = useParams();
  const router = useRouter();
  
  // Error modal state
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    details: "",
    type: "error", // "error" or "success"
    confirmAction: null
  });
  
  // Show error modal function
  const showErrorModal = (title, message, details = "", type = "error", confirmAction = null) => {
    setErrorModal({
      isOpen: true,
      title,
      message,
      details,
      type,
      confirmAction
    });
  };
  
  // Close error modal function
  const closeErrorModal = () => {
    setErrorModal({
      ...errorModal,
      isOpen: false
    });
  };
  
  // Show success modal function
  const showSuccessModal = (title, message, details = "") => {
    showErrorModal(title, message, details, "success");
  };
  
  // Show confirmation modal function
  const showConfirmModal = (title, message, confirmAction) => {
    showErrorModal(title, message, "", "confirm", confirmAction);
  };
  
  // Estados para manejar la carga y los datos del curso
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [students, setStudents] = useState([]);
  const [tableData, setTableData] = useState([]);
  
  // States for saving changes
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tableModified, setTableModified] = useState(false);
  const [lastTableData, setLastTableData] = useState(null);
  const [originalTableData, setOriginalTableData] = useState(null);
  const [originalTableHeaders, setOriginalTableHeaders] = useState(null);
  
  // Track column renames to ensure persistence across edits
  const [columnMappings, setColumnMappings] = useState({});

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

  // Fetch course data and students
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const accessToken = getCookie('access_token');
        
        if (!accessToken) {
          router.push('/login');
          return;
        }
        
        const courseId = params.courseId;
        
        // Fetch course and student data
        const courseResponse = await axios.get(`http://localhost:3001/api/v1/doctors/me/courses/${courseId}/details`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        const { course, students } = courseResponse.data.data || courseResponse.data || {};
        
        // Create instructor object using first assistant's data if available
        if (course && course.assistantDetails && course.assistantDetails.length > 0) {
          const assistant = course.assistantDetails[0];
          course.instructor = {
            avatar: assistant.profileimage || "/images/shadcn.jpg",
            name: `${assistant.firstname} ${assistant.secondname} ${assistant.lastname}`,
            title: "Assistant"
          };
        }
        
        // Fetch saved table data
        try {
          const tableResponse = await axios.get(`http://localhost:3001/api/v1/course-dynamic-tables/course/${courseId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          
          const savedTableData = tableResponse.data.data || tableResponse.data;
          
          if (savedTableData && savedTableData.values && savedTableData.values.length > 0) {
            // Create a map of student data by ID for easy lookup
            const studentMap = {};
            students.forEach(student => {
              studentMap[student.id] = {
                avatar: student.profileimage || "/images/shadcn.jpg",
                name: `${student.firstname} ${student.secondname} ${student.lastname}`,
                id: student.id
              };
            });
            
            // Convert saved values to table rows with student objects
            const initialTableData = savedTableData.values.map(row => {
              const studentInfo = studentMap[row.student_id] || {
                avatar: "/images/shadcn.jpg", 
                name: "Unknown Student",
                id: row.student_id
              };
              
              // Extract student_id and create the row data
              const { student_id, ...rowData } = row;
              return {
                student: studentInfo,
                ...rowData
              };
            });
            
            setTableData(initialTableData);
            setLastTableData(initialTableData);
            // Store original data to allow reverting changes
            setOriginalTableData(JSON.parse(JSON.stringify(initialTableData)));
            
            // Set headers from saved data if available
            if (savedTableData.headers && savedTableData.headers.length > 0) {
              // Get all keys from the first row data except 'student'
              const dataKeys = initialTableData.length > 0 
                ? Object.keys(initialTableData[0]).filter(key => key !== 'student')
                : [];
                
              // Convert saved headers to tableHeaders format
              const savedHeaders = [
                // First header is always 'Student'
                {
                  id: "student",
                  label: savedTableData.headers[0] || "Student",
                  sortable: true,
                  editable: false
                }
              ];
              
              // Process each header after "Student"
              for (let i = 1; i < savedTableData.headers.length; i++) {
                const headerLabel = savedTableData.headers[i];
                const headerKey = headerLabel.toLowerCase().replace(/\s+/g, '_');
                
                // Try to find a matching key in the data
                let matchingKey = headerKey;
                
                // If the key doesn't exist in the data, look for alternative keys
                if (initialTableData.length > 0 && initialTableData[0][matchingKey] === undefined) {
                  // For cases like "status_Status" in headers but "status" in values
                  // Try to find a key that starts with the same prefix
                  const prefix = headerKey.split('_')[0];
                  const possibleKey = Object.keys(initialTableData[0]).find(k => 
                    k === prefix || k.startsWith(prefix + '_')
                  );
                  
                  if (possibleKey) {
                    matchingKey = possibleKey;
                  }
                }
                
                savedHeaders.push({
                  id: matchingKey,
                  label: headerLabel,
                  sortable: true,
                  editable: true
                });
              }
              
              setTableHeaders(savedHeaders);
              setOriginalTableHeaders(JSON.parse(JSON.stringify(savedHeaders)));
            }
          } else {
            // If no saved data, use the default structure
            const defaultData = students.map(student => { 
              return {
                student: {
                  avatar: student.profileimage || "/images/shadcn.jpg",
                  name: `${student.firstname} ${student.secondname} ${student.lastname}`,
                  id: student.id
                },
                date: '2024/02/16',
                grade: '88',
                assignments: '45/50',
                quizzes: '43/50',
                status: 'good'
              }
            });
            
            setTableData(defaultData);
            setLastTableData(defaultData);
            // Store original data to allow reverting changes
            setOriginalTableData(JSON.parse(JSON.stringify(defaultData)));
          }
        } catch (tableError) {
          console.error('Error fetching table data:', tableError);
          // If table fetch fails, use default data structure
          setTableData(students.map(student => { 
            return {
              student: {
                avatar: student.profileimage || "/images/shadcn.jpg",
                name: `${student.firstname} ${student.secondname} ${student.lastname}`,
                id: student.id
              },
              date: '2024/02/16',
              grade: '88',
              assignments: '45/50',
              quizzes: '43/50',
              status: 'good'
            }
          }));
        }
        
        setCourseData(course);
        setStudents(students || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err.response?.data?.message || 'Error al cargar los datos del curso');
        setLoading(false);
      }
    };
    
    fetchCourseDetails();
  }, [params.courseId, router]);

  // Dynamically create tableHeaders based on the first row of data
  const [tableHeaders, setTableHeaders] = useState([
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
      editable: true
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
  ]);

  // Update tableHeaders when tableData changes
  useEffect(() => {
    if (tableData.length > 0) {
      // Get the first row to extract all possible columns
      const firstRow = tableData[0];
      
      // Create headers for each key in the first row (except student which is already defined)
      const dynamicHeaders = Object.keys(firstRow)
        .filter(key => key !== 'student')
        .map(key => ({
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
          sortable: true,
          editable: key !== 'date' // Make all columns except student and date editable
        }));
      
      // Always keep student as the first column
      setTableHeaders([
        {
          id: "student",
          label: "Student",
          sortable: true,
          editable: false
        },
        ...dynamicHeaders
      ]);
    }
  }, [tableData]);

  const handleDataChange = (data) => {
    console.log('Table data updated in handleDataChange:', data);
    
    // Ensure data is valid before setting it
    if (!data) {
      console.warn("Received invalid data in handleDataChange:", data);
      return;
    }
    
    // If this is the first change and we don't have originalTableData yet,
    // store the current state as original
    if (!originalTableData) {
      setOriginalTableData(JSON.parse(JSON.stringify(tableData)));
    }
    
    // If this is the first change and we don't have originalTableHeaders yet,
    // store the current headers as original
    if (!originalTableHeaders) {
      setOriginalTableHeaders(JSON.parse(JSON.stringify(tableHeaders)));
    }
    
    setLastTableData(data);
    setTableData(data);
    setTableModified(true);
    
    // Show save dialog when data changes
    if (!showSaveDialog) {
      setShowSaveDialog(true);
    }
  };

  // Function to save the table data
  const handleSaveChanges = async () => {
    console.log("Save button clicked, lastTableData:", lastTableData);
    console.log("tableModified:", tableModified);
    console.log("courseData:", courseData);
    console.log("tableHeaders:", tableHeaders);
    console.log("Column mappings:", columnMappings);
    
    // Validate required data
    if (!courseData) {
      console.error("Missing course data for save");
      showErrorModal(
        "Save Error", 
        "Cannot save: Missing course data",
        "Please refresh the page and try again."
      );
      return;
    }

    // Use lastTableData if available, otherwise fallback to tableData
    const dataToSave = lastTableData || tableData;
    console.log("Data to save:", JSON.stringify(dataToSave));
    
    // Enhanced validation - make sure we have at least one row with student data
    if (!dataToSave || !Array.isArray(dataToSave)) {
      console.error("Missing table data for save:", dataToSave);
      showErrorModal(
        "Save Error", 
        "Cannot save: Missing or invalid table data",
        "The table appears to be empty or contains invalid data. Please add some data before saving."
      );
      return;
    }
    
    // Check for student data in each row
    console.log("Checking student data in rows:", dataToSave.map(row => row.student));
    
    // Make sure we have at least one row with a valid student
    const validRows = dataToSave.filter(row => row && row.student && row.student.id);
    console.log("Valid rows count:", validRows.length);
    console.log("Valid rows:", validRows);
    
    if (validRows.length === 0) {
      console.error("No valid student rows found in the data");
      showErrorModal(
        "Save Error", 
        "Cannot save: No valid student data",
        "The table doesn't contain any valid student entries. Please add at least one student row."
      );
      return;
    }
    
    // Check for duplicate header labels
    const headerLabels = tableHeaders.map(header => header.label);
    const duplicateHeaders = findDuplicateHeaders(headerLabels);
    
    if (duplicateHeaders.length > 0) {
      // Group duplicate headers by their lowercase value for clearer presentation
      const lowerCaseGroups = new Map();
      
      tableHeaders.forEach((header, idx) => {
        const lowerCase = header.label.toLowerCase();
        if (!lowerCaseGroups.has(lowerCase)) {
          lowerCaseGroups.set(lowerCase, { 
            originalValues: [header.label],
            indices: [idx]
          });
        } else {
          const existing = lowerCaseGroups.get(lowerCase);
          existing.originalValues.push(header.label);
          existing.indices.push(idx);
        }
      });
      
      // Filter to keep only duplicate groups
      const duplicateGroups = Array.from(lowerCaseGroups.entries())
        .filter(([key, values]) => values.originalValues.length > 1)
        .map(([key, values]) => values.originalValues);
      
      // Create a readable list of duplicate groups
      const duplicateList = duplicateGroups.map((group, index) => {
        return `Group ${index + 1}: ${group.map(header => `"${header}"`).join(', ')}`;
      }).join('\n');
      
      // English-only error message
      const errorMessage = duplicateGroups.length === 1
        ? `Found a group of duplicate column headers (case-insensitive match).`
        : `Found ${duplicateGroups.length} groups of duplicate column headers.`;
      
      const errorDetails = `${duplicateList}\n\nPlease modify duplicate headers to make each header unique before saving.`;
      
      console.error("Duplicate headers found:", duplicateHeaders);
      console.error("Duplicate groups:", duplicateGroups);
      
      // Show error in professional modal instead of alert
      showErrorModal(
        "Duplicate Headers Error", 
        errorMessage,
        errorDetails
      );
      
      // Highlight the duplicated headers in the UI
      if (tableManagerRef.current && tableManagerRef.current.refreshTable) {
        setTimeout(() => {
          // Refresh the table to ensure latest UI state
          tableManagerRef.current.refreshTable();
          
          // Add a visual indication of the issue (you could extend this further)
          console.log("Consider visually highlighting these headers:", duplicateHeaders);
        }, 100);
      }
      
      return;
    }
    
    try {
      setIsSaving(true);
      const accessToken = getCookie('access_token');
      
      if (!accessToken) {
        router.push('/login');
        return;
      }
      
      // Use the headers from tableHeaders state, which is updated when column names change or columns are deleted
      console.log("Header labels from tableHeaders:", headerLabels);
      
      // Create a mapping from column ID to header label (column name)
      const columnIdToLabelMap = {};
      tableHeaders.forEach(header => {
        columnIdToLabelMap[header.id] = header.label;
      });
      
      console.log("Column ID to Label mapping:", columnIdToLabelMap);
      
      // Format data for saving - extract only IDs from student objects and keep other values
      const formattedValues = validRows.map(row => {
        const { student, ...otherValues } = row;
        
        // Create a new values object with transformed keys, removing deleted columns
        const transformedValues = {};
        
        // Log to help debug
        console.log("Processing row with student:", student);
        console.log("Other values:", otherValues);
        
        // Map each key to the corresponding header label if exists
        // This will automatically skip deleted columns since they won't be in the columnIdToLabelMap
        Object.keys(otherValues).forEach(key => {
          // Only include values for columns that still exist in the headers
          if (columnIdToLabelMap[key]) {
            // First check if we have a mapping for this column, indicating it was renamed
            const columnLabel = columnMappings[key] || columnIdToLabelMap[key];
            const snakeCaseKey = columnLabel.toLowerCase().replace(/\s+/g, '_');
            
            // Store the value using the snake_case label as the key
            transformedValues[snakeCaseKey] = otherValues[key];
            
            // Log for debugging
            console.log(`Transformed key: ${key} → ${snakeCaseKey} (from label: ${columnLabel})`);
          }
          // Skip keys that don't correspond to a current header (deleted columns)
        });
        
        return {
          student_id: student.id,
          ...transformedValues
        };
      });
      
      // Final check to ensure we have data to save after all transformations
      if (formattedValues.length === 0) {
        console.error("No valid rows found after data transformation");
        showErrorModal(
          "Save Error", 
          "Cannot save: No valid data after processing",
          "Please check the table data and try again."
        );
        setIsSaving(false);
        return;
      }
      
      const formattedData = {
        course_id: params.courseId,
        author_id: courseData.instructorId || courseData.instructorid,
        // Use headers from tableHeaders state
        headers: headerLabels,
        values: formattedValues
      };
      
      console.log('Saving table data with headers:', formattedData.headers);
      console.log('Saving table data with values:', formattedData.values);
      
      // Call API to save table data using the new CourseDynamicTable endpoint
      const response = await axios.put(
        `http://localhost:3001/api/v1/course-dynamic-tables/course/${params.courseId}/save-full-table`,
        formattedData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Save successful:', response.data);
      setTableModified(false);
      setShowSaveDialog(false);
      
      // After successful save, update the original data to the current state
      setOriginalTableData(JSON.parse(JSON.stringify(lastTableData || tableData)));
      setOriginalTableHeaders(JSON.parse(JSON.stringify(tableHeaders)));
      
      // Show success notification
      showSuccessModal(
        "Success", 
        "Changes saved successfully!",
        ""
      );
    } catch (err) {
      console.error('Error saving dynamic table:', err);
      showErrorModal(
        "Save Failed", 
        "Failed to save changes. Please try again.",
        err.response?.data?.message || err.message || "An unknown error occurred."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Helper function to find duplicate headers
  const findDuplicateHeaders = (headers) => {
    const headerMap = new Map(); // Map to track headers by lowercase value
    const duplicates = []; // Array to collect all duplicate headers with original case
    
    headers.forEach((header, index) => {
      const lowerCaseHeader = header.toLowerCase(); // تحويل العنوان إلى أحرف صغيرة
      
      if (!headerMap.has(lowerCaseHeader)) {
        // First time seeing this header (lowercase)
        headerMap.set(lowerCaseHeader, { 
          originalValues: [header],
          indices: [index]
        });
      } else {
        // This is a duplicate (case-insensitive)
        const existing = headerMap.get(lowerCaseHeader);
        existing.originalValues.push(header);
        existing.indices.push(index);
      }
    });
    
    // Collect all duplicate headers (including all variations)
    headerMap.forEach((value, key) => {
      if (value.indices.length > 1) {
        // This is a duplicate set
        value.originalValues.forEach(header => {
          if (!duplicates.includes(header)) {
            duplicates.push(header);
          }
        });
      }
    });
    
    // Debug information
    console.log("Headers being checked:", headers);
    console.log("Headers map:", Array.from(headerMap.entries()));
    console.log("Duplicates found:", duplicates);
    
    return duplicates;
  };

  // Handle search input focus
  const handleSearchFocus = () => {
     // console.log("handleSearchFocus");
     if (tableManagerRef.current) {
       tableManagerRef.current.focusSearch();
     }
   };

  const handleCancelSave = async () => {
    try {
      // Show loading indicator
      setLoading(true);
      
      const accessToken = getCookie('access_token');
      if (!accessToken) {
        router.push('/login');
        return;
      }
      
      const courseId = params.courseId;
      
      // Fetch fresh table data from the API
      const tableResponse = await axios.get(`http://localhost:3001/api/v1/course-dynamic-tables/course/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      const savedTableData = tableResponse.data.data || tableResponse.data;
      
      if (savedTableData && savedTableData.values && savedTableData.values.length > 0) {
        // Create a map of student data by ID for easy lookup
        const studentMap = {};
        students.forEach(student => {
          studentMap[student.id] = {
            avatar: student.profileimage || "/images/shadcn.jpg",
            name: `${student.firstname} ${student.secondname} ${student.lastname}`,
            id: student.id
          };
        });
        
        // Convert saved values to table rows with student objects
        const reloadedTableData = savedTableData.values.map(row => {
          const studentInfo = studentMap[row.student_id] || {
            avatar: "/images/shadcn.jpg", 
            name: "Unknown Student",
            id: row.student_id
          };
          
          // Extract student_id and create the row data
          const { student_id, ...rowData } = row;
          return {
            student: studentInfo,
            ...rowData
          };
        });
        
        // Update the table data
        setTableData(reloadedTableData);
        setLastTableData(reloadedTableData);
        setOriginalTableData(JSON.parse(JSON.stringify(reloadedTableData)));
        
        // Reset column mappings
        setColumnMappings({});
        
        // Reload headers from saved data
        if (savedTableData.headers && savedTableData.headers.length > 0) {
          // Convert saved headers to tableHeaders format
          const savedHeaders = [
            // First header is always 'Student'
            {
              id: "student",
              label: savedTableData.headers[0] || "Student",
              sortable: true,
              editable: false
            }
          ];
          
          // Process each header after "Student"
          for (let i = 1; i < savedTableData.headers.length; i++) {
            const headerLabel = savedTableData.headers[i];
            const headerKey = headerLabel.toLowerCase().replace(/\s+/g, '_');
            
            savedHeaders.push({
              id: headerKey,
              label: headerLabel,
              sortable: true,
              editable: true
            });
          }
          
          setTableHeaders(savedHeaders);
          setOriginalTableHeaders(JSON.parse(JSON.stringify(savedHeaders)));
        }
      } else {
        // If no data in database, use default structure
        const defaultData = students.map(student => { 
          return {
            student: {
              avatar: student.profileimage || "/images/shadcn.jpg",
              name: `${student.firstname} ${student.secondname} ${student.lastname}`,
              id: student.id
            },
            date: '2024/02/16',
            grade: '88',
            assignments: '45/50',
            quizzes: '43/50',
            status: 'good'
          }
        });
        
        setTableData(defaultData);
        setLastTableData(defaultData);
        setOriginalTableData(JSON.parse(JSON.stringify(defaultData)));
        
        // Reset to default headers
        const defaultHeaders = [
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
            editable: true
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
        ];
        
        setTableHeaders(defaultHeaders);
        setOriginalTableHeaders(JSON.parse(JSON.stringify(defaultHeaders)));
      }
      
      // Reset modified flag and close dialog
      setTableModified(false);
      setShowSaveDialog(false);
      
      // Force table refresh
      if (tableManagerRef.current && tableManagerRef.current.refreshTable) {
        setTimeout(() => tableManagerRef.current.refreshTable(), 100);
      }
      
      // Notify user
      showSuccessModal("Changes Cancelled", "All changes have been discarded and data has been reloaded.");
    } catch (error) {
      console.error("Error reloading table data:", error);
      showErrorModal(
        "Error Reloading Data",
        "Failed to reload the original data. Please try again or refresh the page.",
        error.response?.data?.message || error.message || "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  // Add handler for column rename
  const handleColumnRename = (columnId, oldName, newName) => {
    console.log(`Column renamed: ${columnId}: ${oldName} -> ${newName}`);
    
    // Update tableHeaders to reflect the new column name
    setTableHeaders(prevHeaders => {
      return prevHeaders.map(header => 
        header.id === columnId 
          ? { ...header, label: newName }
          : header
      );
    });
    
    // Store the column ID to new name mapping to ensure persistence across edits
    setColumnMappings(prevMappings => ({
      ...prevMappings,
      [columnId]: newName
    }));
    
    // Log more details about the rename operation to help with debugging
    console.log('Column rename details:', {
      columnId,
      oldName,
      newName,
      'Current tableHeaders': tableHeaders,
      'Current tableData first row': tableData.length > 0 ? tableData[0] : null
    });
    
    // Update lastTableData to trigger the save dialog
    // This is important so we have the latest data when saving
    setLastTableData(tableData);
    console.log("Updated lastTableData after column rename:", tableData);
    
    setTableModified(true);
    
    // Show save dialog when headers change
    if (!showSaveDialog) {
      setShowSaveDialog(true);
    }
  };

  // Add handler for column delete
  const handleColumnDelete = (columnId, columnName) => {
    // Show confirmation dialog
    showConfirmModal(
      "Delete Column", 
      `Are you sure you want to delete the "${columnName}" column? This action cannot be undone.`,
      () => {
        // This will run if user confirms the action
        try {
          console.log(`Attempting to delete column: ID=${columnId}, Name=${columnName}`);
          
          // Don't allow deletion of the student column
          if (columnId === "student") {
            showErrorModal(
              "Cannot Delete Column",
              "The Student column cannot be deleted as it's required for the table.",
              "Please try deleting a different column."
            );
            return;
          }

          // Create deep copies of the current data to avoid reference issues
          const currentData = JSON.parse(JSON.stringify(tableData || []));
          
          // IMPORTANT: Log the current student data before deletion
          console.log("Student data before deletion:", currentData.map(row => row.student));
          
          // 1. Update tableHeaders to remove the deleted column
          const newHeaders = tableHeaders.filter(header => header.id !== columnId);
          setTableHeaders(newHeaders);
          
          // 2. Remove the column from mappings
          setColumnMappings(prevMappings => {
            const updatedMappings = { ...prevMappings };
            delete updatedMappings[columnId];
            return updatedMappings;
          });
          
          // 3. Update tableData to remove the column from all rows while carefully preserving student data
          const newTableData = currentData.map(row => {
            // Create a new row object
            const newRow = {};
            
            // Preserve the student object exactly as it is
            newRow.student = row.student;
            
            // Copy all other values except the deleted column
            Object.keys(row).forEach(key => {
              if (key !== columnId && key !== 'student') {
                newRow[key] = row[key];
              }
            });
            
            return newRow;
          });
          
          console.log("Student data after deletion processing:", newTableData.map(row => row.student));
          
          // 4. Set the new data
          setTableData(newTableData);
          setLastTableData(newTableData);
          
          // 5. Set the table as modified to trigger save dialog
          setTableModified(true);
          
          // 6. Explicitly show the save changes dialog
          setShowSaveDialog(true);
          
          // 7. Show success message
          showSuccessModal("Column Deleted", `The column "${columnName}" has been successfully deleted.`);
          
          // 8. Force refresh the table if possible
          if (tableManagerRef.current && tableManagerRef.current.refreshTable) {
            setTimeout(() => {
              tableManagerRef.current.refreshTable();
            }, 10);
          }
        } catch (error) {
          // Handle any errors
          console.error("Error in handleColumnDelete:", error);
          showErrorModal(
            "Error Deleting Column",
            `An error occurred while deleting column "${columnName}".`,
            error.message
          );
        }
      }
    );
  };

  // Add handler for column add
  const handleColumnAdd = (columnId, columnName) => {
    console.log(`Column added: ${columnId} (${columnName})`);
    
    // Update tableHeaders to include the new column
    setTableHeaders(prevHeaders => [
      ...prevHeaders,
      {
        id: columnId,
        label: columnName,
        sortable: true,
        editable: true
      }
    ]);
    
    // Initialize column mapping for the new column
    setColumnMappings(prevMappings => ({
      ...prevMappings,
      [columnId]: columnName
    }));
    
    // Update tableData to ensure the new column is included in all rows
    setTableData(prevData => {
      if (!prevData || !Array.isArray(prevData)) {
        console.warn("prevData is null or not an array in tableData update", prevData);
        return prevData || [];
      }
      return prevData.map(row => ({
        ...row,
        [columnId]: ''
      }));
    });
    
    // Ensure lastTableData includes the new column
    setLastTableData(prevData => {
      // Check if prevData is null or not an array
      if (!prevData || !Array.isArray(prevData)) {
        console.warn("prevData is null or not an array in lastTableData update", prevData);
        // If prevData is null, use tableData as a fallback
        if (tableData && Array.isArray(tableData)) {
          return tableData.map(row => ({
            ...row,
            [columnId]: ''
          }));
        }
        return prevData || [];
      }
      
      return prevData.map(row => ({
        ...row,
        [columnId]: ''
      }));
    });
    
    // Force refresh the table immediately
    if (tableManagerRef.current && tableManagerRef.current.refreshTable) {
      setTimeout(() => {
        tableManagerRef.current.refreshTable();
      }, 10);
    }
    
    setTableModified(true);
    
    // Show save dialog when columns change
    if (!showSaveDialog) {
      setShowSaveDialog(true);
    }
  };

  // Check tableManagerRef after render
  useEffect(() => {
    if (tableManagerRef.current) {
      console.log("TableManager reference is available", {
        refreshTable: !!tableManagerRef.current.refreshTable,
        updateTableData: !!tableManagerRef.current.updateTableData,
        focusSearch: !!tableManagerRef.current.focusSearch
      });
    } else {
      console.warn("TableManager reference is not available");
    }
  }, [tableManagerRef.current]);

  // Show loading state
  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading course data...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="error-state">
        <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>{error}</p>
        <button onClick={() => router.push('/teachers/doctors/scheduling')}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="grades-container" ref={tableContainerRef}>
      <div className="grades-header">
        <div className="grades-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          <h1>Grades - {courseData?.coursename}</h1>
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

      {/* Save Changes Dialog */}
      <div className={`save-changes-dialog ${showSaveDialog ? 'show' : ''}`}>
        <div className="save-changes-content">
          <div className="save-changes-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </div>
          <div className="save-changes-text">
            <span>Do you want to save your changes?</span>
          </div>
          <div className="save-changes-actions">
            <button 
              className="cancel-btn" 
              onClick={handleCancelSave}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button 
              className="save-btn" 
              onClick={(e) => {
                e.preventDefault();
                console.log("Save button clicked directly");
                handleSaveChanges();
              }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Error Modal for displaying errors */}
      <StatusModal 
        isOpen={errorModal.isOpen}
        onClose={closeErrorModal}
        title={errorModal.title}
        message={errorModal.message}
        details={errorModal.details}
        type={errorModal.type}
        confirmAction={errorModal.confirmAction}
      />

      <TableManager
        key={tableData.length > 0 ? 'loaded-table' : 'loading'}
        ref={tableManagerRef}
        containerRef={tableContainerRef}
        rowsPerPage={10}
        onDataChange={handleDataChange}
        onColumnRename={handleColumnRename}
        onColumnDelete={handleColumnDelete}
        onColumnAdd={handleColumnAdd}
        initialData={tableData}
        tableRef={tableRef}
        editColumns={true}
        tableHeaders={tableHeaders}
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
          // Render function that handles any column
          "*": (row, colId) => {
            // Special case for status column
            if (colId === "status" && row.status) {
              return <div className={`grade-status ${row.status}`}>{row.status}</div>;
            }
            
            // Get the value for this column from the row
            const value = row[colId];
            
            // Return the value or empty string if undefined
            return value !== undefined ? value : '';
          }
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