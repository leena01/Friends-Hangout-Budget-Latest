import React, { useState,useEffect } from 'react';
import StickyNote from '../StickyNote/StickyNote';
import Folder from '../Folder/Folder';
import firebase from 'firebase/compat/app'; // Import Firebase
import 'firebase/compat/firestore'; // Import Firestore

function GroupPage(props) {
    const groupData = props.group;
    const [stickyNotes, setStickyNotes] = useState([]);
    const db = firebase.firestore(); // Initialize Firestore
   
    useEffect(() => {
        const db = firebase.firestore();
        // Fetch sticky notes from Firestore
        const fetchStickyNotes = async () => {
            try {
                const snapshot = await db.collection('users').get();
                const allNotes = [];
                snapshot.forEach(doc => {
                    const notes = doc.data().stickyNotes;
                    allNotes.push(...notes);
                });
                setStickyNotes(allNotes);
            } catch (error) {
                console.error('Error fetching sticky notes:', error);
            }
        };
        fetchStickyNotes();
    }, []); // Run once on component mount
    const addStickyNote = (memberName, id) => {
        // Retrieve content based on the ID
        const newStickyNoteContent = stickyNotes.find(note => note.id === id)?.content || '';
        const newStickyNote = {
            id: Date.now().toString(), // Unique ID for the sticky note
            content: newStickyNoteContent, // Initial content of the sticky note
            attachedTo: memberName, // Associate the sticky note with the user
       
        };

        setStickyNotes(prevStickyNotes => [...prevStickyNotes, newStickyNote]);

        // Add sticky note data to Firestore under the user's collection
        db.collection('users').doc(memberName).collection('stickyNotes').doc(newStickyNote.id).set(newStickyNote)
            .then(() => {
                console.log('Sticky note added successfully');
            })
            .catch(error => {
                console.error('Error adding sticky note: ', error);
            });
    };
    const updateStickyNoteContent = (id, content, memberName, userName) => {
        const updatedStickyNotes = stickyNotes.map(note =>
            note.id === id ? { ...note, content: content } : note
        );
    
        setStickyNotes(updatedStickyNotes);
    
        // Update sticky note content in Firestore
        db.collection('users').doc(memberName).collection('stickyNotes').doc(id).update({ 
            content: content,
            assignedBY: userName // Include the userName in the document
        })
        .then(() => {
            console.log('Sticky note content updated successfully');
        })
        .catch(error => {
            console.error('Error updating sticky note content: ', error);
        });
    };

    return (
        <div>
            <h2>Group Page</h2>
            <p>Group Name: {groupData.groupName}</p>
            <p>Group Members</p>
            {Array.isArray(groupData.members) && groupData.members.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {groupData.members.map((member, index) => {
                        let name = member.split('@');
                        return (
                            <div key={index} style={{ position: 'relative' }}>
                                <li
                                    style={{
                                        cursor: 'pointer',
                                        padding: '5px',
                                        border: '4px solid black',
                                        borderRadius: '5px',
                                        marginBottom: '10px',
                                        background: 'white'
                                    }}
                                    onClick={() => addStickyNote(name[0], Date.now().toString())} // Pass the member name to addStickyNote
                                >
                                    {name[0]}
                                    <Folder />
                                </li>
                                {/* Render sticky notes attached to this member */}
                                
                                {stickyNotes.map(note => {
                                    if (note.attachedTo === name[0]) {
                                        return (
                                            <StickyNote
                                                key={note.id}
                                                id={note.id}
                                                content={note.content}
                                                UserName={name[0]} // Pass the userName from the GroupPage component
                                                onUpdateContent={(content,UserName) => updateStickyNoteContent(note.id, content, name[0],UserName)} // Pass the member name
                                                style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: 0,
                                                    zIndex: 1
                                                }}
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        );
                    })}
                </ul>
            ) : (
                <p>No members found</p>
            )}
        </div>
    );
}

export default GroupPage;
