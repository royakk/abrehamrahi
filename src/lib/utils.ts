import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isPast(): boolean {
  const timestamp = localStorage.getItem("captchaTime");
  const givenDate = new Date(Number(timestamp) * 1000);
  const now = new Date();
  return now < givenDate;
}
