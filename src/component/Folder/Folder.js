import React, { useState } from 'react';
import StickyNote from '../StickyNote/StickyNote.js';
import './Folder.css';

const Folder = ({ user }) => {
    const [stickyNotes, setStickyNotes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showNotes, setShowNotes] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const toggleShowNotes = () => {
        setShowNotes(!showNotes);
    };

    const addStickyNote = () => {
        const newStickyNote = {
            id: Date.now(),
            content: '',
        };
        setStickyNotes([...stickyNotes, newStickyNote]);
    };

    return (
        <div className="folder">
            <div className="folder-header" onClick={handleClick}>
                {user}'s Folder
            </div>
            {isOpen && (
                <div className="sticky-notes">
                    {showNotes &&
                        stickyNotes.map((note) => (
                            <StickyNote key={note.id} />
                        ))}
                </div>
            )}
            {isOpen && (
                <div className="folder-buttons">
                    <button onClick={toggleShowNotes}>
                        {showNotes ? 'Hide Notes' : 'Display Notes'}
                    </button>
                    <button onClick={addStickyNote}>Add Sticky Note</button>
                </div>
            )}
        </div>
    );
};

export default Folder;
