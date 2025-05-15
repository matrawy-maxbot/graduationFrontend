'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/CreateGroupDialog.css';
import Image from 'next/image';
// import TableManager from '@/components/TableManager'; // Remove TableManager import

const TABLE_HEADERS_CONFIG_AVAILABLE = [
  { id: "student", label: "Available People" }, // Combined header for clarity
  { id: "role", label: "Role" },
  { id: "select", label: "Select" }
];

const TABLE_HEADERS_CONFIG_SELECTED = [
  { id: "student", label: "Selected People" }, // Combined header
  { id: "role", label: "Role" },
  { id: "action", label: "Action" }
];

export default function CreateGroupDialog({ isOpen, onClose, onGroupCreate }) {
  // console.log('[CreateGroupDialog] Component Rerendered. isOpen:', isOpen); // Keep logs for now if helpful
  const [groupName, setGroupName] = useState('');
  const [formInteracted, setFormInteracted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [people, setPeople] = useState([]);
  const [selectedPeopleIdsInternal, setSelectedPeopleIdsInternal] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  // const tableManagerRef = useRef(null); // No longer needed
  // const tableContainerRef = useRef(null); // No longer needed if table is inline
  const searchInputRef = useRef(null);

  const allPeople = [
    { id: 1, name: 'John Doe', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=1', status: 'excellent' },
    { id: 2, name: 'Jane Smith', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=2', status: 'good' },
    { id: 3, name: 'Dr. Mohamed Saleh', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=3', status: 'average' },
    { id: 4, name: 'Eng. Huda Kamel', role: 'Teaching Assistant', avatar: 'https://i.pravatar.cc/150?img=4', status: 'good' },
    { id: 5, name: 'Ali Hassan', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=5', status: 'excellent' },
    { id: 6, name: 'Sarah Ibrahim', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=6', status: 'average' },
    { id: 7, name: 'Dr. Laila Rashid', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=7', status: 'excellent' },
  ];

  useEffect(() => {
    // console.log('[CreateGroupDialog] Setting initial people data');
    setPeople(allPeople);
  }, []);

  const filteredByRolePeople = useMemo(() => {
    // console.log('[CreateGroupDialog] Recalculating filteredByRolePeople memo. Dependencies: people, selectedFilter');
    if (selectedFilter === 'All') {
      return people;
    }
    return people.filter(person => {
      if (selectedFilter === 'Students') return person.role === 'Student';
      if (selectedFilter === 'Doctors') return person.role === 'Doctor';
      if (selectedFilter === 'Teaching Assistants') return person.role === 'Teaching Assistant';
      if (selectedFilter === 'Admins') return person.role === 'Admin';
      return true;
    });
  }, [people, selectedFilter]);

  const availablePeople = useMemo(() => {
    let list = filteredByRolePeople;
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      list = list.filter(person => 
        person.name.toLowerCase().includes(lowerSearchTerm) || 
        person.id.toString().toLowerCase().includes(lowerSearchTerm) ||
        person.role.toLowerCase().includes(lowerSearchTerm)
      );
    }
    // Exclude people who are already selected
    return list.filter(person => !selectedPeopleIdsInternal.has(person.id));
  }, [filteredByRolePeople, searchTerm, selectedPeopleIdsInternal]);

  const selectedPeopleData = useMemo(() => {
    return people.filter(person => selectedPeopleIdsInternal.has(person.id));
  }, [people, selectedPeopleIdsInternal]);

  useEffect(() => {
    // console.log('[CreateGroupDialog] Effect to (potentially) clear selections. Dependency: availablePeople');
    // No direct action needed on selectedPeopleIdsInternal here because availablePeople already excludes them.
    // If we had checkboxes on availablePeople that could get out of sync, this might be different.
  }, [availablePeople]);

  const handleAddPerson = (personId) => {
    setSelectedPeopleIdsInternal(prevSelectedIds => new Set(prevSelectedIds).add(personId));
  };

  const handleRemovePerson = (personId) => {
    setSelectedPeopleIdsInternal(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      newSelectedIds.delete(personId);
      return newSelectedIds;
    });
  };

  const handleCreateGroup = () => {
    setFormInteracted(true);
    if (!groupName.trim()) {
      console.warn('[CreateGroupDialog] Attempted to create group with empty name.');
      return;
    }
    
    // Construct the new group object
    // You might want to resolve selected IDs to actual people objects if needed by the parent
    // For now, sending IDs. The parent can decide how to use them.
    // Also, generate a unique ID for the new group client-side for key prop in list.
    const newGroup = {
      id: `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Simple unique ID
      title: groupName,
      membersCount: selectedPeopleIdsInternal.size, // Or get full member details if needed
      // Assuming the creator is the current admin/user - this needs to be passed or determined
      authorName: "Current Admin", // Placeholder - this should be dynamic
      authorAvatar: "https://i.pravatar.cc/150?img=0", // Placeholder avatar
      createdAt: new Date().toLocaleDateString(),
      lastEditAt: new Date().toLocaleString(),
      // Add any other relevant properties that a group card might need
      // For example, if you want to show actual selected members in the card, you'd pass them here.
      // selectedMembers: people.filter(p => selectedPeopleIdsInternal.has(p.id))
    };

    console.log('[CreateGroupDialog] Creating new group:', newGroup);
    
    if (onGroupCreate) {
      onGroupCreate(newGroup); // Pass the new group data to the parent
    }
    
    onClose(); // Close the dialog after attempting to create
  };

  useEffect(() => {
    // console.log('[CreateGroupDialog] Effect for isOpen change. isOpen:', isOpen, 'Dependencies: isOpen');
    if (isOpen) {
        // console.log('[CreateGroupDialog] Resetting state because dialog is open.');
        setGroupName('');
        setFormInteracted(false);
        setSelectedFilter('All');
        setSelectedPeopleIdsInternal(new Set());
        setSearchTerm('');
        if(searchInputRef.current) searchInputRef.current.value = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filters = ['All', 'Students', 'Doctors', 'Teaching Assistants', 'Admins'];
  // Headers for the two tables
  const availableTableHeaders = TABLE_HEADERS_CONFIG_AVAILABLE;
  const selectedTableHeaders = TABLE_HEADERS_CONFIG_SELECTED;

  const isCreateDisabled = !groupName.trim();
  const showGroupNameError = formInteracted && !groupName.trim();

  const handleGroupNameChange = (e) => {
    setFormInteracted(true);
    setGroupName(e.target.value);
  }

  const handleFilterChange = (filter) => {
    setFormInteracted(true);
    setSelectedFilter(filter);
  }

  const handleSearchTermChange = (e) => {
    setFormInteracted(true);
    setSearchTerm(e.target.value);
  }
  
  const handleGroupNameBlur = () => {
    setFormInteracted(true);
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-content dialog-content-two-tables"> {/* Added class for potential specific styling */}
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Create New Group</h2>
        
        <div className="form-group">
          <label htmlFor="groupName">Group Name <span className="required-star">*</span></label>
          <input 
            type="text" 
            id="groupName" 
            value={groupName} 
            onChange={handleGroupNameChange}
            onBlur={handleGroupNameBlur}
            placeholder="Enter group name"
            aria-required="true"
            className={showGroupNameError ? 'input-error' : ''}
          />
          {showGroupNameError && <p className="error-message">Group name is required.</p>}
        </div>

        <div className="filter-list">
          {filters.map(filter => (
            <button 
              key={filter} 
              className={`filter-button ${selectedFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="form-group">
          <input 
            type="text" 
            ref={searchInputRef} 
            placeholder="Search available people..."
            className={`search-input-field ${showGroupNameError ? '' : ''}`}
            onChange={handleSearchTermChange}
            value={searchTerm}
          />
        </div>

        <div className="two-tables-layout"> {/* Wrapper for side-by-side tables */}
          {/* Available People Table */}
          <div className="table-section available-people-section">
            {/* <h3>Available</h3> */}
            <div className="people-table-container people-table-container-available">
              <table>
                <thead>
                  <tr>
                    {availableTableHeaders.map(header => (
                      <th key={header.id} className={`th-${header.id}`}>{header.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {availablePeople.length > 0 ? (
                    availablePeople.map(person => (
                      <tr key={person.id}>
                        <td className="td-student">
                          <div className="student-info-cell">
                            <Image 
                              src={person.avatar} 
                              alt={person.name} 
                              width={32}
                              height={32}
                              className="student-avatar-img"
                            />
                            <div className="student-details">
                              <div className="student-name-table">{person.name}</div>
                              <div className="student-id-table">ID: {person.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="td-role">{person.role}</td>
                        <td className="td-select">
                          <button className="action-button add-person-btn" onClick={() => handleAddPerson(person.id)} title="Add Person">Add</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={availableTableHeaders.length} className="no-data-message">{searchTerm ? 'No available people match your search.' : 'No available people for this filter.'}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected People Table */}
          <div className="table-section selected-people-section">
            {/* <h3>Selected</h3> */}
            <div className="people-table-container people-table-container-selected">
              <table>
                <thead>
                  <tr>
                    {selectedTableHeaders.map(header => (
                      <th key={header.id} className={`th-${header.id}`}>{header.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedPeopleData.length > 0 ? (
                    selectedPeopleData.map(person => (
                      <tr key={person.id}>
                        <td className="td-student">
                          <div className="student-info-cell">
                            <Image 
                              src={person.avatar} 
                              alt={person.name} 
                              width={32}
                              height={32}
                              className="student-avatar-img"
                            />
                            <div className="student-details">
                              <div className="student-name-table">{person.name}</div>
                              <div className="student-id-table">ID: {person.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="td-role">{person.role}</td>
                        <td className="td-action">
                          <button className="action-button remove-person-btn" onClick={() => handleRemovePerson(person.id)} title="Remove Person">Remove</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={selectedTableHeaders.length} className="no-data-message">No people selected yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="dialog-actions">
          <button 
            className="create-button" 
            onClick={handleCreateGroup} 
            disabled={isCreateDisabled}
            title={isCreateDisabled ? "Please enter a group name" : "Create Group"}
          >
            Create
          </button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
} 