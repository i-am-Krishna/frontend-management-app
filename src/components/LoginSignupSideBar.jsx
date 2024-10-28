import React from 'react'
import styles from './css/LoginSignupSideBar.module.css'
import robo from '../assets/robo.png'

const LoginSignupSideBar = () => {

  return (
    <div className={styles.container} >
        <div className={styles.center}>
            <img src={robo} alt="robo" />
        </div>
            <div className={styles.textData}>
                <p className={styles.title}>Welcome aboard my friend</p>
                <span className={styles.desc}>just a couple of clicks and we start</span>
            </div>
    </div>
  )
}

export default LoginSignupSideBar