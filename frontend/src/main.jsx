import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/shared/Navbar.jsx";
import { Toaster } from "@/components/ui/sonner";

import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
