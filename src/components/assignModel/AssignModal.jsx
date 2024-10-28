import React, { useState } from 'react';
import styles from './AssignModal.module.css';
import SuccessModal from '../success/SuccessModal';
import axios from 'axios';

const AssignModal = ({ isOpen, onClose , allUsers}) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    if (!isOpen) return null; 

  
  const openModal = (email) => {
    setEmail(email);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };


const handleSelect = (item) => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
};

const addEmailSubmit = async() => {
  try {
    if (selectedItem) {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/task/assign/${selectedItem._id}`,{email:selectedItem.email},{ withCredentials: true });
      openModal(selectedItem.email);
    } 
  }
  catch (error) {
    console.log(error)
  }
};

function getInitials(str) {
    if (!str) return ''; 
    return str.slice(0, 2).toUpperCase(); 
  }
  
  

    return (
      <div className={styles.modaloverlay} onClick={onClose}>
        <div className={styles.modalcontent} onClick={e => e.stopPropagation()}>
          <h2>Add people to the board</h2>
          {isModalOpen && <SuccessModal  email={email} closeModal={closeModal} />}

<div className={styles.customDropdown}>
                    <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {selectedItem ? (
                                <span>{selectedItem.email}</span>
                        ) : (
                            <span style={{color: 'gray',fontSize:'16px'}}>Enter the email</span>
                        )}
                    </div>

                    {isDropdownOpen && (
                        <ul className={styles.dropdownList}>
                            {allUsers.map((item) => (
                                <li key={item._id} className={styles.assignedPlace} onClick={() => handleSelect(item)}>
                                     <button className={styles.avatarPlace}>{getInitials(item.email)}</button>
                                    <span className={styles.emailNamePlace}>{item.email}</span>
                                    <button className={styles.assignButton}>Assign</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


          <div className={styles.modalactions}>
            <button className={styles.cancel} onClick={onClose}>Cancel</button>
            <button className={styles.add} onClick={addEmailSubmit}>Add Email</button>
          </div>
        </div>
      </div>
    );
  };


export default AssignModal;

