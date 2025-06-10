'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
<<<<<<< HEAD
import { usePathname } from 'next/navigation';
=======
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
import './styles/page.css';
import { 
  formatTimeRemaining, 
  validateFile, 
  downloadFile, 
  setupClickOutsideHandler, 
  formatDate, 
  calculateTimeElapsed,
  formatFileSize,
  countSubmissionsByStatus,
  formatAssignmentStatus,
  isDeadlineApproaching
} from './components/script';

<<<<<<< HEAD
// استيراد خدمات API
import {
  getAssignmentsByCourse,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  uploadAssignmentFile,
  deleteAssignmentFile,
  gradeSubmission
} from './api';

export default function Assignments() {
  const pathname = usePathname();
=======
export default function Assignments() {
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const dialogRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAssignment, setEditedAssignment] = useState(null);
  const [viewMode, setViewMode] = useState('details');
  const [viewingSubmissionDetails, setViewingSubmissionDetails] = useState(null);
  const [currentGradeData, setCurrentGradeData] = useState({ pointsAwarded: '', feedback: '' });
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  const [allAssignments, setAllAssignments] = useState([]);
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState({
    title: '',
    course: '',
    courseId: '',
<<<<<<< HEAD
    courseCode: '',
=======
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
    description: '',
    startTime: '',
    endTime: '',
    totalPoints: '',
    attachedFiles: []
  });

  const [blockMessage, setBlockMessage] = useState({ isOpen: false, message: '', type: 'info' }); // type: info, success, error, warning
<<<<<<< HEAD
  const [courseDetails, setCourseDetails] = useState(null); // تخزين تفاصيل المقرر الدراسي
=======
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59

  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());
    
<<<<<<< HEAD
    // استخراج معرف المقرر من الرابط
    const pathParts = pathname.split('/');
    const courseIdFromPath = pathParts[pathParts.indexOf('courses') + 1];
    
    // جلب المهام من الخادم
    const fetchAssignments = async () => {
      try {
        const assignments = await getAssignmentsByCourse(courseIdFromPath);
        
        // تخزين تفاصيل المقرر إذا كانت متوفرة في أول مهمة
        if (assignments && assignments.length > 0 && assignments[0].course) {
          // إذا كان لدينا معلومات المقرر كاملة في بيانات المهام
          if (typeof assignments[0].course === 'object') {
            setCourseDetails(assignments[0].course);
            console.log('Course details set from API object:', assignments[0].course);
          } else {
            // إذا كان لدينا فقط اسم المقرر كنص
            setCourseDetails({ coursename: assignments[0].course, coursecode: assignments[0].courseCode || '' });
            console.log('Course details set from text:', { coursename: assignments[0].course, coursecode: assignments[0].courseCode || '' });
          }
        }
        
        console.log('All assignments loaded:', assignments);
        setAllAssignments(assignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        // استخدام البيانات الافتراضية في حالة الفشل
        setAllAssignments(assignments);
        showBlockMessage('فشل في جلب المهام من الخادم. تم استخدام بيانات افتراضية.', 'error');
      }
    };
    
    fetchAssignments();
    
=======
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(intervalId);
<<<<<<< HEAD
  }, [pathname]);

  // البيانات الافتراضية للاستخدام عند فشل الاتصال بالخادم
=======
  }, []);

>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  const assignments = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
      course: 'Software Engineering',
      instructor: 'DR. Ahmed Emad',
      status: 'active',
      startTime: '2024-07-25T10:00:00.000Z',
      endTime: '2024-08-10T23:59:59.000Z',
      createdAt: '2024-07-20T14:30:00.000Z',
      description: 'Design a software architecture for a student management system. Include component diagrams and detailed explanation of each module.',
      progress: 60,
      attachedFiles: [
        { id: 'f1', name: 'assignment_spec.pdf', url: '/files/spec.pdf', size: '250 KB', isNew: false },
        { id: 'f2', name: 'template.docx', url: '/files/template.docx', size: '50 KB', isNew: false }
      ],
      totalPoints: 100,
      submissions: [
        { studentId: 101, studentName: 'Alice Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1', displayId: '12345678', status: 'submitted', submittedAt: '2024-08-05T11:00:00.000Z', pointsAwarded: null, feedback: null,
          submittedFiles: [
            { id: 's_f1', name: 'alice_submission_report.pdf', url: '/files/alice_report.pdf', size: '1.2MB' },
            { id: 's_f2', name: 'alice_source_code.zip', url: '/files/alice_source.zip', size: '5MB' },
          ]
        },
        { studentId: 102, studentName: 'Bob Johnson', avatarUrl: 'https://i.pravatar.cc/150?img=2', displayId: '87654321', status: 'completed', submittedAt: '2024-08-06T15:30:00.000Z', pointsAwarded: 85, feedback: 'Good effort, some areas need refinement.',
          submittedFiles: [
            { id: 's_f3', name: 'bob_final_essay.docx', url: '/files/bob_essay.docx', size: '850KB' }
          ]
        },
        { studentId: 103, studentName: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?img=3', displayId: '11223344', status: 'missing', submittedAt: null, pointsAwarded: null, feedback: null, submittedFiles: [] },
        { studentId: 104, studentName: 'Diana Prince', avatarUrl: 'https://i.pravatar.cc/150?img=4', displayId: '55667788', status: 'completed', submittedAt: '2024-08-09T09:15:00.000Z', pointsAwarded: 95, feedback: 'Excellent work!',
          submittedFiles: [
            { id: 's_f4', name: 'diana_presentation.pptx', url: '/files/diana_slides.pptx', size: '3.5MB' },
            { id: 's_f5', name: 'diana_research_notes.txt', url: '/files/diana_notes.txt', size: '15KB' }
          ]
        }
      ]
    },
<<<<<<< HEAD
    // ... باقي البيانات الافتراضية
=======
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
      course: 'Software Engineering',
      instructor: 'DR. Ahmed Emad',
      status: 'submitted',
      startTime: '2024-08-15T10:00:00.000Z',
      endTime: '2024-08-30T23:59:59.000Z',
      createdAt: '2024-08-10T09:15:00.000Z',
      description: 'Normalize the provided database schema to 3NF and provide justification for each step.',
      progress: 0,
      attachedFiles: [],
      totalPoints: 50,
      submissions: [
        { studentId: 101, studentName: 'Alice Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1', displayId: '12345678', status: 'submitted', submittedAt: '2024-08-25T11:00:00.000Z', pointsAwarded: null, feedback: null },
        { studentId: 102, studentName: 'Bob Johnson', avatarUrl: 'https://i.pravatar.cc/150?img=2', displayId: '87654321', status: 'submitted', submittedAt: '2024-08-26T15:30:00.000Z', pointsAwarded: null, feedback: null },
      ]
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
      course: 'Web Development',
      instructor: 'DR. Fatima Ali',
      status: 'completed',
      startTime: '2024-06-10T10:00:00.000Z',
      endTime: '2024-06-25T23:59:59.000Z',
      createdAt: '2024-06-05T11:45:00.000Z',
      description: 'Develop a responsive web application using React for task management.',
      progress: 100,
      finished: true,
      attachedFiles: [
        { id: 'f3', name: 'final_rubric.pdf', url: '/files/rubric_final.pdf', size: '120 KB', isNew: false }
      ],
      totalPoints: 100,
      submissions: [
        { studentId: 101, studentName: 'Alice Smith', avatarUrl: 'https://i.pravatar.cc/150?img=1', displayId: '12345678', status: 'completed', submittedAt: '2024-06-25T11:00:00.000Z', pointsAwarded: 90, feedback: 'Well done.' },
        { studentId: 102, studentName: 'Bob Johnson', avatarUrl: 'https://i.pravatar.cc/150?img=2', displayId: '87654321', status: 'completed', submittedAt: '2024-06-26T15:30:00.000Z', pointsAwarded: 75, feedback: 'Met requirements.' },
      ]
    },
    {
      id: 4,
      title: 'Another Assignment Example',
      course: 'Web Development',
      instructor: 'DR. Fatima Ali',
      status: 'missing',
      startTime: '2024-09-01T10:00:00.000Z',
      endTime: '2024-09-15T23:59:59.000Z',
      createdAt: '2024-08-20T11:45:00.000Z',
      description: 'Build a simple API using Node.js and Express.',
      progress: 0,
      finished: false,
      attachedFiles: [],
      totalPoints: 20,
      submissions: []
    }
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  ];

  useEffect(() => {
    let cleanup;
    
    if (isDialogOpen) {
      cleanup = setupClickOutsideHandler(() => {
         closeDialog(); 
      }, ['.teacher-assignment-dialog']);
    }
    
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [isDialogOpen, isEditing]);

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedAssignment(null);
    setIsEditing(false);
    setEditedAssignment(null);
    setViewMode('details');
    setFileError(null);
    setViewingSubmissionDetails(null);
    setCurrentGradeData({ pointsAwarded: '', feedback: '' });
    setShowDeleteConfirmModal(false);
    setAssignmentToDelete(null);
    setIsCreatingAssignment(false);
    setNewAssignmentData({
<<<<<<< HEAD
        title: '', course: '', courseId: '', courseCode: '', description: '',
=======
        title: '', course: '', courseId: '', description: '',
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
        startTime: '', endTime: '', totalPoints: '', attachedFiles: []
    });
    closeBlockMessage();
  }

  const handleAssignmentClick = (assignment) => {
<<<<<<< HEAD
    console.log('Selected assignment details:', assignment);
=======
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
    setSelectedAssignment(assignment);
    setIsDialogOpen(true);
    setIsEditing(false);
    setEditedAssignment(null);
    setViewMode('details');
    setFileError(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
<<<<<<< HEAD
    setEditedAssignment({...selectedAssignment});
=======
    setEditedAssignment(JSON.parse(JSON.stringify(selectedAssignment)));
    setFileError(null);
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  };

  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'totalPoints') {
        const points = value === '' ? null : parseInt(value, 10);
        setEditedAssignment(prev => ({
            ...prev,
            [name]: points === null || isNaN(points) || points < 0 ? '' : points
        }));
    } else {
        setEditedAssignment(prev => ({
            ...prev,
            [name]: value
        }));
    }
  };

  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    try {
        const dateValue = new Date(value).toISOString();
         setEditedAssignment(prev => ({
            ...prev,
            [name]: dateValue
        }));
    } catch (error) {
        console.error("Invalid date format:", value);
    }
  };

  const handleEditFileChange = (e) => {
    const files = Array.from(e.target.files);
    let hasError = false;
    
    const validatedFiles = files.map(file => {
      const validation = validateFile(file, [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg', 'image/png', 'text/plain'
      ]);
      if (!validation.valid) {
        hasError = true;
        setFileError(`File "${file.name}": ${validation.message}`);
        return null;
      }
      return {
          id: `new-${Date.now()}-${Math.random()}`,
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          fileObject: file,
          isNew: true
      };
    }).filter(file => file !== null);

    if (!hasError) {
      setEditedAssignment(prev => ({
          ...prev,
          attachedFiles: [...(prev.attachedFiles || []), ...validatedFiles]
      }));
      setFileError(null);
    } else {
         e.target.value = null;
    }
  };

  const removeEditFile = (fileIdToRemove) => {
    setEditedAssignment(prev => ({
        ...prev,
        attachedFiles: prev.attachedFiles.filter(file => file.id !== fileIdToRemove)
    }));
  };

<<<<<<< HEAD
  const handleSaveChanges = async () => {
    if (!editedAssignment) return;
    
    try {
      // جمع الملفات الجديدة للرفع
      const filesToUpload = editedAssignment.attachedFiles.filter(f => f.isNew);
      
      // تحديث بيانات المهمة بدون الملفات الجديدة أولاً
      const apiData = {
        title: editedAssignment.title,
        description: editedAssignment.description,
        startTime: editedAssignment.startTime,
        endTime: editedAssignment.endTime,
        totalPoints: editedAssignment.totalPoints,
        attachedFiles: editedAssignment.attachedFiles.filter(f => !f.isNew)
      };
      
      console.log('Updating assignment data:', apiData);
      let updatedAssignment = await updateAssignment(editedAssignment.id, apiData);
      
      // رفع الملفات الجديدة
      for (const file of filesToUpload) {
        if (file.fileObject) {
          try {
            console.log('Uploading file:', file.name);
            const uploadedFile = await uploadAssignmentFile(editedAssignment.id, file.fileObject);
            // إضافة الملف المرفق للمهمة المحدثة
            updatedAssignment.attachedFiles.push({
              id: uploadedFile.id,
              name: uploadedFile.name,
              url: uploadedFile.url,
              size: uploadedFile.size || formatFileSize(file.fileObject.size)
            });
          } catch (uploadError) {
            console.error('Error uploading file:', file.name, uploadError);
            showBlockMessage(`فشل في رفع الملف ${file.name}. ${uploadError.message || ''}`, 'error');
          }
        }
      }
      
      // تحديث المهمة في واجهة المستخدم
      setAllAssignments(prevAssignments => 
        prevAssignments.map(a => a.id === updatedAssignment.id ? updatedAssignment : a)
      );
      
      setSelectedAssignment(updatedAssignment);
      setIsEditing(false);
      setViewMode('details');
      showBlockMessage('تم تحديث المهمة بنجاح', 'success');
    } catch (error) {
      console.error("Failed to update assignment:", error);
      showBlockMessage(error.message || 'فشل في تحديث المهمة', 'error');
    }
=======
  const handleSaveChanges = () => {
    console.log('Saving changes:', editedAssignment);
    const dataToSend = {
        ...editedAssignment,
        filesToUpload: editedAssignment.attachedFiles.filter(f => f.isNew),
        finalAttachedFiles: editedAssignment.attachedFiles.map(f => ({ id: f.id, name: f.name, url: f.url }))
    };
    console.log("Data to send to API:", dataToSend);

    const finalSavedAssignment = { 
        ...editedAssignment, 
        attachedFiles: editedAssignment.attachedFiles.map(({ fileObject, isNew, ...rest }) => rest) 
    };
    setSelectedAssignment(finalSavedAssignment); 
    
    setIsEditing(false); 
    setViewMode('details');
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedAssignment(null);
    setFileError(null);
    setViewMode('details');
  };

  const handleFileDownload = (file) => {
    if (!file.url && file.isNew && file.fileObject) {
        console.warn("Cannot download a file that hasn't been uploaded yet.");
        showBlockMessage("This file is new and not yet saved to the server. Please save the assignment first.", "warning");
        return;
    }
    if(!file.url) {
        console.error("File has no URL to download.", file);
        showBlockMessage("Cannot download this file (no URL found).", "error");
        return;
    }

    downloadFile(file)
      .then(result => {
        console.log('Download success:', result);
        // showBlockMessage(`File "${file.name}" downloaded successfully.`, "success"); // Optional success message
      })
      .catch(error => {
        console.error('Download error:', error);
        showBlockMessage('Failed to download file. Please try again.', 'error');
      });
  };

  const getElapsedPercentage = (assignment) => {
    if (!isMounted || !currentTime || !assignment || assignment.status !== 'active') {
      return assignment.status === 'completed' ? 100 : 0;
    }
    
    return calculateTimeElapsed(new Date(assignment.startTime), new Date(assignment.endTime), currentTime);
  };

<<<<<<< HEAD
  // Usar el nombre del curso desde courseDetails cuando sea posible
  const courseName = courseDetails && courseDetails.coursename ? courseDetails.coursename : "Unknown Course";
  console.log('Course name used for grouping:', courseName);
  console.log('Course details state:', courseDetails);
  
  const groupedAssignments = allAssignments.reduce((acc, assignment) => {
    // Usar el nombre real del curso en lugar del de cada asignación
    const course = courseName;
=======
  const groupedAssignments = allAssignments.reduce((acc, assignment) => {
    const course = assignment.course;
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
    if (!acc[course]) {
      acc[course] = [];
    }
    acc[course].push(assignment);
    return acc;
  }, {});
  
<<<<<<< HEAD
  console.log('Grouped assignments:', groupedAssignments);
  
=======
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  const submissionCounts = selectedAssignment ? countSubmissionsByStatus(selectedAssignment.submissions || []) : {};
  const totalSubmissions = selectedAssignment ? (selectedAssignment.submissions || []).length : 0;

  const formatDateTimeLocal = (isoString) => {
    if (!isoString) return '';
    try {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (e) {
        console.error("Error formatting date:", isoString, e);
        return '';
    }
  };

  // --- Grading Functions ---

  const handleViewGradeClick = (submission) => {
    setViewingSubmissionDetails(submission);
    setCurrentGradeData({
        pointsAwarded: submission.pointsAwarded === null || submission.pointsAwarded === undefined ? '' : submission.pointsAwarded,
        feedback: submission.feedback || ''
    });
    setViewMode('grading');
  };

  const handleGradeChange = (e) => {
    const { name, value } = e.target;
    setCurrentGradeData(prev => ({
        ...prev,
        [name]: name === 'pointsAwarded' 
                 ? (value === '' ? '' : parseInt(value, 10) || 0)
                 : value
    }));
  };
  
<<<<<<< HEAD
  const handleSaveGrade = async () => {
    if (!viewingSubmissionDetails || !selectedAssignment) return;
    
    try {
      // التحقق من صحة النقاط
      const points = parseFloat(currentGradeData.pointsAwarded);
      if (isNaN(points) || points < 0 || points > selectedAssignment.totalPoints) {
        showBlockMessage(`النقاط يجب أن تكون بين 0 و ${selectedAssignment.totalPoints}`, 'error');
        return;
      }
      
      // حفظ التقييم عبر API
      const updatedSubmission = await gradeSubmission(
        viewingSubmissionDetails.id,
        points,
        currentGradeData.feedback
      );
      
      // تحديث واجهة المستخدم
      setAllAssignments(prevAssignments => 
        prevAssignments.map(assignment => {
          if (assignment.id === selectedAssignment.id) {
            const updatedSubmissions = assignment.submissions.map(sub => {
              if (sub.studentId === viewingSubmissionDetails.studentId) {
                return {
                  ...sub,
                  status: 'completed',
                  pointsAwarded: points,
                  feedback: currentGradeData.feedback
                };
              }
              return sub;
            });
            return { ...assignment, submissions: updatedSubmissions };
          }
          return assignment;
        })
      );
      
      // تحديث المهمة المحددة أيضًا
      setSelectedAssignment(prev => {
        const updatedSubmissions = prev.submissions.map(sub => {
          if (sub.studentId === viewingSubmissionDetails.studentId) {
            return {
              ...sub,
              status: 'completed',
              pointsAwarded: points,
              feedback: currentGradeData.feedback
            };
          }
          return sub;
        });
        return { ...prev, submissions: updatedSubmissions };
      });
      
      showBlockMessage('تم حفظ التقييم بنجاح', 'success');
      handleCancelGrade(); // العودة لقائمة التسليمات
    } catch (error) {
      console.error("Failed to save grade:", error);
      showBlockMessage(error.message || 'فشل في حفظ التقييم', 'error');
    }
=======
  const handleSaveGrade = () => {
    if (!viewingSubmissionDetails || !selectedAssignment) return;

    const points = currentGradeData.pointsAwarded;
    if (points === '' || typeof points !== 'number' || points < 0 || (selectedAssignment.totalPoints !== null && points > selectedAssignment.totalPoints)) {
        showBlockMessage(`Please enter valid points between 0 and ${selectedAssignment.totalPoints ?? 'N/A'}.`, 'error');
        return;
    }

    const submissionIndex = selectedAssignment.submissions.findIndex(
        sub => sub.studentId === viewingSubmissionDetails.studentId
    );

    if (submissionIndex === -1) {
        console.error("Could not find submission to update.");
        showBlockMessage("An error occurred. Could not save grade.", "error");
        return;
    }

    const updatedSubmissions = [...selectedAssignment.submissions];
    updatedSubmissions[submissionIndex] = {
        ...updatedSubmissions[submissionIndex],
        pointsAwarded: currentGradeData.pointsAwarded,
        feedback: currentGradeData.feedback,
        status: 'completed'
    };

    setSelectedAssignment(prev => ({
        ...prev,
        submissions: updatedSubmissions
    }));

    console.log('Grade saved for:', viewingSubmissionDetails.studentName, currentGradeData);
    
    setViewingSubmissionDetails(null);
    setCurrentGradeData({ pointsAwarded: '', feedback: '' });
    setViewMode('submissions');
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  };

  const handleCancelGrade = () => {
    setViewingSubmissionDetails(null);
    setCurrentGradeData({ pointsAwarded: '', feedback: '' });
    setViewMode('submissions');
  };

  const handleDeleteAssignment = (assignment) => {
    setAssignmentToDelete(assignment);
    setShowDeleteConfirmModal(true);
  };

<<<<<<< HEAD
  const confirmActualDelete = async () => {
    if (!assignmentToDelete) return;
    
    try {
      console.log('Deleting assignment:', assignmentToDelete.id);
      await deleteAssignment(assignmentToDelete.id);
      
      setAllAssignments(prevAssignments => prevAssignments.filter(a => a.id !== assignmentToDelete.id));
      showBlockMessage(`تم حذف المهمة "${assignmentToDelete.title}" بنجاح.`, 'success');
      
      setShowDeleteConfirmModal(false);
      setAssignmentToDelete(null);
      closeDialog();
    } catch (error) {
      console.error("Failed to delete assignment:", error);
      showBlockMessage(error.message || 'فشل في حذف المهمة', 'error');
    }
=======
  const confirmActualDelete = () => {
    if (!assignmentToDelete) return;

    console.log('Deleting assignment:', assignmentToDelete.id);
    setAllAssignments(prevAssignments => prevAssignments.filter(a => a.id !== assignmentToDelete.id));
    showBlockMessage(`Assignment "${assignmentToDelete.title}" has been deleted successfully.`, 'success');
    
    setShowDeleteConfirmModal(false);
    setAssignmentToDelete(null);
    closeDialog();
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setAssignmentToDelete(null);
  };

  // --- End Grading Functions ---

  // --- Create New Assignment Functions ---
  const handleOpenCreateAssignmentDialog = () => {
    closeDialog();
    setIsCreatingAssignment(true);

<<<<<<< HEAD
    // استخراج معرف المقرر من الرابط
    const pathParts = pathname.split('/');
    const courseIdFromPath = pathParts[pathParts.indexOf('courses') + 1];
    
    // استخدام اسم المقرر من courseDetails إذا كان متاحًا
    const courseName = courseDetails && courseDetails.coursename ? courseDetails.coursename : "Software Engineering";
    const courseCode = courseDetails && courseDetails.coursecode ? courseDetails.coursecode : "";
    
    setNewAssignmentData({
        title: '',
        course: courseName,
        courseId: courseIdFromPath,
        courseCode: courseCode,
=======
    // Placeholder for fetching course name based on URL or context
    // For now, using a hardcoded placeholder. 
    // In a real app, you would get courseId from URL params and fetch course name.
    const currentCourseName = "Software Engineering"; // Changed to direct name
    const currentCourseId = "CSE451"; // Placeholder for Course ID

    setNewAssignmentData({
        title: '',
        course: currentCourseName, 
        courseId: currentCourseId, // Set the determined course ID
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
        description: '',
        startTime: '',
        endTime: '',
        totalPoints: '',
        attachedFiles: []
    });
    setFileError(null);
  };

  const handleCancelCreateAssignment = () => {
    setIsCreatingAssignment(false);
<<<<<<< HEAD
    setNewAssignmentData({
        title: '', course: '', courseId: '', courseCode: '', description: '',
=======
    // setNewAssignmentData is reset in closeDialog now, or could be here too.
    // For safety, ensure course is also reset if dialog is cancelled without saving.
    setNewAssignmentData({
        title: '', course: '', courseId: '', description: '', // Reset courseId
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
        startTime: '', endTime: '', totalPoints: '', attachedFiles: []
    });
    setFileError(null);
  };

  const handleNewAssignmentChange = (e) => {
    const { name, value } = e.target;
    if (name === 'totalPoints') {
        const points = value === '' ? '' : parseInt(value, 10);
        setNewAssignmentData(prev => ({
            ...prev,
            [name]: points === '' || isNaN(points) || points < 0 ? '' : points
        }));
    } else {
        setNewAssignmentData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNewAssignmentDateTimeChange = (e) => {
    const { name, value } = e.target;
    try {
        const dateValue = value ? new Date(value).toISOString() : '';
        setNewAssignmentData(prev => ({ ...prev, [name]: dateValue }));
    } catch (error) {
        console.error("Invalid date format for new assignment:", value);
    }
  };

  const handleNewAssignmentFileChange = (e) => {
    const files = Array.from(e.target.files);
    let hasError = false;
    const validatedFiles = files.map(file => {
      const validation = validateFile(file, [
        'application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg', 'image/png', 'text/plain'
      ]);
      if (!validation.valid) {
        hasError = true;
        setFileError(`File "${file.name}": ${validation.message}`);
        return null;
      }
      return {
          id: `new-${Date.now()}-${Math.random()}`,
          name: file.name, size: formatFileSize(file.size), type: file.type,
          fileObject: file, isNew: true
      };
    }).filter(file => file !== null);

    if (!hasError) {
      setNewAssignmentData(prev => ({
          ...prev,
          attachedFiles: [...prev.attachedFiles, ...validatedFiles]
      }));
      setFileError(null);
    } else {
        e.target.value = null;
    }
  };

  const removeNewAssignmentFile = (fileIdToRemove) => {
    setNewAssignmentData(prev => ({
        ...prev,
        attachedFiles: prev.attachedFiles.filter(file => file.id !== fileIdToRemove)
    }));
  };

<<<<<<< HEAD
  const handleSaveNewAssignment = async () => {
    // التحقق من صحة البيانات
    if (!newAssignmentData.title.trim()) {
        showBlockMessage('عنوان المهمة مطلوب.', 'error'); return;
    }
    if (newAssignmentData.totalPoints === '' || isNaN(parseInt(newAssignmentData.totalPoints)) || parseInt(newAssignmentData.totalPoints) <= 0) {
        showBlockMessage('يجب أن يكون إجمالي النقاط رقمًا موجبًا.', 'error'); return;
    }
    if (!newAssignmentData.startTime) {
        showBlockMessage('وقت البدء مطلوب.', 'error'); return;
    }
    if (!newAssignmentData.endTime) {
        showBlockMessage('وقت الانتهاء مطلوب.', 'error'); return;
    }
    if (new Date(newAssignmentData.startTime) >= new Date(newAssignmentData.endTime)) {
        showBlockMessage('يجب أن يكون وقت الانتهاء بعد وقت البدء.', 'error'); return;
    }

    try {
      // تحضير بيانات المهمة للإرسال
      const apiData = {
        title: newAssignmentData.title,
        description: newAssignmentData.description,
        courseId: newAssignmentData.courseId,
        startTime: newAssignmentData.startTime,
        endTime: newAssignmentData.endTime,
        totalPoints: parseInt(newAssignmentData.totalPoints),
        attachedFiles: []
      };
      
      console.log('Creating new assignment:', apiData);
      
      // إنشاء المهمة
      const createdAssignment = await createAssignment(apiData);

      console.log('Created assignment:', createdAssignment);
      
      // رفع الملفات المرفقة
      const filesToUpload = newAssignmentData.attachedFiles.filter(f => f.isNew && f.fileObject);
      for (const file of filesToUpload) {
        try {
          console.log('Uploading file:', file.name);
          await uploadAssignmentFile(createdAssignment.id, file.fileObject);
        } catch (uploadError) {
          console.error('Error uploading file:', file.name, uploadError);
          showBlockMessage(`فشل في رفع الملف ${file.name}. ${uploadError.message || ''}`, 'warning');
        }
      }
      
      // جلب المهمة بعد التحديث لتكون متضمنة للملفات المرفقة
      const finalAssignment = await getAssignmentById(createdAssignment._id || createdAssignment.id);
      
      // إضافة المهمة لواجهة المستخدم
      setAllAssignments(prevAssignments => [finalAssignment, ...prevAssignments]);
      showBlockMessage('تم إنشاء المهمة بنجاح!', 'success');
      handleCancelCreateAssignment();
    } catch (error) {
      console.error('Failed to create assignment:', error);
      showBlockMessage(error.message || 'فشل في إنشاء المهمة', 'error');
    }
=======
  const handleSaveNewAssignment = () => {
    // Basic Validation
    if (!newAssignmentData.title.trim()) {
        showBlockMessage('Assignment title is required.', 'error'); return;
    }
    // No longer need to validate course name as it's not user-input in this dialog
    /* if (!newAssignmentData.course.trim()) {
        showBlockMessage('Course name is required.', 'error'); return;
    } */
    if (newAssignmentData.totalPoints === '' || isNaN(parseInt(newAssignmentData.totalPoints)) || parseInt(newAssignmentData.totalPoints) <= 0) {
        showBlockMessage('Total points must be a positive number.', 'error'); return;
    }
    if (!newAssignmentData.startTime) {
        showBlockMessage('Start time is required.', 'error'); return;
    }
    if (!newAssignmentData.endTime) {
        showBlockMessage('End time is required.', 'error'); return;
    }
    if (new Date(newAssignmentData.startTime) >= new Date(newAssignmentData.endTime)) {
        showBlockMessage('End time must be after start time.', 'error'); return;
    }

    const newId = Date.now();
    const assignmentToAdd = {
        id: newId,
        title: newAssignmentData.title,
        course: newAssignmentData.course,
        instructor: 'DR. Current User',
        status: 'active',
        startTime: newAssignmentData.startTime,
        endTime: newAssignmentData.endTime,
        createdAt: new Date().toISOString(),
        description: newAssignmentData.description,
        progress: 0,
        totalPoints: parseInt(newAssignmentData.totalPoints),
        attachedFiles: newAssignmentData.attachedFiles.map(({ fileObject, isNew, ...rest }) => rest),
        submissions: []
    };

    console.log('New assignment data to save:', assignmentToAdd);
    console.log('Files to upload for new assignment:', newAssignmentData.attachedFiles.filter(f => f.isNew));

    setAllAssignments(prevAssignments => [assignmentToAdd, ...prevAssignments]);
    showBlockMessage('New assignment created successfully!', 'success');
    handleCancelCreateAssignment();
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  };
  // --- End Create New Assignment Functions ---

  // --- Block Message Functions ---
  const showBlockMessage = (message, type = 'info') => {
    setBlockMessage({ isOpen: true, message, type });
  };

  const closeBlockMessage = () => {
    setBlockMessage({ isOpen: false, message: '', type: 'info' });
  };
  // --- End Block Message Functions ---

  return (
     <div className="assignments-container">
          <div className="create-assignment-header">
            <button onClick={handleOpenCreateAssignmentDialog} className="create-assignment-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>
                Create New Assignment
            </button>
          </div>

          {Object.entries(groupedAssignments).map(([course, courseAssignments]) => (
            <div key={course} className="course-section">
          <h2 className="course-header-title">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.34 42">
                    <path d="M5.35,33.53h28.61c.09,0,.17-.01.25-.03,0,0,.01,0,.02,0,.61,0,1.11-.5,1.11-1.11V1.11c0-.61-.5-1.11-1.11-1.11H5.35C2.4,0,0,2.4,0,5.34c0,.04,0,.08.01.12,0,2.72-.04,27.72,0,31.01,0,.06,0,.13,0,.19,0,2.83,2.22,5.15,5.01,5.33.06,0,.11.02.17.02h29.05c.61,0,1.11-.5,1.11-1.11v-4.17c0-.61-.5-1.11-1.11-1.11s-1.11.5-1.11,1.11v3.06H5.35c-1.68,0-3.06-1.34-3.12-3,0-.03,0-.06,0-.09,0-.05,0-.12,0-.22.1-1.64,1.46-2.94,3.12-2.94h0ZM6.1,5.34c0-.61.5-1.11,1.11-1.11s1.11.5,1.11,1.11v22.48c0,.61-.5,1.11-1.11,1.11s-1.11-.5-1.11-1.11V5.34h0Z"/>
               </svg>
<<<<<<< HEAD
                <span>Course :</span> {courseDetails && courseDetails.coursename ? courseDetails.coursename : course}
                {courseDetails && courseDetails.coursecode && <span className="course-code">({courseDetails.coursecode})</span>}
=======
                <span>Course :</span> {course}
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
          </h2>
          
              {courseAssignments.map((assignment) => (
                <div 
                  key={assignment.id} 
                  className="assignment-card" 
                  data-progress={assignment.progress}
                  onClick={() => handleAssignmentClick(assignment)}
                  style={{'--data-progress': assignment.progress}}
                >
                  <h3 className="assignment-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.57 36.63">
                         <path d="M26.7,0H6.87C3.08,0,0,3.08,0,6.87v25.16c0,1.84,1.31,3.79,2.92,4.35,1.56.55,3.31.16,4.47-1.02l9.39-9.34,9.28,9.23c1.23,1.23,3.02,1.68,4.57,1.13,1.76-.59,2.94-2.25,2.93-4.1V6.87c0-3.79-3.08-6.87-6.87-6.87ZM32.04,32.28c0,1.23-.73,2.25-1.91,2.66-1,.35-2.17.04-3-.78l-9.82-9.76c-.3-.29-.78-.29-1.08,0l-9.93,9.88c-.75.77-1.88,1.03-2.89.66-.99-.35-1.9-1.74-1.9-2.91V6.87C1.53,3.92,3.92,1.53,6.87,1.53h19.83c2.95,0,5.34,2.4,5.34,5.34v25.41Z"/>
                    </svg>
                    <span>{assignment.title}</span>
                  </h3>
               <div className="assignment-meta">
                    <div className="assignment-author">
                      <Image src="/images/shadcn.jpg" alt={assignment.instructor} className="author-avatar" width={28} height={28} />
                         <div className="author-info">
                        <span className="author-name">{assignment.instructor}</span>
                              <span className="dot-separator">•</span>
                        <span className="created-at">
                          Created At {isMounted ? formatDate(assignment.createdAt, false) : '...'}
                        </span>
                        <span className={`status-badge ${assignment.status}`}>
                          {formatAssignmentStatus(assignment.status)}
                        </span>
                         </div>
                    </div>
               </div>
                  
                   <div className={assignment.status === 'completed' || assignment.finished ? "finished" : "time-left"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="time-icon" viewBox="0 0 72 72">
                         <path className="cls-1" d="M72,36c0,1.66-1.34,3-3,3s-3-1.34-3-3c-.02-16.56-13.44-29.98-30-30-1.66,0-3-1.34-3-3s1.34-3,3-3c19.87.02,35.98,16.13,36,36ZM48,39c1.66,0,3-1.34,3-3s-1.34-3-3-3h-6.83c-.52-.9-1.27-1.65-2.17-2.17v-9.83c0-1.66-1.34-3-3-3s-3,1.34-3,3v9.83c-2.86,1.65-3.85,5.31-2.2,8.17s5.31,3.85,8.17,2.2c.91-.53,1.67-1.29,2.2-2.2h6.83ZM5.48,20.35c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM6,36c0-1.66-1.34-3-3-3s-3,1.34-3,3,1.34,3,3,3,3-1.34,3-3ZM36,66c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3ZM12.66,9.62c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3h0c0-1.66-1.34-3-3-3ZM23.34,2.52c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3h0c0-1.66-1.34-3-3-3h0ZM5.48,45.65c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM12.66,56.38c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM23.34,63.48c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM66.52,45.65c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3h0ZM59.34,56.38c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3ZM48.66,63.48c-1.66,0-3,1.34-3,3s1.34,3,3,3,3-1.34,3-3-1.34-3-3-3Z"/>
                    </svg>
                      <span className="time-left-text">
                          {assignment.status === 'completed' || assignment.finished ? 'Finished' : 
                          (isMounted ? formatTimeRemaining(new Date(assignment.endTime)) : '...')}
                      </span>
               </div>
          </div>
              ))}
            </div>
          ))}

          {isDialogOpen && selectedAssignment && (
            <div className="assignment-dialog-overlay">
              <div className={`teacher-assignment-dialog ${isEditing ? 'editing' : ''} view-${viewMode}`} ref={dialogRef}> 
                <button className="dialog-close-btn" onClick={closeDialog}>&times;</button>
                
                 <div className="assignment-dialog-header">
                   {viewMode === 'details' && isEditing ? (
                        <input type="text" name="title" value={editedAssignment?.title || ''} onChange={handleEditChange} className="dialog-title-input" placeholder="Assignment Title" />
                    ) : viewMode === 'details' && !isEditing ? (
                        <h2 className="dialog-title">{selectedAssignment.title}</h2>
                    ) : null}
                    {viewMode === 'details' && !isEditing && (
                        <span className={`status-badge ${selectedAssignment.status}`}>{formatAssignmentStatus(selectedAssignment.status)}</span>
                    )}
                    {viewMode === 'submissions' && !isEditing && (
                        <button onClick={() => setViewMode('details')} className="dialog-btn back-btn">&larr; Back to Details</button>
                    )}
                    {viewMode === 'grading' && viewingSubmissionDetails && (
                         <>
                             <h2 className="grading-header-title">Grade Submission: <span className="grading-student-highlight">{viewingSubmissionDetails.studentName}</span></h2>
                             <button onClick={handleCancelGrade} className="dialog-btn back-btn">&larr; Back to Submissions</button>
                         </>
                    )}
                 </div>
                
                <div className="dialog-content">
                  
                  {viewMode === 'details' && (
                      <>
                          <div className="assignment-info-section">
<<<<<<< HEAD
                              <div className="info-item">
                                <h3>Course:</h3>
                                <p>{selectedAssignment.course} {selectedAssignment.courseCode ? `(${selectedAssignment.courseCode})` : ''}</p>
                              </div>
=======
                              <div className="info-item"><h3>Course:</h3><p>{selectedAssignment.course}</p></div>
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
                              <div className="info-item"><h3>Created by:</h3><p>{selectedAssignment.instructor}</p></div>
                              <div className="info-item"><h3>Created on:</h3><p>{isMounted ? formatDate(selectedAssignment.createdAt) : 'Loading...'}</p></div>
                              {!isEditing && (
                                <div className="info-item"><h3>Total Points:</h3><p>{selectedAssignment.totalPoints ?? 'Not Set'}</p></div>
                              )}
                              {isEditing && (
                                <div className="info-item">
                                    <label htmlFor="totalPoints" className="dialog-label">Total Points:</label>
                                    <input 
                                        type="number" 
                                        id="totalPoints" 
                                        name="totalPoints" 
                                        value={editedAssignment?.totalPoints === null || editedAssignment?.totalPoints === undefined ? '' : editedAssignment.totalPoints} 
                                        onChange={handleEditChange} 
                                        className="dialog-input"
                                        placeholder="e.g., 100"
                                        min="0"
                                        required
                                    />
                                </div>
                              )}
                          </div>

                          <div className="assignment-time-section">
                              <h3>Assignment Schedule</h3>
                              <div className="time-details">
                                  <div className="time-item">
                                      <label htmlFor="startTime" className="time-label">Start Time:</label>
                                      {isEditing ? (
                                          <input type="datetime-local" id="startTime" name="startTime" value={formatDateTimeLocal(editedAssignment?.startTime)} onChange={handleDateTimeChange} className="dialog-input"/>
                                      ) : (
                                          <span className="time-value">{isMounted ? formatDate(selectedAssignment.startTime) : 'Loading...'}</span>
                                      )}
                                  </div>
                                  <div className="time-item">
                                      <label htmlFor="endTime" className="time-label">Deadline:</label>
                                      {isEditing ? (
                                          <input type="datetime-local" id="endTime" name="endTime" value={formatDateTimeLocal(editedAssignment?.endTime)} onChange={handleDateTimeChange} className="dialog-input"/>
                                      ) : (
                                          <span className="time-value">{isMounted ? formatDate(selectedAssignment.endTime) : 'Loading...'}</span>
                                      )}
                                      {!isEditing && isMounted && isDeadlineApproaching(selectedAssignment.endTime) && 
                                          <span className="deadline-warning">(Deadline Approaching!)</span>}
                                  </div>
                              </div>
                              {!isEditing && isMounted && selectedAssignment.status !== 'completed' && (
                                  <div className="time-progress-container">
                                      <div className="time-progress-label"><span>Assignment Progress:</span><span>{getElapsedPercentage(selectedAssignment)}% elapsed</span></div>
                                      <div className="time-progress"><div className="time-progress-bar" style={{ width: `${getElapsedPercentage(selectedAssignment)}%` }}></div></div>
                                      <div className="time-remaining">Time remaining: {formatTimeRemaining(new Date(selectedAssignment.endTime))}</div>
                                  </div>
                              )}
                          </div>

                          <div className="dialog-section">
                              <label htmlFor="description" className={`dialog-label ${!isEditing ? 'sr-only' : ''}`}>Description</label>
                              {isEditing ? (
                                  <textarea id="description" name="description" value={editedAssignment?.description || ''} onChange={handleEditChange} className="dialog-textarea" rows={5} placeholder="Assignment Description"/>
                              ) : (
                                  <p className="description-text">{selectedAssignment.description}</p>
                              )}
                          </div>
                          
                          <div className="dialog-section">
                            <h3>Attached Files</h3>
                            {isEditing ? (
                                <> 
                                  <div className="file-list edit-file-list">
                                      {(editedAssignment?.attachedFiles && editedAssignment.attachedFiles.length > 0) ? (
                                          editedAssignment.attachedFiles.map((file) => (
                                              <div key={file.id} className="file-item">
                                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/></svg>
                                                  <div className="file-info">
                                                      <span className="file-name">{file.name}</span>
                                                      <span className="file-size">{file.size} {file.isNew ? '(New)' : ''}</span>
                                                  </div>
                                                  <button className="remove-file-btn" onClick={() => removeEditFile(file.id)} type="button" aria-label={`Remove ${file.name}`}>&times;</button>
                                              </div>
                                          ))
                                      ) : (
                                          <p className="no-files">No files attached.</p>
                                      )}
                                  </div>
                                  <div className="file-upload edit-upload">
                                      <label htmlFor="assignment-edit-file">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                                          <span>Add Files</span>
                                      </label>
                                      <input id="assignment-edit-file" type="file" onChange={handleEditFileChange} style={{ display: 'none' }} multiple/>
                                      {fileError && <div className="file-error">{fileError}</div>}
                                  </div>
                                </> 
                            ) : (
                                <> 
                                  {(selectedAssignment.attachedFiles && selectedAssignment.attachedFiles.length > 0) ? (
                                       <div className="file-list">
                                          {selectedAssignment.attachedFiles.map((file) => (
                                              <div key={file.id} className="file-item downloadable" onClick={() => handleFileDownload(file)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/></svg>
                                                  <div className="file-info"><span className="file-name">{file.name}</span><span className="file-size">{file.size}</span></div>
                                                  <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"/></svg>
                                              </div>
                                          ))}
                                      </div>
                                  ) : (
                                      <p className="no-files">No files attached to this assignment.</p>
                                  )}
                                </> 
                            )}
                          </div>

                          {!isEditing && (
                              <div className="dialog-section submission-summary">
                                  <h3>Submission Status ({totalSubmissions} Students)</h3>
                                  <div className="status-counts">
                                      <span className="count-item submitted">Submitted: {submissionCounts.submitted || 0}</span>
                                      <span className="count-item completed">Graded: {submissionCounts.completed || 0}</span>
                                      <span className="count-item missing">Missing: {submissionCounts.missing || 0}</span>
                                  </div>
                                  
                                  {(selectedAssignment.submissions && selectedAssignment.submissions.length > 0) ? (
                                      <div className="submission-preview">
                                          <h4>Recent Submissions:</h4>
                                          <ul className="submission-preview-list">
                                               {selectedAssignment.submissions.slice(0, 3).map(sub => (
                                                  <li key={`${sub.studentId}-preview`} className="submission-preview-item">
                                                      <span className="student-name">{sub.studentName}</span>
                                                      <span className={`submission-status-badge preview ${sub.status}`}>{formatAssignmentStatus(sub.status)}</span>
                                                  </li>
                                              ))}
                                          </ul>
                                          <button onClick={() => setViewMode('submissions')} className="view-submissions-btn">
                                              View All Submissions
                                          </button>
                                      </div>
                                  ) : (
                                     <p className="no-submissions-summary">No submissions received yet.</p>
                                  )}
                              </div>
                          )}
                      </> 
                  )} 
                  
                  {viewMode === 'submissions' && !isEditing && (
                       <div className="submissions-list-section">
                            {console.log('Checking submissions data:', selectedAssignment?.submissions)} 
                            
                            {(selectedAssignment.submissions && selectedAssignment.submissions.length > 0) ? (
                                <ul className="submissions-list">
                                    {selectedAssignment.submissions.map(sub => (
                                        <li key={sub.studentId} className={`submission-item status-${sub.status}`}>
                                            <div className="student-info-block">
                                                <Image 
                                                    src={sub.avatarUrl || '/images/avatars/default.png'}
                                                    alt={sub.studentName}
                                                    width={32} 
                                                    height={32}
                                                    className="student-avatar-submission"
                                                />
                                                <div className="student-details">
                                                    <span className="student-name">{sub.studentName}</span>
                                                    <span className="student-id">ID: {sub.displayId || 'N/A'}</span>
                                                </div>
                                            </div>
                                            <div className="submission-actions-group">
                                                 <span className={`submission-status-badge ${sub.status}`}>{formatAssignmentStatus(sub.status)}</span>
                                                 {sub.submittedAt && (
                                                      <span className="submission-time">Submitted: {formatDate(sub.submittedAt)}</span>
                                                 )}
                                                 {(typeof sub.pointsAwarded === 'number') && (
                                                      <span className="submission-grade">
                                                          Points: {sub.pointsAwarded}/{selectedAssignment.totalPoints ?? '?'} 
                                                      </span>
                                                 )}
                                                 <button onClick={() => handleViewGradeClick(sub)} className="view-grade-btn">View/Grade</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="no-submissions">No submissions found for this assignment.</p> 
                            )}
                       </div>
                   )}

                   {/* --- Grading View --- */}
                   {viewMode === 'grading' && viewingSubmissionDetails && selectedAssignment && (
                      <div className="grading-section">
                         <div className="grading-student-info">
                              <Image 
                                 src={viewingSubmissionDetails.avatarUrl || '/images/avatars/default.png'}
                                 alt={viewingSubmissionDetails.studentName}
                                 width={40} 
                                 height={40}
                                 className="student-avatar-grading"
                              />
                              <div>
                                 <span className="grading-student-name">{viewingSubmissionDetails.studentName}</span>
                                 <span className="grading-student-id">ID: {viewingSubmissionDetails.displayId || 'N/A'}</span>
                              </div>
                              <span className="grading-submission-time">
                                  {viewingSubmissionDetails.submittedAt 
                                    ? `Submitted: ${formatDate(viewingSubmissionDetails.submittedAt)}` 
                                    : 'Not submitted yet'}
                              </span>
                         </div>

                         <div className="grading-form">
                              <div className="form-group">
                                 <label htmlFor="pointsAwarded" className="dialog-label">
                                    Points Awarded (out of {selectedAssignment.totalPoints ?? '?'})
                                 </label>
                                 <input
                                     type="number"
                                     id="pointsAwarded"
                                     name="pointsAwarded"
                                     value={currentGradeData.pointsAwarded}
                                     onChange={handleGradeChange}
                                     className="dialog-input"
                                     placeholder={`Enter points (0-${selectedAssignment.totalPoints ?? '?'})`}
                                     min="0"
                                     max={selectedAssignment.totalPoints ?? undefined}
                                     required 
                                 />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="feedback" className="dialog-label">Feedback</label>
                                  <textarea
                                      id="feedback"
                                      name="feedback"
                                      value={currentGradeData.feedback}
                                      onChange={handleGradeChange}
                                      className="dialog-textarea"
                                      rows={4}
                                      placeholder="Provide feedback to the student (optional)"
                                  />
                              </div>
                         </div>

                         {/* Display Submitted Files */}
                         {(viewingSubmissionDetails.submittedFiles && viewingSubmissionDetails.submittedFiles.length > 0) && (
                            <div className="submitted-files-section dialog-section">
                                <h3>Student Submitted Files</h3>
                                <div className="file-list submitted-student-files">
                                    {viewingSubmissionDetails.submittedFiles.map((file) => (
                                        <div key={file.id} className="file-item downloadable" onClick={() => handleFileDownload(file)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 2v6h6" /></svg>
                                            <div className="file-info"><span className="file-name">{file.name}</span><span className="file-size">{file.size}</span></div>
                                            <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" /></svg>
                                        </div>
                                    ))}
                    </div>
               </div>
                         )}
                         {(!viewingSubmissionDetails.submittedFiles || viewingSubmissionDetails.submittedFiles.length === 0) && (
                            <div className="submitted-files-section dialog-section"><p className="no-files">Student did not submit any files.</p></div>
                         )}
                      </div>
                   )}
                   {/* --- End Grading View --- */}
                </div>
                
                <div className="dialog-actions">
                   {viewMode === 'details' && isEditing ? (
                     <>
                       <button className="dialog-btn secondary" onClick={handleCancelEdit}>Cancel</button>
                       <button className="dialog-btn primary" onClick={handleSaveChanges}>Save Changes</button>
                     </>
                   ) : viewMode === 'details' && !isEditing ? (
                     <>
                       <button 
                           className="dialog-btn danger" 
                           onClick={() => handleDeleteAssignment(selectedAssignment)}
                        >
                           Delete Assignment
                        </button>
                        <button className="dialog-btn secondary" onClick={closeDialog}>Close</button>
                        <div style={{ flexGrow: 1 }}></div> 
                        <button className="dialog-btn primary" onClick={handleEditClick}>Edit Assignment</button>
                     </>
                   ) : ( 
                      <button className="dialog-btn secondary" onClick={closeDialog}>Close</button>
                   )}
                   {/* Add Grading Action Buttons */}
                   {viewMode === 'grading' && (
                     <>
                       <button className="dialog-btn secondary" onClick={handleCancelGrade}>Cancel</button>
                       <button className="dialog-btn primary" onClick={handleSaveGrade}>Save Grade</button>
                     </>
                   )}
               </div>
          </div>
          </div>
          )}

          {/* Custom Delete Confirmation Modal */}
          {showDeleteConfirmModal && assignmentToDelete && (
            <div className="custom-confirm-overlay">
              <div className="custom-confirm-dialog">
                <h3 className="confirm-dialog-title">Confirm Deletion</h3>
                <p className="confirm-dialog-message">
                  Are you sure you want to delete the assignment: <br />
                  <strong>{assignmentToDelete.title}</strong>?
                  <br /><br />
                  This action cannot be undone.
                </p>
                <div className="confirm-dialog-actions">
                  <button className="dialog-btn secondary" onClick={cancelDelete}>Cancel</button>
                  <button className="dialog-btn danger" onClick={confirmActualDelete}>Delete Assignment</button>
                </div>
              </div>
                         </div>
          )}

          {/* Create New Assignment Dialog */}
          {isCreatingAssignment && (
            <div className="assignment-dialog-overlay">
                <div className="teacher-assignment-dialog is-creating" ref={dialogRef}>
                    <button className="dialog-close-btn" onClick={handleCancelCreateAssignment}>&times;</button>
                    <div className="assignment-dialog-header">
                        <h2 className="dialog-title">Create New Assignment</h2>
                        {/* Display Course Name and ID in Header for Create Dialog */}
                        {newAssignmentData.course && (
                            <span className="dialog-course-subtitle">
                                {newAssignmentData.course}
<<<<<<< HEAD
                                {courseDetails && courseDetails.coursecode && (
                                    <span className="course-code">({courseDetails.coursecode})</span>
                                )}
=======
                                {newAssignmentData.courseId && <span className="course-id-display"> ({newAssignmentData.courseId})</span>}
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
                            </span>
                        )}
                    </div>
                    <div className="dialog-content">
                        <div className="dialog-section">
                            <label htmlFor="newTitle" className="dialog-label">Assignment Title*</label>
                            <input type="text" id="newTitle" name="title" value={newAssignmentData.title} onChange={handleNewAssignmentChange} className="dialog-input" placeholder="e.g., Midterm Project Proposal" required />
                        </div>

                        <div className="assignment-info-section">
                            <div className="info-item">
                                <label htmlFor="newTotalPoints" className="dialog-label">Total Points*</label>
                                <input type="number" id="newTotalPoints" name="totalPoints" value={newAssignmentData.totalPoints} onChange={handleNewAssignmentChange} className="dialog-input" placeholder="e.g., 100" min="0" required />
                            </div>
                        </div>

                        <div className="assignment-time-section">
                            <h3>Assignment Schedule*</h3>
                            <div className="time-details">
                                <div className="time-item">
                                    <label htmlFor="newStartTime" className="time-label">Start Time:</label>
                                    <input type="datetime-local" id="newStartTime" name="startTime" value={formatDateTimeLocal(newAssignmentData.startTime)} onChange={handleNewAssignmentDateTimeChange} className="dialog-input" required/>
                                </div>
                                <div className="time-item">
                                    <label htmlFor="newEndTime" className="time-label">Deadline:</label>
                                    <input type="datetime-local" id="newEndTime" name="endTime" value={formatDateTimeLocal(newAssignmentData.endTime)} onChange={handleNewAssignmentDateTimeChange} className="dialog-input" required/>
               </div>
               </div>
          </div>

                        <div className="dialog-section">
                            <label htmlFor="newDescription" className="dialog-label">Description</label>
                            <textarea id="newDescription" name="description" value={newAssignmentData.description} onChange={handleNewAssignmentChange} className="dialog-textarea" rows={5} placeholder="Assignment Description (objectives, instructions, etc.)"/>
                        </div>

                        <div className="dialog-section">
                            <h3>Attach Files</h3>
                            <div className="file-list edit-file-list">
                                {(newAssignmentData.attachedFiles && newAssignmentData.attachedFiles.length > 0) ? (
                                    newAssignmentData.attachedFiles.map((file) => (
                                        <div key={file.id} className="file-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 2v6h6" /></svg>
                                            <div className="file-info"><span className="file-name">{file.name}</span><span className="file-size">{file.size} (New)</span></div>
                                            <button className="remove-file-btn" onClick={() => removeNewAssignmentFile(file.id)} type="button">&times;</button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-files">No files attached yet.</p>
                                )}
                            </div>
                            <div className="file-upload edit-upload">
                                <label htmlFor="newAssignmentFile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                                    <span>Add Files</span>
                                </label>
                                <input id="newAssignmentFile" type="file" onChange={handleNewAssignmentFileChange} style={{ display: 'none' }} multiple/>
                                {fileError && <div className="file-error">{fileError}</div>}
                            </div>
                         </div>
                    </div>
                    <div className="dialog-actions">
                        <button className="dialog-btn secondary" onClick={handleCancelCreateAssignment}>Cancel</button>
                        <button className="dialog-btn primary" onClick={handleSaveNewAssignment}>Create Assignment</button>
               </div>
          </div>
          </div>
          )}

          {/* Custom Block Message Modal */}
          {blockMessage.isOpen && (
            <div className={`custom-block-message-overlay type-${blockMessage.type}`}>
                <div className={`custom-block-message-dialog type-${blockMessage.type}`}>
                    <div className="block-message-header"><span className="block-message-title">{blockMessage.type.charAt(0).toUpperCase() + blockMessage.type.slice(1)}</span></div>
                    <p className="block-message-content">{blockMessage.message}</p>
                    <div className="block-message-actions">
                        <button className={`dialog-btn ${blockMessage.type === 'error' || blockMessage.type === 'warning' ? 'danger' : 'primary'}`} onClick={closeBlockMessage}>OK</button>
                    </div>
                </div>
            </div>
          )}
     </div>
  );
}