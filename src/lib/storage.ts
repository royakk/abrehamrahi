import Cookies from "js-cookie";
export const authToken = {
  key: "ABR_TOKEN",
  get: function (): { access: string; refresh: string } | null {
    const data = Cookies.get(authToken.key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        authToken.remove();
      }
    }
    return null;
  },
  set: (value: { access: string; refresh: string }) => {
    Cookies.set(authToken.key, JSON.stringify(value));
  },
  remove: () => {
    Cookies.remove(authToken.key);
  },
};
