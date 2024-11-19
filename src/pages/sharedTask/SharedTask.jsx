import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import styles from './SharedTask.module.css';
import axios from 'axios';
import Circle from '../../components/circle/Circle';
import { useParams } from 'react-router-dom';

const SharedTask = () => {
  const {id} = useParams();
  const [task, setTask] = useState(null);
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/task/${id}`,{ withCredentials: true });
        setTask(response.data.task);
        setCheckList(response.data.task.checklist);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, [id]);
  
  const doneTasks = checkList.filter(task => task.done).length;

  return (
    <>
      <div className={styles.heading}>
        <span><img src={logo} alt="logo" /></span>
        <p>Pro Manage</p>
      </div>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero_section}>
            <div className={styles.priority}>
              <Circle color={task?.priority.toLowerCase()} /><p>{task?.priority.toUpperCase()}</p>
            </div>
            <div className={styles.title}>{task?.title}</div>
          </div>

          <div className={styles.checklist}>
            <p>Checklist ({doneTasks}/{checkList.length})</p>
            <div className={styles.overflows}>
              {checkList ? checkList.map((task, ind) => (
                <div key={task?._id} className={styles.task}>
                  <input type="checkbox" className={styles.checkbox} defaultChecked={task?.done} readOnly disabled /> {task?.subtask}
                </div>
              )) : null}
            </div>
          </div>
          {task?.dueDate ? (
            <div className={styles.dueDate}>
              <span>Due Date</span>
              <span className={styles.date}>{task?.dueDate}</span>
            </div>
          ) : ''}
        </div>
      </div>
    </>
  );
}

export default SharedTask;
