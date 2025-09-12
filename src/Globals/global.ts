import { ICrop } from "@/Types/crop.types";

export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

export class CropCounter {
    crops: ICrop[]

    constructor(crops: ICrop[]) {
        this.crops = crops;
    }
    getActiveCropsCount(): number {
        let counter = 0;
        this.crops.map((crop) => {
            if (crop.cropStatus === "active") counter++
        })
        return counter;
    }

    getTotalLandUsed(): number {
        let counter = 0;
        this.crops.map((crop) => {
            counter += crop.area
        })
        return counter;
    }

    getReadyToHarvestCrops(): number {
        let counter = 0;
        this.crops.map(crop => {
            if(crop.cropStatus === "ready_to_harvest") counter ++;
        })
        return counter;
    }

    getHarvestedCrops(): number {
        let counter = 0;
        this.crops.map(crop => {
            if(crop.cropStatus === "harvested") counter ++;
        })
        return counter;
    }
}