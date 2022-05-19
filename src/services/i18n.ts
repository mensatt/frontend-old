import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// This code is adapted from here: https://phrase.com/blog/posts/localizing-react-apps-with-i18next/

type Translation = {
  translation: {
    noFoodMsg: string;
  };
};

type Translations = {
  en: Translation;
  de: Translation;
};

const resources: Translations = {
  de: {
    translation: {
      noFoodMsg: 'Es scheint als gäbe es heute nix zu Essen :(',
    },
  },
  en: {
    translation: {
      noFoodMsg: 'Looks like there is nothing to eat today :(',
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'de', // use "de" language as default
  supportedLngs: ['de', 'en'], // languages we support
  nonExplicitSupportedLngs: true, // allows a de_AT user to use de lang
  fallbackLng: 'en', // language that is used when no language is detected (or no translation exist for that key)
  interpolation: {
    escapeValue: false, // React already does the escaping for use
  },
  debug: process.env.NODE_ENV === 'development', // show debug messages when running in development environment
});

export default i18next;
