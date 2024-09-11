export type ICrop = {
    id: string;
    name: string;
    variety: string;
    updatedAt: string;
    quantity: string;
    "harvested_at": string,
    "price_per_kg": string,
    "location": string,
    "irrigation_type": string,
    "fertilizer_used": string,
    "market_availability": boolean,
    "storage_instruction": string,
    "description": string,
    "full_img"?: string,
    "cover_img": string,
    "category": number,
    "farmer": number
};