import React, { useState } from 'react';
import styles from './Hero.module.css';
import dots from '../../assets/dots.png';
import up from '../../assets/up.png';
import down from '../../assets/down.png';
import Modal from '../modal/Modal';
import Circle from '../circle/Circle';
import EditModal from '../editModel/EditModal';
import axios from 'axios';

const Hero = ({buttons, onButtonClick, task , getTasks}) => {
    const [isChecklistVisible, setChecklistVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);  
    const [isEditModalOpen, setEditModalOpen] = useState(false);


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openEditModal = () => {
    setIsOpen(false);
    setEditModalOpen(true);
  }

  const closeEditModal = () => {
    setIsOpen(false);
    setEditModalOpen(false)
  }

  const handCheckboxChange =async (event,taskId, subtaskId) => {
    let value = null;
    try {
    if(event.target.checked === true){
      value = true;
    }
    else if(event.target.checked === false){
      value = false;
    }
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/task/${taskId}/${subtaskId}`,{done:value},{ withCredentials: true });
        getTasks();
    } catch (error) {
      console.log(error)
    }

  };  
  
  const handleShare = async (id) => {
    const currentUrl = window.location.href;
        const linkToCopy = currentUrl+`share/${id}`;
        try {
          await navigator.clipboard.writeText(linkToCopy);          
        setIsOpen(!isOpen);
        setShowToast(true);
        setTimeout(() => {
        setShowToast(false);
        }, 3000); 
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
    
  };

  const handleDeleteFunction = async(id) => {
    setIsOpen(!isOpen);
    setModalOpen(!isModalOpen);
    try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/task/${id}`,{ withCredentials: true });
      getTasks();
    } catch (error) {
      console.log(error)
    }
  };  

  const toggleChecklist = () => {
    setChecklistVisible(!isChecklistVisible);
  };

  const doneTasks = task?.checklist.filter(task => task.done).length;

  return (
        <div className={styles.container} >
          <div className={styles.hero_section}>
            <div className={styles.priority}>
             <div className={styles.high}> <Circle  color={task?.priority.toLowerCase()} /><p className={styles.priority_text}>{task?.priority.toUpperCase()}</p></div>
              <img  src={dots} alt="dots" className={styles.dotsToggle} onClick={toggleMenu} />
          <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal} task={task} getTasks={getTasks}/>
      {isOpen && (
        <div className={styles.dropdownMenu} >
          <ul>
            <li onClick={openEditModal}>Edit</li>
            <li onClick={()=>handleShare(task._id)}>Share</li>
            <li onClick={openModal}>Delete</li>
          </ul>
        </div>
      )}

            </div>
            <div className={styles.title}>{task?.title}</div>
          </div>

          <div className={styles.checklist}>
            <div className={styles.taskCount}><p style={{color: 'black',fontSize: "14px",
    fontWeight: '500'}}>Checklist ({doneTasks}/{task?.checklist.length})</p> <p><img src={toggleChecklist? up:down} onClick={toggleChecklist} alt='updown'/> </p></div>
           {isChecklistVisible ? <> <div className={styles.overflows} >
              {task?.checklist && task?.checklist.map((subtask) => (
                <div key={subtask._id} className={styles.task}>
                  <input type="checkbox" className={styles.checkbox} defaultChecked={subtask.done} onChange={(e)=>handCheckboxChange(e,task._id,subtask._id)} /> {subtask?.subtask}
                </div>
              ))}
            </div>
            </>:null}
          </div>
            <div className={styles.dueDate}>
          {task.dueDate ? (
              <span className={styles.date} style={{ backgroundColor: task.status === "Done" ? "#63c05b" : (task.priority === "High Priority" ? "#CF3636" : "#DBDBDB")
                , color: task.status === "Done" ? "#fff" : (task.priority === "High Priority" ? "#fff" : "#5a5a5a")
}}>{task?.dueDate}</span>
            ) :               <span  style={{backgroundColor:"white"}}></span>}
            <div className={styles.statusbuttons}>
              {
                buttons.map((status, index) => (
                  <button key={index} className={styles.statusbtn} onClick={() => onButtonClick(status,task._id)} >{status}</button>
                ))
              }
        </div>
            </div>
      {showToast && (
        <div className={styles.toast}>
          Link Copied
        </div>
      )}
            <Modal  isOpen={isModalOpen} closeModal={closeModal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>Are you sure you want to delete?</div>
          <div onClick={()=>handleDeleteFunction(task._id)} className={styles.modalLogout}>Yes, Delete</div>
          <div onClick={closeModal} className={styles.modalCancel}>Cancel</div>
        </div>
      </Modal>
        </div>
  );
}

export default Hero;
