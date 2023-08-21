import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/rooter";
import "@app/services/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div>
      <Toaster />
    </div>
    <RouterProvider router={router} />
  </React.StrictMode>
);
