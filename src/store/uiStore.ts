import { create } from 'zustand';

interface UIState {
  isAddProductModalOpen: boolean;
  setAddProductModalOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAddProductModalOpen: false,

  setAddProductModalOpen: (isOpen: boolean) => set({ isAddProductModalOpen: isOpen }),
}));
