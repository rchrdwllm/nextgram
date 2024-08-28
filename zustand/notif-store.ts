"use client";

import { create } from "zustand";

type NotifStore = {
  notifications: number;
  addNotification: () => void;
  removeNotification: () => void;
  setNotifications: (notifications: number) => void;
};

export const useNotifStore = create<NotifStore>()((set) => ({
  notifications: 0,
  addNotification: () =>
    set((state) => ({ notifications: state.notifications + 1 })),
  removeNotification: () =>
    set((state) => ({ notifications: state.notifications - 1 })),
  setNotifications: (notifications: number) => set({ notifications }),
}));
