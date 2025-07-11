import {
  axiosService,
  AxiosServiceMethod,
  type AxiosServiceResponse,
} from "@/lib/http";
import { API } from "@/lib/path";
import type {
  Captcha,
  GenerateOtpReq,
  GenerateOtpRes,
  LoginReq,
  LoginRes,
  Token,
  ValidateOtp,
} from "./types";
import type { UserViewModel } from "../shared/types";

class AuthServices {
  async login(loginReq: LoginReq): Promise<AxiosServiceResponse<LoginRes>> {
    return await axiosService(API.profile.login, AxiosServiceMethod.POST, {
      ...loginReq,
    });
  }
  async getCaptcha(): Promise<AxiosServiceResponse<Captcha>> {
    return await axiosService<Captcha>(
      API.captcha.generate,
      AxiosServiceMethod.GET
    );
  }
  async generateOtp(
    otpRequest: GenerateOtpReq
  ): Promise<AxiosServiceResponse<GenerateOtpRes>> {
    return await axiosService(
      API.profile.generateCode,
      AxiosServiceMethod.POST,
      { ...otpRequest }
    );
  }
  async validateOtp(
    validateOtp: ValidateOtp
  ): Promise<AxiosServiceResponse<undefined>> {
    return await axiosService(
      API.profile.validateOtp,
      AxiosServiceMethod.POST,
      { ...validateOtp }
    );
  }
  async getProfile(): Promise<AxiosServiceResponse<UserViewModel>> {
    return await axiosService(API.profile.getProfile, AxiosServiceMethod.GET);
  }
  async refresh(refresh: string): Promise<AxiosServiceResponse<Token>> {
    return await axiosService(
      API.profile.refreshToken,
      AxiosServiceMethod.POST,
      { refresh: refresh }
    );
  }
}
export const authService = new AuthServices();
