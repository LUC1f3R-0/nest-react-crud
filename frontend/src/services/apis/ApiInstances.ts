import axios from "axios";

const baseUrl = import.meta.env.BASE_URL; 

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json", }
})

export default AxiosInstance;