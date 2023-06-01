"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

type Value = {
  lang: string;
  search: string;
  name: string;
  coordinates: string;
};

const Context = createContext<{
  value: Value;
  update: (newValue: Partial<Value>) => void;
} | null>(null);

export const OverwolfRouterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState<Value>({
    lang: "en",
    search: "",
    name: "",
    coordinates: "",
  });

  const update = (newValue: Partial<Value>) => {
    setValue((value) => ({ ...value, ...newValue }));
  };

  return (
    <Context.Provider
      value={{
        value,
        update,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useOverwolfRouter = () => {
  const value = useContext(Context);
  const router = useRouter();

  if (value === null) {
    return router;
  }

  return value;
};
