import { BASE_URL } from "@/Constants/api.Constants";
import { alertService } from "@/Services/alert.Service";
import axios from "axios";

const apiClient = axios.create({
    baseURL: BASE_URL
});

apiClient.interceptors.response.use((response) => response, (error) => {
    const response = { error }
    if (error.response.data.message === "Unauthorized access!") {
        return alertService.show("Warning", error.response.data.message, "destructive");
    }
})

export default apiClient;