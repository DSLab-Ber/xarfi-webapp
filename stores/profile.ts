// store/useProfileStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Location = {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
};

type Profile = {
  id: string;
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  image: string;
  password?: string; // usually don’t expose on frontend
  gender: "men" | "women" | "other" | string; // you can refine this if backend enforces
  stage: string;
  role: "user" | "admin" | string;
  isVerified: boolean;
  isPasswordChanged: boolean;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  location: Location;
};

type ProfileState = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => {
        set({ profile });
        if (profile?.location?.coordinates) {
          document.cookie = `coords=${JSON.stringify(
            profile.location.coordinates
          )}; path=/; SameSite=Lax`;
        }
      },
      clearProfile: () => {
        set({ profile: null });
        document.cookie =
          "coords=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      },
    }),
    { name: "profile-storage" }
  )
);
