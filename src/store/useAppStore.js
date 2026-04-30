import { create } from "zustand";

const useAppStore = create((set) => ({
  isDialerOpen: false,

  openDialer: () => set({ isDialerOpen: true }),
  closeDialer: () => set({ isDialerOpen: false }),
}));

export default useAppStore;