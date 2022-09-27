import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://json-server-raihan2002.herokuapp.com",
});

export default axiosInstance;
