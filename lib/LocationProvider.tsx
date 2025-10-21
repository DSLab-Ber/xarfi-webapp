"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type LocationContextType = {
  location: [number, number] | [];
  setLocation: React.Dispatch<React.SetStateAction<[number, number] | []>>;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<[number, number] | []>([]);

  useEffect(() => {
    const saved = Cookies.get("coords");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 2) {
          setLocation([parsed[0], parsed[1]]);
        } else {
          Cookies.remove("coords");
        }
      } catch {
        Cookies.remove("coords");
      }
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords: [number, number] = [
              pos.coords.longitude,
              pos.coords.latitude,
            ];
            setLocation(coords);
            Cookies.set("coords", JSON.stringify(coords), {
              expires: 7, // 7 days
            });
          },
          (error) => {
            console.warn("Geolocation error:", error);
          }
        );
      }
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
