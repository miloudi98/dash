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
      man: "man",
      woman: "woman",
      child: "enfant",
      survived: "survived",
      died: "died",
      sex: "sex",
      age: "age",
      sibsp: "siblings",
      parch: "parents/children aboard",
      fare: "fare",
      embarked: "embarked",
      "class": "class",
      who: "who",
      alone: "alone",
      "FALSE": "NO",
      "TRUE": "YES",
      First: "First",
      Second: "Second",
      Third: "Third",
      overview: "Titanic data overview",
      analytics: "Titanic analytics dashboard",
      chart1: '453 men died during the titanic disaster',
      chart2: '79% of men died during the titanic disaster ',
      chart3: '41% of passengers who boarded at port Q died',
      chart4: '47% of Third Class passengers died ',
      chartSelect: "Select chart kind",
      ByPort: "% of deaths based on embarked port",
      ByClass: "% of deaths based on ticket class",
    }

  },
  
  fr: {

    translation: {
      changeLanguage: "Changer la langue",
      context: "Une étude du naufrage du titanic",
      male: "homme",
      female: "femme",
      man: "homme",
      woman: "femme",
      child: "enfant",
      survived: "survécu",
      died: "mort",
      sex: "sexe",
      age: "âge",
      sibsp: "frères et sœurs",
      parch: "Parents / enfants à bord",
      fare: "tarif",
      embarked: "embarqué",
      "class": "classe",
      who: "Qui",
      alone: "seul",
      "FALSE": "non",
      "TRUE": "oui",
      First: "Première",
      Second: "Deuxième",
      Third: "Troisième",
      overview: "Aperçu des données du Titanic",
      analytics: "Tableau de bord analytique du Titanic",
      chart1: '453 hommes sont mort lors du naufrage du titanic',
      chart2: '79 % des hommes sont mort lors du naufrage du titanic',
      chart3: '41 % des passagers qui ont embarqué au port Q sont mort',
      chart4: '47 % des passagers de troisième classe sont mort',
      chartSelect: "Change le type de graphe",
      ByPort: "% des morts basé sur le port d'embarquement",
      ByClass: "% des morts basé sur la classe du ticket",
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
