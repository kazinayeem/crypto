// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router"; // Import for routing
import { Provider } from "react-redux";
import "./index.css";
import { AuthPage } from "./auth/AuthPage";
import App from "./App";
import { store } from "./store";
import "@fontsource/montserrat/800.css"; // or other weights like 400, 600 etc.

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Provider store={store}>
        {" "}
        {/* Wrap RouterProvider with Redux Provider */}
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
