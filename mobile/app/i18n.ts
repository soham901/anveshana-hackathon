import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: {
                translation: {
                    products: 'Products',
                    login: 'Login',
                    signup: 'Sign Up',
                    email: 'Email',
                    password: 'Password',
                    submit: 'Submit'
                }
            },
            gj: {
                translation: {
                    products: 'G Products',
                    login: 'G Login',
                    signup: 'G Sign Up',
                    email: 'G Email',
                    password: 'G Password',
                    submit: 'G Submit'
                }
            },
            hn: {
                translation: {
                    products: 'H Products',
                    login: 'H Login',
                    signup: 'H Sign Up',
                    email: 'H Email',
                    password: 'H Password',
                    submit: 'H Submit'
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