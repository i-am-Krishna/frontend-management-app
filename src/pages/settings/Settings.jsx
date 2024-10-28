import React, { useState } from 'react'
import styles from './Settings.module.css'
import icon from '../../assets/icon.png'
import lock from '../../assets/lock.png'
import view from '../../assets/view.png'
import name from '../../assets/name.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Settings = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    new_password:''
  })
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  const handleTaskChange = (e) => {
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit=async(e)=>{
      e.preventDefault();
      if(formData.name && formData.new_password && formData.password && formData.email){
          toast.error('Please update name email or password field in one time!!!')
          return
      }
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user`,formData,{ withCredentials: true });  
      toast.success(response.data.message);
      navigate('/login')
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      }
      console.log(err)
    }
  }
  
  return (
    <div className={styles.setting}>
      <div className={styles.headings}>Settings</div>
      <div className={styles.form}>
        <form className={styles.inputs}>
      <div className={styles.input_box}> <img src={name} alt="icon" /> <input type="text" placeholder={userName} name='name' value={formData.name} onChange={handleTaskChange} autoComplete='off' /></div>
      

        <div className={styles.input_box}> <img src={icon} alt="icon" /> <input type="email" placeholder={userEmail} name='email' value={formData.email} onChange={handleTaskChange}  /></div>


        <div className={styles.input_box}> <img src={lock} alt="lock" /> <input type="password" placeholder="Old Password"  name='password' value={formData.password} onChange={handleTaskChange} autoComplete='off' /> <img src={view} alt='view' /></div>


        <div className={styles.input_box}> <img src={lock} alt="lock" /> <input type="password" placeholder="New Password" name='new_password' value={formData.new_password} onChange={handleTaskChange} autoComplete='off' /> <img src={view} alt='view' /> </div>

        <div className={styles.buttons}>
      <button onClick={handleSubmit} >Update</button>
      </div>
      </form> 
      </div>
    </div>
  )
}

export default Settings