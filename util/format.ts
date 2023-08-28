import { Language } from "../models/language";

function normalizer(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function languageMatch(language: Language, search: string): boolean {
  if (search === "") return true;

  let regex = new RegExp(normalizer(search), "i");

  if (normalizer(language.name).search(regex) >= 0) return true;

  if (normalizer(language.nameInLanguage).search(regex) >= 0) return true;

  if (normalizer(language.language).search(regex) >= 0) return true;

  return false;
}
