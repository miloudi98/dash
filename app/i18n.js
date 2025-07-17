import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {

    translation: {
      changeLanguage: "Change language",
      context: "Analysis of the titanic disaster",
      male: "male",
      female: "female",
      survived: "survived",
      died: "died",
    }

  },
  
  fr: {

    translation: {
      changeLanguage: "Changer la langue",
      context: "Une étude du naufrage du titanic",
      male: "homme",
      female: "femme",
      survived: "survécu",
      died: "mort",
    }

  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
  });

export default i18n;
