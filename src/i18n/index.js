import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import id from './id.json';
import en from './en.json';

const savedLanguage = localStorage.getItem('dot-quiz-auth')
  ? JSON.parse(localStorage.getItem('dot-quiz-auth')).language
  : 'id';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en }
    },
    lng: savedLanguage,
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
