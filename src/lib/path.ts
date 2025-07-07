const PATH = {
  profile: "/",
  login: "/login",
  changePassword: "/change-password",
  register: "/register",
};

const API = {
  captcha: {
    generate: "v1/captcha/get-captcha/",
  },

  profile: {
    generateCode: "v6/profile/auth/generate-code/",
    validateOtp: "v6/profile/auth/validate-otp/",
    login: "v6/profile/auth/login/",
    refreshToken: "v2/profile/auth/token-refresh/",
    register: "/vsaas/api/v1/profile/register/",
    getProfile: "v6/profile/auth/get-profile/",
  },
};
export { API, PATH };
