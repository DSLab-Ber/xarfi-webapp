"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { getTranslation, getDirection } from './../lib/i18n';
import type { Language } from './../lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
  setLanguageFlag: any;
  languageFlag: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');
  const [languageFlag, setLanguageFlag] = useState<any>('DE');

  // useEffect(() => {
  //   // Check for saved language preference or default to German
  //   const savedLanguage = localStorage.getItem('language') as Language | null;
  //   if (savedLanguage) {
  //     setLanguage(savedLanguage);
  //   } else {
  //     // Check browser language
  //     // console.log(navigator.language,'navigator.languagenavigator.language')
  //     // const browserLanguage = navigator.language.split('-')[0] as Language;
  //     // if (['en', 'de', 'ar', 'uk', 'vi'].includes(browserLanguage)) {
  //     //   setLanguage(browserLanguage);
  //     // } else {
  //       // Fallback to German if browser language not supported
  //       setLanguage('de');
  //     // }
  //   }
  // }, []);

  useEffect(() => {
    // Apply language to document
    document.documentElement.lang = language;
    document.documentElement.dir = getDirection(language);

    // Save to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => getTranslation(language, key);
  const direction = getDirection(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, direction, setLanguageFlag, languageFlag }}>
      {children}
    </LanguageContext.Provider>
  );
};
