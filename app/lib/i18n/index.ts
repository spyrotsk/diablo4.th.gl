import de from "./dictionaries/de.json";
import en from "./dictionaries/en.json";

export type DICT = typeof en | typeof de;
const DICTIONARIES = {
  en,
  de,
} as const;

export const isLang = (lang?: string) => {
  return (
    typeof lang !== "undefined" && Object.keys(DICTIONARIES).includes(lang)
  );
};

export const loadDictionary = (lang = "en") => {
  if (!isLang(lang)) {
    return DICTIONARIES.en;
  }

  return DICTIONARIES[lang as keyof typeof DICTIONARIES];
};
