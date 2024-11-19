import React, { useEffect, useState } from 'react'
import styles from './FindUserEmail.module.css'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const FindUserEmail = ({message, setFindUser}) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchUsers = async () => {  
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user`,{ withCredentials: true });
                    setLoading(false);
                    setAllUsers(response.data.users);    
                } catch (error) {
                    console.error(error);
                }
            }
            fetchUsers(); 
        }, []);


    function getInitials(str) {
        if (!str) return ''; 
        return str.slice(0, 2).toUpperCase(); 
      }  
  
const handleSelect = (item) => {  
    setFindUser(item);
    setSelectedItem(item);
    setIsDropdownOpen(false);
};    
      
    return (

    <div className={styles.customDropdown}>
                    <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {selectedItem ? (
                                <span>{selectedItem.email}</span>
                        ) : (
                            <span style={{color: 'gray',fontSize:'16px'}}>{message}</span>
                        )}
                    </div>

                    {isDropdownOpen && (
                        <ul className={styles.dropdownList}>
                            {loading ?( 
                                <div style={{ textAlign: "center" }}>
                                {Array(5)
                                  .fill(0)
                                  .map((_, index) => (
                                    <Skeleton
                                      key={index}
                                      height={30}
                                      width={"97%"}
                                      style={{ display: "inline-block", margin: "1px 5px" }}
                                    />
                                  ))}
                              </div> 
                             ):
                            (allUsers?.map((item) => ( 
                                <li key={item._id} className={styles.assignedPlace} onClick={() => handleSelect(item)}>
                                <button className={styles.avatarPlace}>{getInitials(item?.email)}</button>
                                <span className={styles.emailNamePlace}>{item?.email}</span>
                                <button className={styles.assignButton} >Assign</button>
                                </li>
                            )))
                        }
                        </ul>
                    )}
                </div>

  )
}

export default FindUserEmail