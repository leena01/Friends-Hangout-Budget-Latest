import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import creategroupimage from './creategroup.jpeg'
import app from '../../firebase/firebase.js'
import "firebase/compat/firestore"
import listStyle from './liststyle.css'
//git



 
function CreateGroup() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        // Fetch users from Firestore when component mounts
        const fetchUsers = async () => {
            try {
                
                const usersCollection = await app.firestore().collection('users').get();
                const usersData = usersCollection.docs.map(doc => doc.data());
                setUsers(usersData);
                
                console.log("--------------------->",usersData)
            } catch (error) {
                console.error('Error fetching users: ', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserSelection = (user) => {
        // Toggle user selection
      
        setSelectedUsers(prevSelectedUsers => {
            const isUserSelected = prevSelectedUsers.some(selectedUser => selectedUser.email === user.email);
            if (isUserSelected) {
                return prevSelectedUsers.filter(selectedUser => selectedUser.email !== user.email);
            } else {
                return [...prevSelectedUsers, user];
            }
        });
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const createGroup = async () => {
        try {
            // Get current user
            const currentUser = app.auth().currentUser;
    
            // Create a new group document
            const groupRef = await app.firestore().collection('groups').add({
                groupName: groupName,
                members: selectedUsers.map(user => user.email),
                createdBy: currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    
            console.log('Group created with ID:', groupRef.id);
    
            // Create a new collection for the group
            const groupCollectionRef = await app.firestore().collection('group_data').doc(groupRef.id).collection('data').add({
                // Add initial data for the group collection if needed
            });
    
            console.log('Group collection created with ID:', groupCollectionRef.id);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };
    

    return (
        <div    style={{
            backgroundImage: `url(${creategroupimage})`, // Set the background image
            backgroundSize: 'cover', // Cover the entire container
            backgroundPosition: 'center', // Center the background image
            minHeight: '50vh', // Make sure the container covers the entire viewport height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <h2>Create New Group</h2>
        <input type="text" placeholder="Group Name" value={groupName} onChange={handleGroupNameChange} />
        <div>
            <h3>Available Users</h3>

            {
            users.map(user => (
                
                <div  className="group-list-item" key={user.email} onClick={() => handleUserSelection(user)}>
                     
                    <span style={{ cursor: 'pointer', padding: '5px', border: '3px solid black', borderRadius: '5px', margin: '5px', background: selectedUsers.some(selectedUser => selectedUser.email === user.email) ? 'lightblue' : 'white' }}>{user.email}</span>
                </div>
            ))}
        </div>
        <button className="cloud-button" onClick={createGroup}>Create Group</button>
    </div>
    );
}

export default CreateGroup;
