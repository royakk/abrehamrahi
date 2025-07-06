export const captchaTime = {
  key: "Abr_Captcha",
  get: (): any | null => {
    const value = localStorage.getItem(captchaTime.key);
    return value ? JSON.parse(value) : null;
  },
  set: (value: any) => {
    localStorage.setItem(captchaTime.key, JSON.stringify(value));
  },
  remove: () => localStorage.removeItem(captchaTime.key),
};
