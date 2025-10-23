import { create } from "zustand";
import axios from "axios";

type Booking = {
    id: string;
    date: string;
    time: string;
    masterName?: string;
    serviceName?: string;
    [key: string]: any; // allows flexibility for API data
};

type BookingsState = {
    upcomingBookings: Booking[];
    pastBookings: Booking[];
    favoriteBookings: Booking[];
    loading: boolean;
    error: string | null;

    // Actions
    fetchBookings: (token: string, lang: string, callback?: any) => Promise<void>;
    clearBookings: () => void;
};

export const useBookingsStore = create<BookingsState>((set) => ({
    upcomingBookings: [],
    pastBookings: [],
    favoriteBookings: [],
    loading: false,
    error: null,

    fetchBookings: async (token: string, lang: string, callback?: any) => {
        set({ loading: true, error: null });

        try {
            const headers = {
                Authorization: token ? `Bearer ${token}` : "",
            };

            const [upcomingRes, pastRes, favoriteRes] = await Promise.allSettled([
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/booking-appointment-upcoming?lang=${lang}`, { headers }),
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/booking-appointment-past?lang=${lang}`, { headers }),
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/favorite-bookings?lang=${lang}`, { headers }),
            ]);

            set({
                upcomingBookings:
                    upcomingRes.status === "fulfilled" ? upcomingRes.value.data.data || [] : [],
                pastBookings:
                    pastRes.status === "fulfilled" ? pastRes.value.data.data || [] : [],
                favoriteBookings:
                    favoriteRes.status === "fulfilled" ? favoriteRes.value.data.data || [] : [],
                loading: false,
            });
            if (callback) {
                callback()
            }
        } catch (err: any) {
            console.error("Error fetching bookings:", err);
            set({ error: "Failed to load bookings", loading: false });
        }
    },

    clearBookings: () => {
        set({
            upcomingBookings: [],
            pastBookings: [],
            favoriteBookings: [],
            error: null,
        });
    },
}));
