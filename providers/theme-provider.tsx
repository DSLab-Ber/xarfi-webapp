"use client";

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { changeDarkModeApi } from "@/lib/api/user/settings";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme | undefined;
  toggleTheme: () => void;
  logo: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

function InternalThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [logo, setLogo] = useState("/assets/logo-dark.png");
  const { lang } = useParams();

  // Update logo based on current theme
  useEffect(() => {
    if (resolvedTheme === "dark") {
      setLogo("/assets/logo-dark.png");
    } else {
      setLogo("/assets/logo-light.png");
    }
  }, [resolvedTheme]);

  const toggleTheme = async () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      const data = await changeDarkModeApi(lang as string, newTheme === "dark");
      toast.success(data.message);
    } catch (err: any) {
      toast.error(err?.message || "Failed to update theme");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme as Theme, toggleTheme, logo }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <InternalThemeProvider>{children}</InternalThemeProvider>
    </NextThemesProvider>
  );
};
