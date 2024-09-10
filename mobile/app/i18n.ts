import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: {
                translation: {
                    welcome: "Welcome",
                    addCropPage: {
                        header: "Add Crop",
                        category: "Category",
                        name: "Name",
                        variety: "Variety",
                        farmer: "Farmer",
                        harvested_at: "Harvested On",
                        quantity: "Quanitity",
                        price_per_kg: "Price Per KG",
                        location: "Location",
                        cover_img: "",
                        images: "",
                        irrigation_type: "Irrigation Type",
                        fertilizer_used: "Fertilizer Used",
                        market_availability: "Market Availability",
                        storage_instruction: "Storage Instruction",
                        description: "Description"
                    },
                    farmerRegistration: {
                        header: "Farmer Registration",
                        phone_no: "",
                        location: "",
                        profile_pic: "",
                        is_verified: "",
                        languages_spoken: "",
                        preferred_quantity_unit: "",
                    },
                    BuyerRegistration: {
                        header: "Buyer Registration",
                        phone_no: "",
                        location: "",
                        profile_pic: "",
                        is_verified: "",
                        languages_spoken: "",
                        preferred_quantity_unit: "",
                    }
                }
            },
            gj: {
                translation: {
                    welcome: "સ્વાગત"
                }
            },
            hn: {
                translation: {
                    welcome: "स्वागत"
                }
            },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;