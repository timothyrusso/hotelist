import { en } from './en';

const resources = {
  en: {
    translation: en,
  },
};

const mockedLanguage = 'en';

export const locales = resources[mockedLanguage].translation;
