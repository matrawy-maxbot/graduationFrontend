'use client';

import { useChat } from './components/script';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './styles/page.css';

export default function Inbox() {
    const {
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
    } = useChat();

    // Handle message input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = messageInputRef.current.value.trim();
            if (message) {
                sendMessage(message);
            }
        }
    };

    return (
        <div className="chat-container">
            {/* Channels Sidebar */}
            <div className="channels-sidebar">
                <div className="channels-header">
                    <h2>Direct Messages</h2>
                </div>
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
                <div className="channels-list">
                    {Array.from(directMessages.entries()).map(([userId, userData]) => (
                        <div 
                            key={userId}
                            className={`channel-item ${currentChat === userId ? 'active' : ''}`}
                            data-user-id={userId}
                            onClick={() => handleChannelClick(userId)}
                        >
                            <div className="channel-avatar">
                                <img src={userData.avatar} alt={userData.name} />
                                <span className={`channel-status ${userData.status}`}></span>
                            </div>
                            <div className="channel-info">
                                <div className="channel-name">{userData.name}</div>
                                <div className="channel-preview">{userData.lastMessage}</div>
                            </div>
                            <div className="channel-meta">
                                <span className="channel-time">{userData.lastTime}</span>
                                {userData.unread > 0 && (
                                    <span className="unread-badge active">{userData.unread}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="chat-area">
                {currentChat ? (
                    <>
                        <div className="chat-header">
                            <div className="chat-user-info">
                                <div className="chat-user-avatar">
                                    <img src={directMessages.get(currentChat)?.avatar} alt="User Avatar" />
                                    <span className={`chat-user-status ${directMessages.get(currentChat)?.status}`}></span>
                                </div>
                                <div className="chat-user-details">
                                    <span className="chat-user-name">{directMessages.get(currentChat)?.name}</span>
                                    <span className="chat-user-status-text">{directMessages.get(currentChat)?.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="messages-container" ref={messagesContainerRef}>
                            {messages.map((message) => (
                                <div key={message.id} className="message">
                                    <div className="message-avatar">
                                        <img src={message.avatar} alt={message.sender} />
                                    </div>
                                    <div className="message-content">
                                        <div className="message-header">
                                            <span className="message-author">{message.sender}</span>
                                            <span className="message-time">{message.timestamp}</span>
                                        </div>
                                        {message.isReply && message.replyTo && (
                                            <div className="reply-preview">
                                                <span className="reply-author">{message.replyTo.author}</span>
                                                <span className="reply-text">{message.replyTo.text}</span>
                                            </div>
                                        )}
                                        <div className="message-text" dangerouslySetInnerHTML={{ __html: message.content }}></div>
                                        <div className="message-actions-menu">
                                            <button 
                                                className="message-menu-btn" 
                                                title="المزيد"
                                                onClick={(e) => handleMessageMenuClick(e, message.id)}
                                            >
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="5" r="1.5"/>
                                                    <circle cx="12" cy="12" r="1.5"/>
                                                    <circle cx="12" cy="19" r="1.5"/>
                                                </svg>
                                            </button>
                                            {activeMessageMenu === message.id && (
                                                <div className="message-dropdown-menu">
                                                    <div className="dropdown-item" onClick={() => handleMessageAction('reply', message)}>
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <g>
                                                                    <path d="M7.707 3.293a1 1 0 0 1 0 1.414L5.414 7H11a7 7 0 0 1 7 7v2a1 1 0 0 1-2 0v-2a5 5 0 0 0-5-5H5.414l2.293 2.293a1 1 0 1 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0z"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                        reply
                                                    </div>
                                                    <div className="dropdown-item" onClick={() => handleMessageAction('copy', message)}>
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                                <g>
                                                                    <path d="M271 512H80c-44.113 0-80-35.887-80-80V161c0-44.113 35.887-80 80-80h191c44.113 0 80 35.887 80 80v271c0 44.113-35.887 80-80 80zM80 121c-22.055 0-40 17.945-40 40v271c0 22.055 17.945 40 40 40h191c22.055 0 40-17.945 40-40V161c0-22.055-17.945-40-40-40zm351 261V80c0-44.113-35.887-80-80-80H129c-11.047 0-20 8.953-20 20s8.953 20 20 20h222c22.055 0 40 17.945 40 40v302c0 11.047 8.953 20 20 20s20-8.953 20-20zm0 0"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                        copy
                                                    </div>
                                                    <div className="dropdown-item" onClick={() => handleMessageAction('forward', message)}>
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                <g>
                                                                    <path d="m23.772 10.462-8.5-8.25a.752.752 0 0 0-.814-.153.752.752 0 0 0-.458.691v4.252C6.257 7.136 0 13.476 0 21.25c0 .342.241.622.572.708a.715.715 0 0 0 .177.022.788.788 0 0 0 .678-.404A12.754 12.754 0 0 1 12.582 15H14v4.25c0 .301.181.573.458.691a.752.752 0 0 0 .814-.153l8.5-8.25a.747.747 0 0 0 0-1.076z"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                        forward
                                                    </div>
                                                    <div className="dropdown-divider"></div>
                                                    <div className="dropdown-emojis">
                                                        <span className="emoji" onClick={() => handleMessageAction('emoji', { ...message, emoji: '🙏' })}>🙏</span>
                                                        <span className="emoji" onClick={() => handleMessageAction('emoji', { ...message, emoji: '😢' })}>😢</span>
                                                        <span className="emoji" onClick={() => handleMessageAction('emoji', { ...message, emoji: '😮' })}>😮</span>
                                                        <span className="emoji" onClick={() => handleMessageAction('emoji', { ...message, emoji: '😂' })}>😂</span>
                                                        <span className="emoji" onClick={() => handleMessageAction('emoji', { ...message, emoji: '❤️' })}>❤️</span>
                                                        <span className="emoji" onClick={() => handleMessageAction('emoji', { ...message, emoji: '👍' })}>👍</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="message-input-container">
                            {showReplyContainer && (
                                <div className="reply-container">
                                    <div className="reply-info">
                                        <div className="reply-author">{replyInfo.author}</div>
                                        <div className="reply-text">{replyInfo.text}</div>
                                        <button className="cancel-reply-btn" onClick={() => setShowReplyContainer(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="message-input-wrapper">
                                <input 
                                    type="text" 
                                    placeholder="Send a message..." 
                                    className="message-input"
                                    ref={messageInputRef}
                                    onKeyPress={handleKeyPress}
                                />
                                <div className="message-actions">
                                    <label className="file-upload-label">
                                        <input 
                                            type="file" 
                                            className="file-upload" 
                                            accept="image/*,.pdf,.doc,.docx"
                                            ref={fileUploadRef}
                                            onChange={handleFileUpload}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                        </svg>
                                    </label>
                                    <button className="message-action-btn" onClick={toggleEmojiPicker}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                                        </svg>
                                    </button>
                                    {showEmojiPicker && (
                                        <div className="emoji-picker" ref={emojiPickerRef}>
                                            <div className="dropdown-emojis">
                                                <span className="emoji" onClick={() => addEmoji('🙏')}>🙏</span>
                                                <span className="emoji" onClick={() => addEmoji('😢')}>😢</span>
                                                <span className="emoji" onClick={() => addEmoji('😮')}>😮</span>
                                                <span className="emoji" onClick={() => addEmoji('😂')}>😂</span>
                                                <span className="emoji" onClick={() => addEmoji('❤️')}>❤️</span>
                                                <span className="emoji" onClick={() => addEmoji('👍')}>👍</span>
                                                <span className="emoji" onClick={() => addEmoji('😊')}>😊</span>
                                                <span className="emoji" onClick={() => addEmoji('😍')}>😍</span>
                                                <span className="emoji" onClick={() => addEmoji('😎')}>😎</span>
                                                <span className="emoji" onClick={() => addEmoji('🤔')}>🤔</span>
                                                <span className="emoji" onClick={() => addEmoji('🙄')}>🙄</span>
                                                <span className="emoji" onClick={() => addEmoji('😴')}>😴</span>
                                            </div>
                                        </div>
                                    )}
                                    <button className="message-action-btn" onClick={() => sendMessage(messageInputRef.current.value)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M22.101 10.562 2.753 1.123A1.219 1.219 0 0 0 1 2.22v.035a2 2 0 0 0 .06.485l1.856 7.424a.5.5 0 0 0 .43.375l8.157.907a.559.559 0 0 1 0 1.11l-8.157.907a.5.5 0 0 0-.43.375L1.06 21.261a2 2 0 0 0-.06.485v.035a1.219 1.219 0 0 0 1.753 1.096L22.1 13.438a1.6 1.6 0 0 0 0-2.876z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        <h3>Select a chat to start messaging</h3>
                    </div>
                )}
            </div>
        </div>
    );
}