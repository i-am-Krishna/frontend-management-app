import React, { useCallback, useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import date from '../../utils/getDate'
import usergroup from '../../assets/usergroup.png'
import collapse from '../../assets/collapse.png'
import plus from '../../assets/plus.png'
import Hero from '../../components/hero/Hero'
import AssignModal from '../../components/assignModel/AssignModal'
import AddModal from '../../components/addModel/AddModal'
import axios from 'axios'
import { toast } from 'react-toastify'



const Dashboard = () => {

  const [allUsers, setAllUsers] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [progressTasks, setProgressTasks] = useState([]);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAddodalOpen, setIsAddodalOpen] = useState(false);  
  const userName = localStorage.getItem('userName');  

  const openAddModal = () => setIsAddodalOpen(true);
  const closeAddModal = () => setIsAddodalOpen(false);  

  const openModal = () => setIsAssignModalOpen(true);
  const closeModal = () => setIsAssignModalOpen(false);

  const handleTimeRangeChange = (e) => {
    setSelectedTimeRange(e.target.value);
  }
  


  useEffect(() => {
    const fetchUsers = async () => {  
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user`,{ withCredentials: true });
            setAllUsers(response.data.users);  
        } catch (error) {
            console.error(error);
        }
    }
    fetchUsers(); 
}, []);

const getTasks = useCallback( async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/task?filterBy=${selectedTimeRange}`,{ withCredentials: true });      
  const allTasks = response.data.tasks
  setTodoTasks(allTasks.filter(task => task.status === 'To do'));
  setProgressTasks(allTasks.filter(task => task.status === 'In progress'));
  setBacklogTasks(allTasks.filter(task => task.status === 'Backlog'));
  setDoneTasks(allTasks.filter(task => task.status === 'Done'));
}
,[selectedTimeRange])
  useEffect(() => { 
    getTasks()
  },[getTasks]);


  const handleButtonClick = async (value,id) => {
    const statusMapping = {
      "PROGRESS": "In progress",
      "TO-DO": "To do",
      "DONE": "Done",
      "BACKLOG": "Backlog"
    };
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/task/${id}`, { status:statusMapping[value] }, { withCredentials: true });
      toast.success(response.data.message);
      getTasks();
    } catch (error) {
      console.log(error)
    }
  }
  



  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.nameAndDate}>
        <div className={styles.nameWelcome}>Welcome! {userName}</div>
        <div className={styles.date}>{date()}</div>
      </div>
      <div className={styles.filterBox}>
        <div className={styles.userBoard}>Board <span onClick={openModal} className={styles.usergroupSpan}><img className={styles.usergroup} src={usergroup} alt="usergroup" /> Add People</span></div>
        <AssignModal isOpen={isAssignModalOpen} onClose={closeModal} allUsers={allUsers} />

        <div> <select className={styles.select} id="time-range"  value={selectedTimeRange} 
        onChange={handleTimeRangeChange} name="time-range">
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select> </div>
      </div>

      <div className={styles.mainComponent}>
        <div className={styles.firstComponent}>
          <div className={styles.componentHeading}>
          <div className={styles.componentName}>Backlog</div>
          <div className={styles.collapse}><img src={collapse} alt="collapse" /> </div>
          </div> 
          <div className={styles.componentData}>
            { backlogTasks.length>0 ? 
              backlogTasks.map((task) => (
                <Hero className={styles.innerComponent} key={task._id} buttons={['TO-DO','PROGRESS', 'DONE']}  onButtonClick={handleButtonClick} task={task} getTasks={getTasks} />
              ))
            : null }
          </div>
        </div>
      

        <div className={styles.firstComponent}>
        <div className={styles.componentHeading}>
          <div className={styles.componentName}>To do</div>
          <div className={styles.collapse}> <img style={{cursor:'pointer',margin:'0 10px 3px 0'}} onClick={openAddModal}  src={plus} alt="plus" /> <img src={collapse} alt="collapse" /> </div>
          </div>
          <AddModal isOpen={isAddodalOpen} closeModal={closeAddModal} getTasks={getTasks}/>
          <div className={styles.componentData}>
            {todoTasks.length>0 ?
              todoTasks.map((task) => (
                <Hero className={styles.innerComponent} key={task._id} buttons={['BACKLOG','PROGRESS','DONE']}  onButtonClick={handleButtonClick} task={task} getTasks={getTasks}  />
            )) : null}
          </div> </div>


        <div className={styles.firstComponent}> 
        <div className={styles.componentHeading}>
          <div className={styles.componentName}>In progress</div>
          <div className={styles.collapse}><img src={collapse} alt="collapse" /> </div>
          </div>
          <div className={styles.componentData}>
            {
              progressTasks.length>0 ?
              progressTasks.map((task) => (
                <Hero className={styles.innerComponent} key={task._id} buttons={['BACKLOG','TO-DO', 'DONE']}  onButtonClick={handleButtonClick} task={task} getTasks={getTasks} />
              )) : null
            }
          </div>
        </div>


        <div className={styles.firstComponent}> 
        <div className={styles.componentHeading}>
          <div className={styles.componentName}>Done</div>
          <div className={styles.collapse}><img src={collapse} alt="collapse"  /> </div>
          </div>
          <div className={styles.componentData}>

            {
              doneTasks.length>0 ?
              doneTasks.map((task) => (
                <Hero className={styles.innerComponent} key={task._id} buttons={['BACKLOG','TO-DO', 'PROGRESS']}  onButtonClick={handleButtonClick} task={task} getTasks={getTasks} />
              )) : null
            }
          </div></div>        
        
      </div>
    </div>
    
  )
}

export default Dashboard