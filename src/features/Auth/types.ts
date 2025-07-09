export type Token = {
  access: string;
  refresh: string;
};
export type GenerateOtpReq = {
  phone?: string;
  request_type?: number;
  prefix?: string;
  captcha_value?: string;
  captcha_proivider?: string;
  captcha_id?: string;
};
export type GenerateOtpRes = {
  captcha_required: string;
};
export type ValidateOtp = {
  phone: string;
  prefix: string;
  captcha_value?: string;
  captcha_proivider?: string;
  captcha_id?: string;
  code: string;
};
export type Captcha = {
  id: string;
  provider: string;
  image: string;
};
export type CaptchaState = {
  scope: string;
  captcha_required: number;
};
export type CaptchaDialogProps = {
  // captcha: Partial<CaptchaState>;
  // setCaptcha: Dispatch<SetStateAction<Partial<CaptchaState>>>;
  onSubmit: () => Promise<void>;
};
export interface LoginReq {
  password?: string;
  country?: string;
  captcha_id?: string;
  captcha_provider?: string;
  captcha_value?: string;
  phone?: string;
  prefix?: string;
  code?: number;
  email?: string;
  name?: string;
}
export interface LoginRes {
  access?: string;
  refresh?: string;
  token_id?: number;
  captcha_required: string;
  is_registered?: boolean;
}
export type ChangePasswordReq = {
  refresh?: string;
  code?: number;
  new_password: string;
  password?: string;
};
export type PasswordPolicyType = {
  pattern: RegExp;
  message: string;
};
export type PasswordPolicyRes = {
  regexes: PasswordPolicyType[];
};
