// GroupOptions.js
import React, { useContext , useState,useEffect } from 'react';
import { AuthContext } from './AuthContext.js';
import StickyNote from '../StickyNote/StickyNote.js';
import CreateGroup from './CreateGroup.js';
import JoinGroup from './JoinGroup.js';
import MyGroup from './MyGroup.js'
import './GroupOption.css'
const GroupOptions = () => {
  document.body.classList.add('mygroup-body');
  console.log("i am in group options")
  const {user} = useContext(AuthContext);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [showMyGroup, setShowMyGroup] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Once the timeout is finished, set isLoading to false
    }, 2000); // Adjust the timeout duration as needed
  }, []);
  const toggleCreateGroup = () => {
    setShowCreateGroup(!showCreateGroup); // Toggles the visibility of CreateGroup
    setShowJoinGroup(false); // Toggles the visibility of CreateGroup
    setShowMyGroup(false); // Toggles the visibility of CreateGroup
  };
  console.log("HERE ARE USER",{user});
const togglejoinGroup = () => {
  setShowCreateGroup(false);
  setShowJoinGroup(!showJoinGroup); // Toggles the visibility of CreateGroup
  setShowMyGroup(false); // Toggles the visibility of CreateGroup
};
const toggleMyGroup = () => {
  setShowJoinGroup(false); // Toggles the visibility of CreateGroup
  setShowMyGroup(!showMyGroup); // Toggles the visibility of CreateGroup
  setShowCreateGroup(false);

};
 
if (isLoading) {
  return <div>Loading...</div>; // Render loader when isLoading is true
}
  return (
    <div>
    {user ? (
      <div>
        <button className="cloud-button" onClick={toggleCreateGroup}>Create Group</button>
        <button className="cloud-button" onClick={togglejoinGroup}>Join Group</button>
        <button className="cloud-button" onClick={()=>{toggleMyGroup();}}>My Group</button>
        {/* <StickyNote></StickyNote> */}
        {/* Render CreateGroup component based on showCreateGroup state */}
        {showCreateGroup && <CreateGroup />}
        {showJoinGroup && <JoinGroup />}
        {showMyGroup && <MyGroup user={user} />}
      </div>
    ) : (
      <p>Please sign in to access group options</p>
    )}
  </div>
  );
};

export default GroupOptions;
