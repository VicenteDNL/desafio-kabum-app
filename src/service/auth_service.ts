import { userRegister } from "./contracts/user_register";
import { loginInput } from "./contracts/login_input";
import { userOutput } from "./contracts/user_output";
import { loginOutput } from "./contracts/login_output";
import { response } from "./contracts/response";
import { baseService } from "./resources/base_service";

export const AuthService = {
  login: async (user: loginInput) => {
    const response = await baseService.post<response<loginOutput>>(
      "/login",
      user
    );

    if (response.data.status === "success") {
      localStorage.setItem("authToken", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  register: async (user: userRegister) => {
    const response = await baseService.post("/register", user);
    if (response.data.status === "success") {
      localStorage.setItem("authToken", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getToken: (): string | null => {
    return localStorage.getItem("authToken");
  },

  getUser: (): userOutput | null => {
    var user = localStorage.getItem("user");
    return user == null ? null : JSON.parse(localStorage.getItem("user")!); // Obtém o token armazenado
  },
};
