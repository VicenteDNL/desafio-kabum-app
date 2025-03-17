import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NotFound from "./pages/not_found";
import { Provider } from "./components/ui/provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
