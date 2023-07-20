import axios from "axios";
import { API_ENDPOINT } from "./constant";
const AxiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

AxiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem("jwt_token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export default AxiosInstance;
