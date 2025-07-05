import type { LoginReq } from "@/features/Auth/types";
import { create } from "zustand";

interface LoginFormsType {
  loginForms: LoginReq | undefined | null;
  setLoginForms: (values: Partial<LoginReq> | null) => void; 
}

const useLoginStore = create<LoginFormsType>()((set) => ({
  loginForms: {
    prefix:"+98"
  },
  setLoginForms: (values) => set((state) => ({
    loginForms: values ? { ...state.loginForms, ...values } : null, 
  })),
}));

export default useLoginStore;
