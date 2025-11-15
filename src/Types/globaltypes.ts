export type ApiResponse = {
    Success: boolean,
    Message: string
}

export const Units =
    ["acre", "hectare", "square meter", "square kilometer", "square foot", "square mile", "meter", "kilometer", "foot", "yard", "mile", "liter", "milliliter", "cubic meter", "gallon", "barrel", "gram", "kilogram", "tonne", "pound", "ounce", "stone", "bushel", "quintal", "bale", "head"];

export type TUnits =
    | "acre" | "hectare" | "square meter" | "square kilometer" | "square foot" | "square mile"
    | "meter" | "kilometer" | "foot" | "yard" | "mile"
    | "liter" | "milliliter" | "cubic meter" | "gallon" | "barrel"
    | "gram" | "kilogram" | "tonne" | "pound" | "ounce" | "stone"
    | "bushel" | "quintal" | "bale" | "head";

export const MeasurementUnits = {
    AreaUnits: [
        { key: "Square meter", value: "square meter" },
        { key: "Hectare", value: "hectare" },
        { key: "Acre", value: "acre" },
        { key: "Square kilometer", value: "square kilometer" },
        { key: "Square foot", value: "square foot" },
        { key: "Square mile", value: "square mile" }
    ],

    LengthUnits: [
        { key: "Meter", value: "meter" },
        { key: "Kilometer", value: "kilometer" },
        { key: "Foot", value: "foot" },
        { key: "Yard", value: "yard" },
        { key: "Mile", value: "mile" }
    ],

    /**
     * Developer notes
     * Can be used when a user selects measurement type as volumetric
     */
    VolumeUnits: [
        { key: "Liter", value: "liter" },
        { key: "Milliliter", value: "milliliter" },
        { key: "Cubic meter", value: "cubic meter" },
        { key: "Gallon", value: "gallon" },
        { key: "Barrel", value: "barrel" },
        { key: "Bushel", value: "bushel" } // often used for grain
    ],

    WeightUnits: [
        { key: "Gram", value: "gram" },
        { key: "Kilogram", value: "kilogram" },
        { key: "Tonne", value: "tonne" },
        { key: "Quintal", value: "quintal" },
        { key: "Pound", value: "pound" },
        { key: "Ounce", value: "ounce" },
        { key: "Stone", value: "stone" },
        { key: "Bale", value: "bale" } // e.g. hay or cotton bales
    ],

    LivestockUnits: [
        { key: "Head", value: "head" } // used to count cattle or livestock
    ],
    UnitCountUnits: [
        { key: "Piece", value: "piece" },
        { key: "Box", value: "box" },
        { key: "Pack", value: "pack" },
        { key: "Unit", value: "unit" },
        { key: "Set", value: "set" },
    ],
};
