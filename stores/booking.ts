import { create } from "zustand";

type BookingState = {
  dateSession: string;
  masterIdSession: string;
  timeSlotSession: string;
  bookingForSession: string;
  redirectToSession: string;
  setBookingSession: (
    dateSession?: string,
    masterIdSession?: string,
    timeSlotSession?: string,
    bookingForSession?: string,
    redirectToSession?: string
  ) => void;
  clearBookingSession: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  dateSession: "",
  masterIdSession: "",
  timeSlotSession: "",
  bookingForSession: "",
  redirectToSession: "",
  setBookingSession: (
    dateSession,
    masterIdSession,
    timeSlotSession,
    bookingForSession,
    redirectToSession
  ) =>
    set({
      dateSession: dateSession || "",
      masterIdSession: masterIdSession || "",
      timeSlotSession: timeSlotSession || "",
      bookingForSession: bookingForSession || "",
      redirectToSession: redirectToSession || "",
    }),
  clearBookingSession: () =>
    set({
      dateSession: "",
      masterIdSession: "",
      timeSlotSession: "",
      bookingForSession: "",
      redirectToSession: "",
    }),
}));