// MyGroup.js
import React, {useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import showgroupimage from './showGroup.jpeg'
import GroupPage from './GroupPage.js'
function MyGroup({ user }) {

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groupsRef = firebase.firestore().collection('groups');
                const snapshot = await groupsRef.where('members', 'array-contains', user.email).get();
                const fetchedGroups = [];
                snapshot.forEach(doc => {
                    fetchedGroups.push({ id: doc.id, ...doc.data() });
                });
                setGroups(fetchedGroups);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, [user.email]);


    const handleGroupSelection = (group) => {
        // Toggle user selection
      console.log("THIS GROUP IS SELECTED  ",group);
      setSelectedGroup(group);
  
      
    };



    return (
        <div    style={{
            backgroundImage: `url(${showgroupimage})`, // Set the background image
            backgroundSize: 'cover', // Cover the entire container
            backgroundPosition: 'center', // Center the background image
            minHeight: '50vh', // Make sure the container covers the entire viewport height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            listStyleType: 'none', padding: 0 
        }}>
            <h2>My Groups</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {groups.map(group => (
                      <div  key={groups.id} onClick={() => handleGroupSelection(group)}>
                     
                     
                    <li style={{ cursor: 'pointer', padding: '5px', border: '3px solid black', borderRadius: '5px', margin: '5px', background: 'white' }} key={group.id}>{group.groupName}</li>

             </div>
                ))}
            </ul>
        
            {selectedGroup && <GroupPage group={selectedGroup}  currentUser={user}/>}
     
        </div>
    );
}

export default MyGroup;