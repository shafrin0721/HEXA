import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUS from './locales/en-US.json';
import enGB from './locales/en-GB.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import ja from './locales/ja.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';

export const SUPPORTED_LANGUAGES = {
  'en-US': 'English (US)',
  'en-GB': 'English (UK)',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'ja': '日本語',
  'zh': '中文',
  'ar': 'العربية',
  'hi': 'हिन्दी',
  'pt': 'Português'
};

const resources = {
  'en-US': { translation: enUS },
  'en-GB': { translation: enGB },
  'es': { translation: es },
  'fr': { translation: fr },
  'de': { translation: de },
  'ja': { translation: ja },
  'zh': { translation: zh },
  'ar': { translation: ar },
  'hi': { translation: hi },
  'pt': { translation: pt }
};

i18n
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en-US',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
