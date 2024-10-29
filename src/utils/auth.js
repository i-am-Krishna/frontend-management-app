import axios from 'axios';

export const isAuthenticated = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/checkauth`,{ withCredentials: true });
      if (response) {
        return true 
      }
      return false
    } catch (error) {
      return false
    }
  }
  
  