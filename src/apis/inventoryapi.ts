import { ApiResponse } from "@/Types/globaltypes";
import { GetInventoryItemsApiResponse, TInventory } from "@/Types/inventoryTypes";
import apiClient from "@/Utilities/api.Utility";

class InventoryApi {
    async getInventoryItems(): Promise<GetInventoryItemsApiResponse> {
        try {
            const data = await apiClient.get("/inventory/getinventoryitems");
            return { InventoryItems: data.data.Items, Success: true, Message: data.data.message, lowStockItems: data.data.lowStockItems, totalInventoryItems: data.data.totalInventoryItems, inventoryItemsCountByCategory: data.data.inventoryItemsCountByCategory, totalValue: data.data.totalValue };
        } catch (error) {
            throw Error(error)
        }
    }

    async createInventoryItem(inventoryItem: TInventory): Promise<ApiResponse> {
        try {
            const response = await apiClient.post("/inventory/createinventoryitem", inventoryItem);
            return {
                Success: response.data.success,
                Message: response.data.message
            }
        } catch (error) {
            console.log(error);
            return {
                Success: error.data.success,
                Message: error.data.message
            }
        }
    }
}

export const inventoryApi = new InventoryApi();