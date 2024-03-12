import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import liststyle from './liststyle.css'
import "./JoinGroup.css";

function JoinGroup() {

    const [groups, setGroups] = useState([]);



    useEffect(() => {
        // Fetch groups from Firestore when component mounts
        const fetchGroups = async () => {
            try {
                const groupsCollection = await firebase.firestore().collection('groups').get();
                const groupsData = groupsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setGroups(groupsData);
                console.log("here is groupsdata", groupsData)
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };


        fetchGroups();

    });

    const handleJoinGroup = async (groupId) => {
        try {

            const currentUser = firebase.auth().currentUser;
            //add new features in your app and implement it yourself not with chatgpt this will be
            // Check if the user is already a member of the group
            const groupRef = firebase.firestore().collection('groups').doc(groupId);
            const groupSnapshot = await groupRef.get();

            if (groupSnapshot.exists) {

                const groupData = groupSnapshot.data();

                // Check if the user is already a member
                if (groupData.members && groupData.members.includes(currentUser.email)) {
                    alert('You are already a member of this group.');
                } else {
                    // Add the user to the group
                    await groupRef.update({
                        members: firebase.firestore.FieldValue.arrayUnion(currentUser.email)
                    });
                    alert('You have joined the group successfully.');


                }
            } else {
                alert('Group not found.');
            }
        } catch (error) {
            console.error('Error joining group:', error);
            alert('An error occurred while joining the group. Please try again later.');
        }
    };
    return (
        <div className="backimage" >
            <h2>Join Group</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {groups.map(group => (
                    <li key={group.id} className="group-list-item">
                        <span
                          style={{ cursor: 'pointer', padding: '5px', border: '4px solid black', borderRadius: '5px',   marginBottom: '10px' , background: 'white' }}
                            onClick={() => handleJoinGroup(group.id)

                            }
                        >

                            {group.groupName}
                        </span>
                    </li>
                ))}
            </ul>



        </div>
    );
}

export default JoinGroup;
