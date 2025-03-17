import { response } from "./contracts/response";
import { clientOutput } from "./contracts/client_output";
import { clientInput } from "./contracts/client_input";
import { baseService } from "./resources/base_service";

export const ClientService = {
  getAll: async () => {
    const response = await baseService.get<response<clientOutput[]>>(
      "/client",
      true
    );
    return response.data;
  },
  getById: async (id: string) => {
    const response = await baseService.get<response<clientOutput>>(
      `/client/${id}`,
      true
    );
    return response.data;
  },
  create: async (clientData: clientInput) => {
    const response = await baseService.post<response<clientOutput>>(
      "/client",
      clientData,
      true
    );
    return response.data;
  },
  update: async (id: number, clientData: clientInput) => {
    const response = await baseService.put<response<clientOutput>>(
      `/client/${id}`,
      clientData,
      true
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await baseService.delete<response<null>>(
      `/client/${id}`,
      true
    );
    return response.data;
  },
};
