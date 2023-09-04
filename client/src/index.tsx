import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@app/services/i18n";
import App from "./pages/App";

import "./index.css";

export const queryClient = new QueryClient();

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
