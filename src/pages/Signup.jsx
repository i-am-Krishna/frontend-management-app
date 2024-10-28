import React, { useState } from 'react'
import LoginSignupSideBar from '../components/LoginSignupSideBar'
import styles from './css/Signup.module.css'
import icon from '../assets/icon.png'
import lock from '../assets/lock.png'
import view from '../assets/view.png'
import name from '../assets/name.png'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { signUpSchema } from '../validation/validationSchema'
import axios from 'axios'
import { toast } from 'react-toastify'
const Signup = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const [errors,setErrors] = useState({})

  const handleTaskChange = (e) => {
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }
const handleSubmit=async()=>{
  try {

    await signUpSchema.validate(formData, { abortEarly: false });
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/signup`, {
      name:formData.name,
      email:formData.email,
      password:formData.password},
      { withCredentials: true })  
    toast.success(response.data.message)
    navigate('/login')
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
      <div className={styles.heading}><p className={styles.para}>Register</p></div>
      <div className={styles.inputs}>
      <div className={styles.input_box}> <img src={name} alt="icon" /> 
      <input type="text" placeholder="Name" name='name' value={formData.name} onChange={handleTaskChange}   />
      </div>
      {errors.name && <p style={{ color: 'red', marginTop:'-20px', marginBottom:'5px',fontSize:'12px' }}>{errors.name}</p>}
        <div className={styles.input_box}> <img src={icon} alt="icon" /> <input type="email" placeholder="Email" name='email' value={formData.email} onChange={handleTaskChange}   />
        </div>
        {errors.email && <p style={{ color: 'red', marginTop:'-20px', marginBottom:'5px',fontSize:'12px' }}>{errors.email}</p>}

        <div className={styles.input_box}> <img src={lock} alt="lock" /> <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleTaskChange} /> <img src={view} alt='view' /> 
        </div>
        {errors.password && <p style={{marginTop:'-20px', marginBottom:'5px', color: 'red',fontSize:'12px'  }}>{errors.password}</p>}

        <div className={styles.input_box}> <img src={lock} alt="lock" /> <input type="password" placeholder="Confirm Password" name='confirmPassword' value={formData.confirmPassword} onChange={handleTaskChange} /> <img src={view} alt='view' />   
      </div>
        {errors.confirmPassword && <p style={{ color: 'red', marginTop:'-20px', marginBottom:'5px' ,fontSize:'12px' }}>{errors.confirmPassword}</p>}
        </div>
      <div className={styles.buttons}>
      <button className={styles.register} onClick={handleSubmit} >Register</button>
      <p>Have an account ?</p>
      <Link to={'/login'} style={{ textDecoration: 'none',width:'100%' }}>
      <button className={styles.login}>Login</button></Link>

      </div>
    </div></div>
  )
}

export default Signup