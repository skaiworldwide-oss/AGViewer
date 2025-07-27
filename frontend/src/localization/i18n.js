import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './en/translation.json';
import translationKO from './ko/translation.json';
import translationZH from './zh/translation.json';
import translationES from './es/translation.json';
import translationAR from './ar/translation.json';

import cypherResultEN from './en/cypherResult.json';
import cypherResultKO from './ko/cypherResult.json';
import cypherResultZH from './zh/cypherResult.json';
import cypherResultES from './es/cypherResult.json';
import cypherResultAR from './ar/cypherResult.json';

import modalsEN from './en/modals.json';
import modalsKO from './ko/modals.json';
import modalsZH from './zh/modals.json';
import modalsES from './es/modals.json';
import modalsAR from './ar/modals.json';

import cytoscapeEN from './en/cytoscape.json';
import cytoscapeKO from './ko/cytoscape.json';
import cytoscapeZH from './zh/cytoscape.json';
import cytoscapeES from './es/cytoscape.json';
import cytoscapeAR from './ar/cytoscape.json';

import frameEN from './en/frame.json';
import frameKO from './ko/frame.json';
import frameZH from './zh/frame.json';
import frameES from './es/frame.json';
import frameAR from './ar/frame.json';

const resources = {
  en: {
    translation: translationEN,
    cypherResult: cypherResultEN,
    modals: modalsEN,
    cytoscape: cytoscapeEN,
    frame: frameEN,
  },
  ko: {
    translation: translationKO,
    cypherResult: cypherResultKO,
    modals: modalsKO,
    cytoscape: cytoscapeKO,
    frame: frameKO,
  },
  zh: {
    translation: translationZH,
    cypherResult: cypherResultZH,
    modals: modalsZH,
    cytoscape: cytoscapeZH,
    frame: frameZH,
  },
  es: {
    translation: translationES,
    cypherResult: cypherResultES,
    modals: modalsES,
    cytoscape: cytoscapeES,
    frame: frameES,
  },
  ar: {
    translation: translationAR,
    cypherResult: cypherResultAR,
    modals: modalsAR,
    cytoscape: cytoscapeAR,
    frame: frameAR,
  },
};

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next) // Connects with React
  .init({
    resources,
    ns: ['translation', 'cypherResult', 'modals', 'cytoscape', 'frame'], // list all namespaces here
    defaultNS: 'translation', // default namespace when not specified
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    detection: {
      order: ['localStorage', 'navigator'], // Language detection priority
      caches: ['localStorage'], // Store user preference
    },
  });

export default i18n;
