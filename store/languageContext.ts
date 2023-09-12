import { createContext } from "react";

export const LanguageContext = createContext<{ language: string, setLanguage: (language: string) => void }>(null);
