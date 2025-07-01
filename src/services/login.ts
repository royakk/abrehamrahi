// src/services/auth.ts

import type { User } from "@/lib/loginContext";
import { http } from "./http";
import type { GenerateCode } from "@/components/login/numberPart";

export const login = async (user: User) => {
  const res = await http.post("v6/profile/auth/login/", user);

  const { access, refresh } = res.data;

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  return res;
};
export const generateCode = async (user: GenerateCode) => {
  const res = await http.post("v6/profile/auth/generate-code/", user);

  return res.data;
};
