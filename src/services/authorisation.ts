// src/services/auth.ts

import type { User } from "@/lib/loginContext";
import { httpRequest } from "./http";
import type { GenerateCode } from "@/features/Auth/components/Login/numberPart";

export const login = async (user: User) => {
  const res = await httpRequest.post("v6/profile/auth/login/", user);

  const { access, refresh } = res.data;

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  return res;
};
export const generateCode = async (user: GenerateCode) => {
  const res = await httpRequest.post("v6/profile/auth/generate-code/", user);

  return res.data;
};
export const getProfile = async () => {
  const res = await httpRequest.get("v6/profile/auth/get-profile/");

  return res.data;
};
