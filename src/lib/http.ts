// src/lib/httpRequest.ts
import ENV from "@/env";
import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { authToken } from "./storage";
import { handleAPIError } from "./error";



const httpService = axios.create({
  baseURL: ENV.apiBaseUrl,
});

httpService.interceptors.request.use((config) => {
  const token = authToken.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token.access}`;
  }
  config.headers["Accept-Language"] = "fa";

  return config;
});

// 🔁 Handle token expiration and refresh
// httpService.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError<any>) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     // If token expired & not retried yet
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       getRefreshToken()
//     ) {
//       originalRequest._retry = true;

//       try {
//         const response = await axios.post(
//           `${BASE_URL}v2/profile/auth/token-refresh/`,
//           {
//             refresh: getRefreshToken(),
//           }
//         );

//         const newAccessToken = response.data.access;
//         const newRefreshToken = response.data.refres;

//         setTokens(newAccessToken, newRefreshToken);

//         // Update token in headers and retry request
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${newAccessToken}`;

//         originalRequest.headers = {
//           ...originalRequest.headers,
//           Authorization: `Bearer ${newAccessToken}`,
//         };

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Token refresh failed", refreshError);
//         localStorage.clear();
//         window.location.href = "/";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
export enum AxiosServiceMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
export interface AxiosServiceResponse<T> {
  data: T | null;
  status: number | null;
  errors: any | null;
}
httpService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return handleAPIError(error);
    }
);
export async function axiosService<T>(
  url: string,
  method: AxiosServiceMethod,
  payload: any = null
): Promise<AxiosServiceResponse<T>> {
  try {
    const response = await httpService({
      url,
      method,
      data: method !== AxiosServiceMethod.GET ? payload : undefined,
      params: method === AxiosServiceMethod.GET ? payload : undefined,
    });
    return {
      data: response.data,
      status: response.status,
      errors: null,
    };
  } catch (error: any) {
    return {
      data: null,
      status: error.status ? error.status : null,
      errors: error.data ? error.data : null,
    };
  }
}
export default httpService;
