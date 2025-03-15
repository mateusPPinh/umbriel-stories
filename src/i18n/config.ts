import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import blockBuilderEN from './locales/en/blockBuilder.json';
import blockBuilderPTBR from './locales/pt-BR/blockBuilder.json';

const resources = {
  en: {
    blockBuilder: blockBuilderEN
  },
  'pt-BR': {
    blockBuilder: blockBuilderPTBR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    defaultNS: 'blockBuilder'
  });

export default i18n; 