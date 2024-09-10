import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: {
                translation: {
                    welcome: "Welcome"
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