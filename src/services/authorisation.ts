// src/services/auth.ts

import type { User } from "@/lib/loginContext";
import type { GenerateCode } from "@/components/login/numberPart";
import { httpRequest } from "./http";

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
export const validateOtp = async (user: GenerateCode) => {
  const res = await httpRequest.post("v6/profile/auth/validate-otp/", user);

  return res.data;
};
