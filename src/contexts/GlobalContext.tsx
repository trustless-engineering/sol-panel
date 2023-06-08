"use client";

import { createContext, useContext, useState } from "react";

interface GlobalContextProps {
  theme: string;
  setTheme?: (theme: string) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  theme: "light",
});

export const GlobalContextProvider = ({ children }: any): React.JSX.Element => {
  const [theme, setTheme] = useState("light");

  return <GlobalContext.Provider value={{ theme, setTheme }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = (): GlobalContextProps => useContext(GlobalContext);
