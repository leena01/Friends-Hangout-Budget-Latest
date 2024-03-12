import React, { useContext, useState, useEffect } from 'react';
import './StickyNote.css';
import { AuthContext } from '../GroupOptions/AuthContext.js';

const StickyNote = ({ initialContent, onUpdateContent }) => {
    const { user } = useContext(AuthContext);
    const userEmail = user.email; // Assuming email is stored in user.email

    // Extracting name from email
    const userName = userEmail.split('@')[0];

    // Initialize content state with the initial content
    const [content, setContent] = useState(initialContent || '');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Update content when the initialContent prop changes
        setContent(initialContent || '');
    }, [initialContent]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        onUpdateContent(newContent,userName); // Pass the new content to the parent component
    };

    return (
        <div
            className="sticky-note"
            style={{ top: position.y, left: position.x }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="sticky-heading">
                {userName}
            </div>
            <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Type something..."
            />
        </div>
    );
};

export default StickyNote;
