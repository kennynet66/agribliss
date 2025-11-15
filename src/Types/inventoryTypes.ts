import { ApiResponse } from "./globaltypes"

export type TInventory = {
    _id: string;
    itemName: string;
    category: string;
    unit: string;
    purchaseDate: Date;
    value: number;
    currentStock: number;
    location: {
        locationName: string,
        locationDescription: string
    };
    minStock: number;
    maxStock: number;
}

export type GetInventoryItemsApiResponse = ApiResponse & {
    InventoryItems: TInventory[];
    lowStockItems: number;
    totalInventoryItems: number;
    inventoryItemsCountByCategory?: {
        _id: string,
        count: string
    }[],
    totalValue: number
}