import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  id: string;
  role: string;
  name: string;
  image: string;
  email?: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  userId: string;
  otpExpiresTime: string;
  setAuth: (
    userId?: string,
    otpExpiresTime?: string,
    user?: User,
    token?: string | null
  ) => void;
  setOtpExpiresTime: (otpExpiresTime?: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      userId: "",
      otpExpiresTime: "",
      setAuth: (userId, otpExpiresTime, user, token) =>
        set({
          userId: userId || "",
          otpExpiresTime: otpExpiresTime || "",
          user: user || null,
          token: token || null,
        }),
      setOtpExpiresTime: (otpExpiresTime) => set({ otpExpiresTime: otpExpiresTime }),
      clearAuth: () =>
        set({
          userId: "",
          otpExpiresTime: "",
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage), // 👈 store in sessionStorage
    }
  )
);
