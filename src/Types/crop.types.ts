export type ICrop = {
    _id: string,
    name: string
    variety: string
    area: number
    cropStatus: string
    plantingDate: Date
    expectedHarvestDate: Date
    areaUnit: string
    irrigationStatus: string
}

export type CropGetApiResponse = {
    Crops? :ICrop[],
    Message?: string,
    Success: boolean
}

export type CreateCropApiResponse = {
    success: boolean;
    message: string;
}