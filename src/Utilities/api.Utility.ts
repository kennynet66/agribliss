import { BASE_URL } from "@/Constants/api.Constants";
import { alertService } from "@/Services/alert.Service";
import axios from "axios";

const token = import.meta.env.VITE_TEST_TOKEN
const apiClient = axios.create({
    baseURL: BASE_URL
});

apiClient.interceptors.request.use((config) => {
    config.headers.authorization = `bearer ${token}`
    return config
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => response, (error) => {
    const response = { error }
    if (error.response.data.message === "Unauthorized access!") {
        return alertService.show("Warning", error.response.data.message, "destructive");
    }
    return error.response;
})

export default apiClient;