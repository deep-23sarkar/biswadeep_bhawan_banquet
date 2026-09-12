import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;

