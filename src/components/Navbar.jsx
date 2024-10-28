
import axios from 'axios';
import React, { useState } from 'react';
import styles from './css/Navbar.module.css';
import logo from '../assets/logo.png';
import Logout from '../assets/Logout.png';
import setting from '../assets/settings.png';
import layout from '../assets/layout.png';
import database from '../assets/database.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleClick = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/logout`,{},{ withCredentials: true });
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error)
    }
  };

  // Determine the active page based on the current path
  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.navbar}>
      <div className={styles.upper}>
        <div className={styles.heading}>
          <span><img src={logo} alt="logo" /></span>
          <p>Pro Manage</p>
        </div>

        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className={`${styles.subNav} ${isActive('/') ? styles.active : ''}`}>
              <span><img src={layout} alt="layout" /></span>
              <p>Board</p>
            </div>
          </Link>
          <Link to="/analytics" style={{ textDecoration: 'none' }}>
            <div className={`${styles.subNav} ${isActive('/analytics') ? styles.active : ''}`}>
              <span><img src={database} alt="database" /></span>
              <p>Analytics</p>
            </div>
          </Link>
          <Link to="/settings" style={{ textDecoration: 'none' }}>
            <div className={`${styles.subNav} ${isActive('/settings') ? styles.active : ''}`}>
              <span><img src={setting} alt="setting" /></span>
              <p>Settings</p>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.lower}>
        <div onClick={openModal} className={styles.logout}>
          <span><img src={Logout} alt="Logout" /></span>
          <p>Logout</p>
        </div>
      </div>

      {/* Modal component */}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>Are you sure you want to logout?</div>
          <div onClick={handleClick} className={styles.modalLogout}>Yes, Logout</div>
          <div onClick={closeModal} className={styles.modalCancel}>Cancel</div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
