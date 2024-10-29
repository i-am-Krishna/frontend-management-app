import axios from 'axios';

export const isAuthenticated = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/checkauth`, { withCredentials: true });
    console.log(6)
    return response.status === 200;
  } catch (error) {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/checkauth`, { withCredentials: true });
      console.log(12)
      return response.status === 200;
    } catch {
      return false;
    }
  }
};
