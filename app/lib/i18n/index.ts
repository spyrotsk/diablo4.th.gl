import de from "./dictionaries/de.json";
import en from "./dictionaries/en.json";

const DICTIONARIES = {
  en,
  de,
} as const;

export const isLocale = (locale?: string) => {
  return (
    typeof locale !== "undefined" && Object.keys(DICTIONARIES).includes(locale)
  );
};

export const loadDictionary = (locale = "en") => {
  if (!isLocale(locale)) {
    return DICTIONARIES.en;
  }

  return DICTIONARIES[locale as keyof typeof DICTIONARIES];
};
