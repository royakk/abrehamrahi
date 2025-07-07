export const captchaTime = {
  key: "Abr_Captcha",
  get: (): any | null => {
    const value = JSON.parse(localStorage.getItem(captchaTime.key)!);
    return value ? value : null;
  },
  set: (value: any) => {
    localStorage.setItem(captchaTime.key, JSON.stringify(value));
  },
  remove: () => localStorage.removeItem(captchaTime.key),
};
