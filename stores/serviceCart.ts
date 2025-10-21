import { create } from "zustand";
import { persist } from "zustand/middleware";

type Service = {
  _id: string;
  owner: string;
  name: string;
  targetGroup: string[];
  duration: number;
  price: number;
  image: string;
};

type ServiceState = {
  servicesByOwner: Record<string, Service[]>; // key = ownerId, value = services[]
  setServicesForOwner: (ownerId: string, services: Service[]) => void;
  addServiceForOwner: (ownerId: string, service: Service) => void;
  updateServiceForOwner: (ownerId: string, service: Service) => void;
  removeServiceForOwner: (ownerId: string, serviceId: string) => void;
  clearServicesForOwner: (ownerId: string) => void;
  getServicesForOwner: (ownerId: string) => Service[];
};

export const useServiceStore = create<ServiceState>()(
  persist(
    (set, get) => ({
      servicesByOwner: {},

      // Replace all services for an owner
      setServicesForOwner: (ownerId, services) =>
        set((state) => ({
          servicesByOwner: { ...state.servicesByOwner, [ownerId]: services },
        })),

      // Add one service under specific owner
      addServiceForOwner: (ownerId, service) =>
        set((state) => {
          const existing = state.servicesByOwner[ownerId] || [];
          // prevent duplicates by _id
          if (existing.some((s) => s._id === service._id)) {
            return state;
          }
          return {
            servicesByOwner: {
              ...state.servicesByOwner,
              [ownerId]: [...existing, service],
            },
          };
        }),

      // Update existing service by _id
      updateServiceForOwner: (ownerId, service) =>
        set((state) => {
          const existing = state.servicesByOwner[ownerId] || [];
          return {
            servicesByOwner: {
              ...state.servicesByOwner,
              [ownerId]: existing.map((s) =>
                s._id === service._id ? service : s
              ),
            },
          };
        }),

      // Remove one service
      removeServiceForOwner: (ownerId, serviceId) =>
        set((state) => {
          const existing = state.servicesByOwner[ownerId] || [];
          return {
            servicesByOwner: {
              ...state.servicesByOwner,
              [ownerId]: existing.filter((s) => s._id !== serviceId),
            },
          };
        }),

      // Clear all services of an owner
      clearServicesForOwner: (ownerId) =>
        set((state) => {
          const copy = { ...state.servicesByOwner };
          delete copy[ownerId];
          return { servicesByOwner: copy };
        }),

      // Getter
      getServicesForOwner: (ownerId) => {
        return get().servicesByOwner[ownerId] || [];
      },
    }),
    { name: "services-by-owner-storage" } // localStorage key
  )
);
