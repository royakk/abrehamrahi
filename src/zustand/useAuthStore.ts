import type { UserViewModel } from "@/features/shared/types";
import { create } from "zustand";

// interface AuthState {
//   user: UserViewModel | undefined | null;
//   setUser: (user: UserViewModel | null) => void;
// }

// const useAuthStore = create<AuthState>()((set) => ({
//   user: undefined,
//   setUser: (user) => set(() => ({ user: user })),
// }));

// export default useAuthStore;

// useAuthStore.ts

interface AuthState {
  user: UserViewModel | null | undefined;
  isLoading: boolean;
  setUser: (user: UserViewModel | null) => void;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useAuthStore;
