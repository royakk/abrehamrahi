import type { AxiosError } from "axios";
import { authToken } from "./storage";
import { API, PATH } from "./path";
import { authService } from "@/features/Auth/services";
import httpService from "./http";
import { toast } from "sonner";

enum API_ERRORS_STATUS {
  SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}
export const handleAPIError = (error: AxiosError) => {
  const status = error.status;
  switch (status) {
    case API_ERRORS_STATUS.SERVER_ERROR:
      handleServerError();
      break;
    case API_ERRORS_STATUS.UNAUTHORIZED:
      return handleUnauthorized(error);
  }
  throw error.response;
};

const handleUnauthorized = async (error: AxiosError) => {
  const request = error.config;
  // @ts-ignore
  request._retry = true;
  const refresh = authToken.get()?.refresh;

  // For when the refresh-token Api returns a 401 error
  if (request?.url === API.profile.refreshToken) {
    authToken.remove();
    location.href = PATH.login;
    return;
  }

  const { data } = await authService.refresh(refresh!);
  if (data) {
    authToken.set({ ...authToken.get()!, access: data.access });
    httpService.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access}`;
    return httpService(request!);
  }
};

const handleServerError = () => {
  console.log("500 Server");
};

export const advancedResponseValidator = (data: any, status: number | null) => {
  if (!status) return false;
  if (status >= 200 && status < 300) {
    return true;
  } else {
    if (status >= 500) {
      toast.error("500");
    } else if (status !== 401 && data.detail) {
      if (Array.isArray(data.detail)) {
        data.detail.forEach((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error(data.detail);
      }
    } else {
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key].detail)) {
          data[key].detail.forEach((err: string) => {
            toast.error(err);
          });
        } else {
          toast.error(data[key][0]);
        }
      });
    }
    return false;
  }
};
