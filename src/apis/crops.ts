import { CreateCropApiResponse, CropGetApiResponse, ICrop } from "@/Types/crop.types";
import apiClient from "@/Utilities/api.Utility"

export class CropApi {
    getCrops = async (): Promise<CropGetApiResponse> => {
        try {
            const response = await apiClient.get("/crops/getCrops");
            return { Crops: response.data.Crops as ICrop[], Success: true };
        } catch (error) {
            return {
                Success: false,
                Message: error.data.message,
                Crops: []
            }
        }
    }

    createCrop = async (Crop: ICrop): Promise<CreateCropApiResponse> => {
        try {
            const response = await apiClient.post("/crops/createcrop", Crop);
            return {
                success: response.data.success,
                message: response.data.message,
            }
        } catch (error) {
            console.log(error);
            return {
                success: error.data.success,
                message: error.data.message,
            }
        }
    }
}

export const cropApi = new CropApi();