"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LocPin } from "@/components/constants/Icons";

type LocationContextType = {
  location: [number, number] | [];
  setLocation: React.Dispatch<React.SetStateAction<[number, number] | []>>;
  requestLocation: () => void;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<[number, number] | []>([]);
  const [showModal, setShowModal] = useState(false);

  // 🔸 Unified save helper — writes to both cookie and localStorage
  const saveLocation = (coords: [number, number]) => {
    setLocation(coords);
    Cookies.set("coords", JSON.stringify(coords), { expires: 7 });
    localStorage.setItem("coords", JSON.stringify(coords));
  };

  // 🔸 Request user location (Safari-compatible trigger)
  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ];
        saveLocation(coords);
        setShowModal(false);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        if (error.code === error.PERMISSION_DENIED) {
          alert("You denied location access. Please enable it in your browser settings.");
        }
      }
    );
  };

  // 🔸 Load saved location from cookies/localStorage on mount
  useEffect(() => {
    const saved =
      Cookies.get("coords") || localStorage.getItem("coords");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 2) {
          setLocation([parsed[0], parsed[1]]);
          return;
        } else {
          Cookies.remove("coords");
          localStorage.removeItem("coords");
        }
      } catch {
        Cookies.remove("coords");
        localStorage.removeItem("coords");
      }
    }

    // No saved data → show modal
    setShowModal(true);
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation, requestLocation }}>
      {children}

      {/* Modal prompting for location access */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-sm border-0 shadow-xl rounded-3xl p-6 text-center">
          {/* Icon section */}
          <div className="flex justify-center pb-4">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <LocPin width={40} height={40} />
            </div>
          </div>

          {/* Header */}
          <DialogHeader className="text-center space-y-4">
            <DialogTitle className="text-2xl font-bold">
              Allow Location Access
            </DialogTitle>

            <DialogDescription className="text-base leading-relaxed text-gray-600">
              We use your location to show nearby content and improve your experience.
            </DialogDescription>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-x-3 w-full mt-5">
              <Button
                onClick={requestLocation}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Enable Location
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="border-2 border-orange-500 font-semibold py-3 rounded-xl transition-all duration-200"
              >
                Not Now
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </LocationContext.Provider>
  );
};

// 🔸 Hook for easy access to the context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
