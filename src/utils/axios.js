import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://server-json-data-api.herokuapp.com",
});

export default axiosInstance;
