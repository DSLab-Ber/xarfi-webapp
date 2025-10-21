import { translations } from "./translations";


export type Language = 'en' | 'de' | 'ar' | 'uk' | 'vi' | 'tr' | 'pl' | 'fr';

export const languages: {
  code: Language;
  name: string;
  flag: string; // for react-world-flags
}[] = [
    { code: 'ar', name: 'العربية', flag: 'SA' },
    { code: 'de', name: 'Deutsch', flag: 'DE' },
    { code: 'en', name: 'English', flag: 'GB' },
    { code: 'fr', name: 'Français', flag: 'FR' },
    { code: 'pl', name: 'Polski', flag: 'PL' },
    { code: 'vi', name: 'Tiếng Việt', flag: 'VN' },
    { code: 'tr', name: 'Türkçe', flag: 'TR' },
    { code: 'uk', name: 'Українська', flag: 'UA' },
  ];

export const getTranslation = (language: Language, key: string): any => {
  const translation = translations[language];
  if (!translation) return key;

  const keys = key.split('.');
  let value: any = translation;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  return value;
};

export const getDirection = (language: Language): 'ltr' | 'rtl' => {
  return language === 'ar' ? 'rtl' : 'ltr';
};
