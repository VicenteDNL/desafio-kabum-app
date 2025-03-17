import axios from "axios";
import { AuthService } from "./auth_service";
import { response } from "./contracts/response";
import { clientOutput } from "./contracts/client_output";
import { clientInput } from "./contracts/client_input";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + AuthService.getToken(),
  },
});

export const ClientService = {
  getAll: async () => {
    const response = await api.get<response<clientOutput[]>>("/client");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/client/${id}`);
    return response.data;
  },
  create: async (clientData: clientInput) => {
    const response = await api.post<response<clientOutput>>(
      "/client",
      clientData
    );
    return response.data;
  },
  update: async (id: number, clientData: clientInput) => {
    const response = await api.put<response<clientOutput>>(
      `/client/${id}`,
      clientData
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete<response<null>>(`/client/${id}`);
    return response.data;
  },
};
