import React, { useState } from 'react'
import LoginSignupSideBar from '../../components/loginSignupSidebar/LoginSignupSideBar'
import styles from './Login.module.css'
import icon from '../../assets/icon.png'
import lock from '../../assets/lock.png'
import view from '../../assets/view.png'
import {Link, useNavigate} from 'react-router-dom'
import { loginSchema } from '../../validation/validationSchema'
import { toast } from 'react-toastify'
import axios from 'axios'


const Login = () => {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const [errors,setErrors] = useState({})

  const handleTaskChange = (e)=>{
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }


  const handleLogin=async()=>{
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`, {
        email:formData.email,
        password:formData.password},{ withCredentials: true })  
        localStorage.setItem('userName',response.data.user.name)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('userId',response.data.user._id)   
      toast.success(response.data.message)
      navigate('/')
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}><LoginSignupSideBar/></div>
    <div className={styles.loginSec}>
      <div className={styles.heading}><p className={styles.para}>Login</p></div>
      <div className={styles.inputs}>
        <div className={styles.input_box}> <img src={icon} alt="icon" /> <input type="text" placeholder="Email" name='email' value={formData.email} onChange={handleTaskChange}  /></div>
        {errors.email && <p style={{ color: 'red', marginTop:'-20px', marginBottom:'5px',fontSize:'12px' }}>{errors.email}</p>}

        <div className={styles.input_box}> <img src={lock} alt="lock" /> <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleTaskChange}/> <img src={view} alt='view' />
         </div>
         {errors.password && <p style={{marginTop:'-20px', marginBottom:'5px', color: 'red',fontSize:'12px'  }}>{errors.password}</p>}

      </div>
      <div className={styles.buttons}>
      <button className={styles.loginRegister} onClick={handleLogin} >Login</button>
      <p>Have no account yet?</p>
      <Link to={'/signup'} style={{ textDecoration: 'none',width:'100%' }}><button className={styles.registerLogin}>Register</button></Link>

      </div>
    </div>
    </div>
  )
}

export default Login