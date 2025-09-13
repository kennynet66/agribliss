export type ICrop = {
    name: string
    variety: string
    area: number
    cropStatus: string
    plantingDate: Date
    expectedHarvestDate: Date
    areaUnit: string
}

export type CropGetApiResponse = {
    Crops? :ICrop,
    Message?: string,
    Success: boolean
}