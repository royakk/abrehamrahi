import type { UserViewModel } from "@/features/shared/types";
import { create } from "zustand";

interface AuthState {
  user: UserViewModel | undefined | null;
  setUser: (user: UserViewModel | null) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user: user })),
}));

export default useAuthStore;
