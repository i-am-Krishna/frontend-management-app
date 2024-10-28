import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/PageNotFound.module.css';

function PageNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.pageNotFound}>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={handleGoHome}>Go to Home</button>
    </div>
  );
}

export default PageNotFound;
