import { captchaTime } from "@/features/Auth/storage";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isPast(): boolean {
  const timestamp = localStorage.getItem("captchaTime");
  const givenDate = new Date(Number(timestamp) * 1000);
  const now = new Date();
  return now > givenDate;
}
export const getValidCaptcha = () => {
  try {
    const raw = captchaTime.get();
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const expiry = Number(parsed?.captcha_required) * 1000;

    if (parsed?.captcha_required && expiry > Date.now()) {
      return parsed;
    }

    return null;
  } catch (e) {
    console.error(" Failed to parse captcha from captchaTime:", e);
    return null;
  }
};
