import { addressInput } from "./contracts/address_input ";
import { response } from "./contracts/response";
import { addressOutput } from "./contracts/address_output";
import { baseService } from "./resources/base_service";

export const AddressService = {
  getByClientId: async (clientId: string) => {
    const response = await baseService.get<response<addressOutput>>(
      `/client/${clientId}/address`,
      true
    );
    return response.data;
  },
  create: async (clientId: number, address: addressInput) => {
    const response = await baseService.post<response<addressOutput>>(
      `/client/${clientId}/address`,
      address,
      true
    );
    return response.data;
  },
  update: async (
    clientId: number,
    addressId: number,
    addressData: addressInput
  ) => {
    const response = await baseService.put<response<addressOutput>>(
      `/client/${clientId}/address/${addressId}`,
      addressData,
      true
    );
    return response.data;
  },
  delete: async (clientId: number, addressId: number) => {
    const response = await baseService.delete<response<null>>(
      `/client/${clientId}/address/${addressId}`,
      true
    );
    return response.data;
  },
};
