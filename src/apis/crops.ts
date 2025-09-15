import { CropGetApiResponse, ICrop } from "@/Types/crop.types";
import { ApiResponse } from "@/Types/globaltypes";
import apiClient from "@/Utilities/api.Utility"

export class CropApi {
    getCrops = async (): Promise<CropGetApiResponse> => {
        try {
            const response = await apiClient.get("/crops/getCrops");
            return { Crops: response.data.Crops as ICrop[], Success: true, Message: response.data.message || "" };
        } catch (error) {
            return {
                Success: false,
                Message: error.data.message,
                Crops: []
            }
        }
    }

    createCrop = async (Crop: ICrop): Promise<ApiResponse> => {
        try {
            const response = await apiClient.post("/crops/createcrop", Crop);
            return {
                Success: response.data.success,
                Message: response.data.message,
            }
        } catch (error) {
            console.log(error);
            return {
                Success: error.data.success,
                Message: error.data.message,
            }
        }
    }
}

export const cropApi = new CropApi();