

import React, { useState } from "react";
import styles from "./AddModal.module.css"; // Modal-specific CSS
import Important from "../important/Important";
import Delete from "../../assets/Delete.png";
import Circle from "../circle/Circle";
import FindUserEmail from "../findUserEmail/FindUserEmail";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import axios from "axios";
import { toast } from "react-toastify";


const AddModal = ({ isOpen, closeModal, children, getTasks }) => {
  const [selectedPriority, setSelectedPriority] = useState(null);

  const [checklist, setChecklist] = useState([
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  let [title,setTitle]=useState('');
  const [findUser,setFindUser]=useState(''); 


  const doneTasks = checklist.filter((task) => task.done).length;

  const handleAddTask = () => {
    setChecklist([...checklist, { task: "", done: false }]);
  };

  
  const handleButtonClick = (priority) => {
    if (priority === selectedPriority){
      setSelectedPriority(null);
      return
    };
    setSelectedPriority(priority);
  };
  
  const handleTaskChange = (index, newTask) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((task, i) =>
       ( i === index ? { ...task, task: newTask } : task)
  )
);
};


const handleToggleDone = (index) => {
  setChecklist((prevChecklist) =>
    prevChecklist.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
)
);
};

const handleDeleteTask = (index) => {
  setChecklist((prevChecklist) =>
    prevChecklist.filter((_, i) => i !== index)
);
};


const handleSubmit = async () => {
  const statusMapping = {
    "high": "High Priority",
    "moderate": "Moderate Priority",
    "low": "Low Priority"
  };

  if(checklist.length === 0){
    toast.error("Please add atleast one task");
    return
  }
  const formattedData = {
    title: title,
    assignedUserId: findUser._id,
    checklist: checklist.map((task) => ({
      subtask: task.task,
      done: task.done,
    })),
    dueDate: selectedDate ? selectedDate.toISOString() : null,
    priority: statusMapping[selectedPriority] || "Low Priority", 
  };

  try {
     await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/task`, formattedData, {
      withCredentials: true,
    });
    setChecklist([]);
    setSelectedDate(null);
    setSelectedPriority(null);

    closeModal(); // Close modal on successful post
    getTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
};


  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.firstSec}>
          <p>
            Title<Important />
          </p>
          <input type="text" name="title" placeholder="Enter Task Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>

        <div className={styles.secondSec}>
          <span>
            Select Priority<Important />
          </span>
          <div className={styles.prioritiesButton}>
          <button   onClick={() => handleButtonClick("high")}
        style={{
          backgroundColor: selectedPriority === "high" ? "#EEECEC" : "#ffffff",
        }}>
            <Circle /> HIGH PRIORITY
          </button>
          <button onClick={() => handleButtonClick("moderate")}
        style={{
          backgroundColor: selectedPriority === "moderate" ? "#EEECEC" : "#ffffff",
        }}>
            <Circle color="#18b0ff" /> MODERATE PRIORITY
          </button>
  
          <button onClick={() => handleButtonClick("low")}
        style={{
          backgroundColor: selectedPriority === "low" ? "#EEECEC" : "#ffffff",
        }}>
            <Circle color="#63c05b" /> LOW PRIORITY
          </button>
          </div>
        </div>

        <div className={styles.thirdSec}>
          <p>Assign to</p>{" "}
          <span>
            <FindUserEmail message={"Add an assignee"} setFindUser={setFindUser} />
          </span>
        </div>

        <div className={styles.fourthSec}>
          <p>
            Checklist ({doneTasks}/{checklist.length})
            <Important />
          </p>
          <div className={styles.overflows}>
            {checklist.map((task, ind) => (
              <div key={ind} className={styles.task}>
                <span>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.done}
                  onChange={() => handleToggleDone(ind)}
                />
                <input
                  type="text"
                  className={styles.taskInput}
                  value={task.task}
                  placeholder="Enter task"
                  onChange={(e) => handleTaskChange(ind, e.target.value)}
                />
                </span>
                <img src={Delete} alt="delete"  onClick={()=>handleDeleteTask(ind)}/>
              </div>
            ))}
            <div className={styles.addTasks} onClick={handleAddTask}>
              + Add New
            </div>
          </div>
        </div>

        <div className={styles.fifthSec}>
            <div><DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy" minDate={new Date()}
        placeholderText="Select due date"
      className={styles.selectDueDate} /></div>
            <div className={styles.buttons}><button onClick={closeModal} className={styles.cancelBtn}>Cancel</button>
            <button onClick={handleSubmit} className={styles.saveBtn}>Save</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
