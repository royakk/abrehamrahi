export const captchaTime = {
  key: "Abr_Captcha",
  get: (): string | null => {
    if (localStorage.getItem(captchaTime.key)) {
      return JSON.parse(localStorage.getItem(captchaTime.key)!);
    } else {
      return null;
    }
  },
  set: (value: string) => {
    localStorage.setItem(captchaTime.key, JSON.stringify(value));
  },
  remove: () => localStorage.removeItem(captchaTime.key),
};
