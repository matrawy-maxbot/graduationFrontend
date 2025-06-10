<<<<<<< HEAD
'use client';

export default function DeleteConfirmDialog({ isOpen, onCancel, onConfirm, title, message, confirmText }) {
  if (!isOpen) return null;

  return (
    <div className="delete-confirm-overlay">
      <div className="delete-confirm-container">
        <h2 className="delete-confirm-title">{title || 'Confirm Deletion'}</h2>
        
        <p className="delete-confirm-message">
          {message || 'Are you sure you want to delete this session?'}
        </p>
        
        <p className="delete-confirm-warning">
          This action cannot be undone.
        </p>
        
        <div className="delete-confirm-actions">
          <button 
            className="delete-confirm-cancel" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="delete-confirm-button" 
            onClick={onConfirm}
          >
            {confirmText || 'Delete Session'}
          </button>
        </div>
      </div>
    </div>
  );
=======
'use client';

export default function DeleteConfirmDialog({ isOpen, onCancel, onConfirm, title, message, confirmText }) {
  if (!isOpen) return null;

  return (
    <div className="delete-confirm-overlay">
      <div className="delete-confirm-container">
        <h2 className="delete-confirm-title">{title || 'Confirm Deletion'}</h2>
        
        <p className="delete-confirm-message">
          {message || 'Are you sure you want to delete this session?'}
        </p>
        
        <p className="delete-confirm-warning">
          This action cannot be undone.
        </p>
        
        <div className="delete-confirm-actions">
          <button 
            className="delete-confirm-cancel" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="delete-confirm-button" 
            onClick={onConfirm}
          >
            {confirmText || 'Delete Session'}
          </button>
        </div>
      </div>
    </div>
  );
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
} 