import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@app/services/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "react-modal";
import App from "./pages/App";

export const queryClient = new QueryClient();

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
