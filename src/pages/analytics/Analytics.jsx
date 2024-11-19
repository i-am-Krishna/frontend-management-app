import React, { useEffect, useState } from 'react'
import styles from './Analytics.module.css'
import Circle from '../../components/circle/Circle';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const Analytics = () => {
    const [data,setData] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
      const getAnalytics = async()=>{
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/task/count`,{ withCredentials: true });
        setData(response.data.taskCounts);
        setLoading(false);
      }
      getAnalytics();
    },[])
    
  return (
    <div className={styles.container}>
      
      <div className={styles.headings}>Analytics</div>
      
      <div className={styles.box}>
        <div className={styles.firstSec}>
          {loading ? (<Skeleton height={40} width={"100%"} count={4}/>) 
          :
          (
            <>
            <div><p className={styles.para}><Circle height='12px' width='12px' color='#90C4CC'/>Backlog Tasks</p> <p>{data.status?.backlog}</p></div>
            <div><p className={styles.para}><Circle height='12px' width='12px' color='#90C4CC'/>To-do Tasks</p> <p>{data.status?.todo}</p></div>
            <div><p className={styles.para}><Circle height='12px' width='12px' color='#90C4CC'/>In-Progress Tasks</p> <p>{data.status?.inprogress}</p></div>
            <div><p className={styles.para}><Circle height='12px' width='12px' color='#90C4CC'/>Completed Tasks</p> <p>{data.status?.done}</p></div>
          </>
          )
          }
        </div>
        <div className={styles.secondSec}>
        {loading ? (<Skeleton height={40} width={"100%"} count={4}/>) 
          :
          (
            <>
          
            <div><p className={styles.para}> <Circle height='12px' width='12px' color='#90C4CC'/>Low Priority</p> <p>{data.priority?.lowpriority}</p></div>
            <div><p className={styles.para}> <Circle height='12px' width='12px' color='#90C4CC'/>Moderate Priority</p> <p>{data.priority?.moderatepriority}</p></div>
            <div><p className={styles.para}> <Circle height='12px' width='12px' color='#90C4CC'/>High Priority</p> <p>{data.priority?.highpriority}</p></div>
            <div><p className={styles.para}> <Circle height='12px' width='12px' color='#90C4CC'/>Due Date Tasks</p> <p>{data.dueDateCount}</p></div>
            </>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default Analytics