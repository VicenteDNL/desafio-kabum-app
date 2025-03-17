import axios from "axios";
import { AuthService } from "../auth_service";

const API_URL = "http://localhost:8080";

const api = (auth: boolean) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(auth ? { Authorization: `Bearer ${AuthService.getToken()}` } : {}),
    },
  });
};

const handleHttpException = (status: number) => {
  if ((status = 403)) {
    window.location.href = "/login";
  }
};

export const baseService = {
  post: async <T>(uri: string, data?: any, auth = false) => {
    try {
      const response = await api(auth).post<T>(uri, data);
      return response;
    } catch (e: any) {
      handleHttpException(e.status ?? 403);
      return e;
    }
  },
  get: async <T>(uri: string, auth = false) => {
    try {
      const response = await api(auth).get<T>(uri);
      return response;
    } catch (e: any) {
      handleHttpException(e.status ?? 403);
      return e;
    }
  },
  put: async <T>(uri: string, data?: any, auth = false) => {
    try {
      const response = await api(auth).put<T>(uri, data);
      return response;
    } catch (e: any) {
      handleHttpException(e.status ?? 403);
      return e;
    }
  },
  delete: async <T>(uri: string, auth = false) => {
    try {
      const response = await api(auth).delete<T>(uri);
      return response.data;
    } catch (e: any) {
      handleHttpException(e.status ?? 403);
      return e;
    }
  },
};
