import React from 'react';
import './Avatar.module.css'; 
const Avatar = ({ email }) => {
 
  const getInitials = (email) => {
    if (!email) return '';
    const namePart = email.split('@')[0];
    const initials = namePart.slice(0, 2).toUpperCase(); 
    return initials;
  };

  const initials = getInitials(email);

  return (
    <div className="avatar-circle">
      <span className="avatar-text">{initials}</span>
    </div>
  );
};

export default Avatar;
