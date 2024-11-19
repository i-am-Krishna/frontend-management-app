
import React, { useState } from "react";
import styles from "./EditModal.module.css"; 
import Important from "../important/Important";
import Delete from "../../assets/Delete.png";
import Circle from "../circle/Circle";
import FindUserEmail from "../findUserEmail/FindUserEmail";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { toast } from "react-toastify";
import axios from "axios";

const EditModal = ({ isOpen, closeModal, task, getTasks }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [checklist, setChecklist] = useState(task.checklist.map((item) => ({ ...item })) || []);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState(task.title || '');
  const [findUser, setFindUser] = useState(''); 

  const doneTasks = checklist.filter((task) => task.done).length;

  const handleAddTask = () => {
    setChecklist([...checklist, { _id: Date.now(), subtask: "", done: false }]);
  };
  
  const handleTaskChange = (id, newTask) => {
    setChecklist((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, subtask: newTask } : task
      )
    );
  };

  const handleButtonClick = (priority) => {
    if (priority === selectedPriority) {
      setSelectedPriority(null);
      return;
    }
    setSelectedPriority(priority);
  };

  const handleToggleDone = (id) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((task) =>
        task._id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/task/${task._id}/${id}`, { withCredentials: true });
      setChecklist((prev) => prev.filter((task) => task._id !== id));
      toast.success("Subtask deleted successfully");
    } catch (error) {
      setChecklist((prev) => prev.filter((task) => task._id !== id));
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    const status = {
      "high": "High Priority",
      "moderate": "Moderate Priority",
      "low": "Low Priority"
    };

    if (checklist.length === 0) {
      toast.error("Please add at least one task");
      return;
    }

    const formattedData = {
      title: title || null,
      assignedUserId: findUser._id || null,
      checklist: checklist.map((task) => ({
        _id: task?._id,
        subtask: task.subtask,
        done: task.done,
      })),
      dueDate: selectedDate ? selectedDate.toISOString() : null,
      priority: status[selectedPriority] || "Low Priority",
    };
    setIsSubmitting(true);
    try { 
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/task/update/${task._id}`, 
        formattedData,  
        { withCredentials: true }   
      );

      console.log(res.data);
      setSelectedDate(null);
      setSelectedPriority(null);  
      toast.success("Task updated successfully");
      closeModal();
      getTasks();
    } catch (error) {
      console.log(error); 
    }
    finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.firstSec}>
          <p>Title<Important /></p>
          <input type="text" name="title" placeholder='Enter Task Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className={styles.secondSec}>
          <span>Select Priority<Important /></span>
          <div className={styles.prioritiesButton}>
            <button onClick={() => handleButtonClick("high")} style={{ backgroundColor: selectedPriority === "high" ? "#eeecec" : "#ffffff" }}>
              <Circle /> HIGH PRIORITY
            </button>
            <button onClick={() => handleButtonClick("moderate")} style={{ backgroundColor: selectedPriority === "moderate" ? "#eeecec" : "#ffffff" }}>
              <Circle color="#18b0ff" /> MODERATE PRIORITY
            </button>
            <button onClick={() => handleButtonClick("low")} style={{ backgroundColor: selectedPriority === "low" ? "#eeecec" : "#ffffff" }}>
              <Circle color="#63c05b" /> LOW PRIORITY
            </button>
          </div>
        </div>

        <div className={styles.thirdSec}>
          <p>Assign to</p>
          <span>
            <FindUserEmail message={"Add an assignee"} setFindUser={setFindUser} />
          </span>
        </div>

        <div className={styles.fourthSec}>
          <p>Checklist ({doneTasks}/{checklist.length})<Important /></p>
          <div className={styles.overflows}>
            {checklist.map((task) => (
              <div key={task._id} className={styles.task}>
                <span>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={task.done}
                    onChange={() => handleToggleDone(task._id)}
                  />
                  <input
                    type="text"
                    className={styles.taskInput}
                    value={task.subtask}
                    placeholder={task.subtask}
                    onChange={(e) => handleTaskChange(task._id, e.target.value)}
                  />
                </span>
                <img src={Delete} alt="delete" onClick={() => handleDeleteTask(task._id)} />
              </div>
            ))}
            <div className={styles.addTasks} onClick={handleAddTask}>
              + Add New
            </div>
          </div>
        </div>

        <div className={styles.fifthSec}>
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText="Select due date"
              className={styles.selectDueDate}
            />
          </div>
          <div className={styles.buttons}>
            <button onClick={closeModal} className={styles.cancelBtn}>Cancel</button>
            <button onClick={handleSubmit} className={styles.saveBtn}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

