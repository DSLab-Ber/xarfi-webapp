import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  _id: string;
  owner: string;
  name: string;
  description: string;
  quantity: number; // available stock
  totalQuantity: number; // available stock
  price: number;
  imageUrl: string;
};

type ProductState = {
  productsByOwner: Record<string, Product[]>; // key = ownerId
  setProductsForOwner: (ownerId: string, products: Product[]) => void;
  addProductForOwner: (ownerId: string, product: Product) => void;
  updateProductForOwner: (ownerId: string, product: Product) => void;
  removeProductForOwner: (ownerId: string, productId: string) => void;
  clearProductsForOwner: (ownerId: string) => void;
  getProductsForOwner: (ownerId: string) => Product[];
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      productsByOwner: {},

      // Set bulk products (replace all for one owner)
      setProductsForOwner: (ownerId, products) =>
        set((state) => ({
          productsByOwner: { ...state.productsByOwner, [ownerId]: products },
        })),

      // Add a product (if exists -> increase quantity)
      addProductForOwner: (ownerId, product) =>
        set((state) => {
          const existing = state.productsByOwner[ownerId] || [];
          const found = existing.find((p) => p._id === product._id);

          if (found) {
            return {
              productsByOwner: {
                ...state.productsByOwner,
                [ownerId]: existing.map((p) =>
                  p._id === product._id
                    ? { ...p, quantity: p.quantity + product.quantity }
                    : p
                ),
              },
            };
          }

          return {
            productsByOwner: {
              ...state.productsByOwner,
              [ownerId]: [...existing, product],
            },
          };
        }),

      // Update product (full replacement by _id)
      updateProductForOwner: (ownerId, product) =>
        set((state) => {
          const existing = state.productsByOwner[ownerId] || [];
          return {
            productsByOwner: {
              ...state.productsByOwner,
              [ownerId]: existing.map((p) =>
                p._id === product._id ? product : p
              ),
            },
          };
        }),

      // Remove product
      removeProductForOwner: (ownerId, productId) =>
        set((state) => {
          const existing = state.productsByOwner[ownerId] || [];
          return {
            productsByOwner: {
              ...state.productsByOwner,
              [ownerId]: existing.filter((p) => p._id !== productId),
            },
          };
        }),

      // Clear all products for owner
      clearProductsForOwner: (ownerId) =>
        set((state) => {
          const copy = { ...state.productsByOwner };
          delete copy[ownerId];
          return { productsByOwner: copy };
        }),

      // Get products for a specific owner
      getProductsForOwner: (ownerId) => {
        return get().productsByOwner[ownerId] || [];
      },
    }),
    { name: "products-by-owner-storage" } // localStorage key
  )
);
