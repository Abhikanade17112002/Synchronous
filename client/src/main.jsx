import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { SocketProvider } from "./socketcontext/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketProvider>
      <App />
      <Toaster closeButton></Toaster>
    </SocketProvider>
  </Provider>
);
