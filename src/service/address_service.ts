import axios from "axios";
import { AuthService } from "./auth_service";
import { addressInput } from "./contracts/address_input ";
import { response } from "./contracts/response";
import { addressOutput } from "./contracts/address_output";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + AuthService.getToken(),
  },
});

export const AddressService = {
  getByClientId: async (clientId: string) => {
    const response = await api.get(`/client/${clientId}/address`);
    return response.data;
  },
  create: async (clientId: number, address: addressInput) => {
    const response = await api.post<response<addressOutput>>(
      `/client/${clientId}/address`,
      address
    );
    return response.data;
  },
  update: async (
    clientId: number,
    addressId: number,
    addressData: addressInput
  ) => {
    const response = await api.put<response<addressOutput>>(
      `/client/${clientId}/address/${addressId}`,
      addressData
    );
    return response.data;
  },
  delete: async (clientId: number, addressId: number) => {
    const response = await api.delete(
      `/client/${clientId}/address/${addressId}`
    );
    return response.data;
  },
};
