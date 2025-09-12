import { BASE_URL } from "@/Constants/api.Constants";
import axios from "axios";

const apiClient = axios.create({
    baseURL: BASE_URL
});

axios.interceptors.response.use((response) => response, (error) => {
    console.log("Called")
    const response = { error }
    console.log("Response in interceptor", error.response)
})

export default apiClient;