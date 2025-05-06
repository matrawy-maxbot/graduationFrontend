'use client';

import { useState, useEffect, useRef } from 'react';

export function useChat() {
    // State management
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [directMessages, setDirectMessages] = useState(new Map([
        ['1', {
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
            status: 'online',
            lastMessage: 'Hey, how are you?',
            lastTime: '12:30',
            unread: 2
        }],
        ['2', {
            name: 'Jane Smith',
            avatar: 'https://i.pravatar.cc/150?img=2',
            status: 'offline',
            lastMessage: 'Thanks for the help!',
            lastTime: '11:45',
            unread: 5
        }],
        ['3', {
            name: 'Mike Johnson',
            avatar: 'https://i.pravatar.cc/150?img=3',
            status: 'online',
            lastMessage: 'Let\'s meet tomorrow',
            lastTime: '10:15',
            unread: 1
        }]
    ]));
    const [originalDirectMessages, setOriginalDirectMessages] = useState(directMessages);
    const [currentReplyMessage, setCurrentReplyMessage] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeMessageMenu, setActiveMessageMenu] = useState(null);
    const [showReplyContainer, setShowReplyContainer] = useState(false);
    const [replyInfo, setReplyInfo] = useState({ author: '', text: '' });

    // Refs for DOM elements
    const messageInputRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const fileUploadRef = useRef(null);

    // Initialize messages when chat is selected
    useEffect(() => {
        if (currentChat) {
            const defaultMessages = {
                '1': [
                    {
                        id: 1,
                        sender: 'John Doe',
                        avatar: 'https://i.pravatar.cc/150?img=1',
                        content: 'Hello! How can I help you today?',
                        timestamp: '12:00 PM',
                        isSystem: false
                    },
                    {
                        id: 2,
                        sender: 'You',
                        avatar: 'https://i.pravatar.cc/150?img=4',
                        content: 'I need help with my project',
                        timestamp: '12:05 PM',
                        isSystem: false
                    },
                    {
                        id: 3,
                        sender: 'John Doe',
                        avatar: 'https://i.pravatar.cc/150?img=1',
                        content: 'Sure, what kind of project is it?',
                        timestamp: '12:10 PM',
                        isSystem: false
                    }
                ],
                '2': [
                    {
                        id: 1,
                        sender: 'Jane Smith',
                        avatar: 'https://i.pravatar.cc/150?img=2',
                        content: 'Hi there!',
                        timestamp: '11:30 AM',
                        isSystem: false
                    },
                    {
                        id: 2,
                        sender: 'You',
                        avatar: 'https://i.pravatar.cc/150?img=4',
                        content: 'Hello! How are you?',
                        timestamp: '11:35 AM',
                        isSystem: false
                    }
                ],
                '3': [
                    {
                        id: 1,
                        sender: 'Mike Johnson',
                        avatar: 'https://i.pravatar.cc/150?img=3',
                        content: 'Good morning!',
                        timestamp: '10:00 AM',
                        isSystem: false
                    },
                    {
                        id: 2,
                        sender: 'You',
                        avatar: 'https://i.pravatar.cc/150?img=4',
                        content: 'Morning! Ready for the meeting?',
                        timestamp: '10:05 AM',
                        isSystem: false
                    },
                    {
                        id: 3,
                        sender: 'Mike Johnson',
                        avatar: 'https://i.pravatar.cc/150?img=3',
                        content: 'Yes, I\'ll be there in 10 minutes',
                        timestamp: '10:10 AM',
                        isSystem: false
                    }
                ]
            };
            setMessages(defaultMessages[currentChat] || []);
        }
    }, [currentChat]);

    // Handle channel switching
    const handleChannelClick = (userId) => {
        const userData = directMessages.get(userId);
        if (!userData) return;
        
        // Update current chat
        setCurrentChat(userId);
        
        // Reset unread count
        const updatedMessages = new Map(directMessages);
        updatedMessages.get(userId).unread = 0;
        setDirectMessages(updatedMessages);
    };

    // Message menu functionality
    const handleMessageMenuClick = (e, messageId) => {
        e.stopPropagation();
        setActiveMessageMenu(activeMessageMenu === messageId ? null : messageId);
    };

    // Handle message actions
    const handleMessageAction = (action, message) => {
        switch (action) {
            case 'reply':
                setReplyInfo({
                    author: message.sender,
                    text: message.content
                });
                setShowReplyContainer(true);
                break;
            case 'copy':
                navigator.clipboard.writeText(message.content);
                break;
            case 'forward':
                // Implement forward functionality
                break;
            case 'delete':
                setMessages(prev => prev.filter(m => m.id !== message.id));
                break;
            case 'emoji':
                // Add emoji reaction to message
                const updatedMessages = messages.map(m => {
                    if (m.id === message.id) {
                        return {
                            ...m,
                            content: m.content + ' ' + message.emoji
                        };
                    }
                    return m;
                });
                setMessages(updatedMessages);
                break;
        }
        setActiveMessageMenu(null);
    };

    // Add new message to chat
    const addMessage = (message) => {
        const newMessage = {
            ...message,
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prevMessages => [...prevMessages, newMessage]);
        
        // Scroll to bottom
        setTimeout(() => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        }, 0);
    };

    // Send message
    const sendMessage = (text) => {
        if (!text.trim() || !currentChat) return;
         
        const userData = directMessages.get(currentChat);
        if (!userData) return;
         
        // Add message to chat
        addMessage({
            sender: 'You',
            avatar: 'https://i.pravatar.cc/150?img=4',
            content: text,
            isReply: showReplyContainer,
            replyTo: showReplyContainer ? replyInfo : null
        });

        // Clear input and reply container
        if (messageInputRef.current) {
            messageInputRef.current.value = '';
        }
        setShowReplyContainer(false);
        setReplyInfo({ author: '', text: '' });
         
        // Simulate reply (for demo purposes)
        setTimeout(() => {
            addMessage({
                sender: userData.name,
                avatar: userData.avatar,
                content: 'This is a demo reply message.',
                timestamp: new Date().toLocaleTimeString()
            });
        }, 1000);
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (file.type.startsWith('image/')) {
                    addMessage({
                        sender: 'You',
                        avatar: 'https://i.pravatar.cc/150?img=4',
                        content: `<img src="${e.target.result}" alt="Uploaded image" style="max-width: 300px; border-radius: 4px;">`,
                        timestamp: new Date().toLocaleTimeString()
                    });
                } else {
                    addMessage({
                        sender: 'You',
                        avatar: 'https://i.pravatar.cc/150?img=4',
                        content: `📎 ${file.name}`,
                        timestamp: new Date().toLocaleTimeString()
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Emoji picker functionality
    const toggleEmojiPicker = (e) => {
        e.stopPropagation();
        setShowEmojiPicker(!showEmojiPicker);
    };

    const addEmoji = (emoji) => {
        if (messageInputRef.current) {
            messageInputRef.current.value += emoji;
            setShowEmojiPicker(false);
            messageInputRef.current.focus();
        }
    };

    // Handle clicks outside emoji picker
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Search functionality
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        
        // If search term is empty, restore original messages
        if (!searchValue) {
            setDirectMessages(originalDirectMessages);
            return;
        }
        
        // Filter direct messages based on search term
        const filteredMessages = new Map();
        originalDirectMessages.forEach((userData, userId) => {
            if (userData.name.toLowerCase().includes(searchValue)) {
                filteredMessages.set(userId, userData);
            }
        });
        
        setDirectMessages(filteredMessages);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.message-actions-menu')) {
                setActiveMessageMenu(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return {
        // State
        messages,
        currentChat,
        directMessages,
        showEmojiPicker,
        searchTerm,
        activeMessageMenu,
        showReplyContainer,
        replyInfo,

        // Refs
        messageInputRef,
        messagesContainerRef,
        emojiPickerRef,
        fileUploadRef,

        // Functions
        handleChannelClick,
        handleMessageMenuClick,
        handleMessageAction,
        sendMessage,
        handleFileUpload,
        toggleEmojiPicker,
        addEmoji,
        handleSearch,
        setShowReplyContainer,
        setReplyInfo
    };
} 