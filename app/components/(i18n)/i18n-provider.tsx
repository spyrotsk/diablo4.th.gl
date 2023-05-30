"use client";
import { DICT } from "@/app/lib/i18n";
import { createContext, useContext } from "react";

const Context = createContext<DICT | null>(null);

export const I18NProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DICT;
}) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useDict = () => {
  const value = useContext(Context);

  if (value === null) {
    throw new Error("useI18N must be used within a I18NProvider");
  }

  return value;
};
