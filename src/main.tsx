import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import "./index.css";
import { AuthPage } from "./auth/AuthPage";
import App from "./App";
import { store } from "./store";
import "@fontsource/montserrat/800.css";
import DashBoard from "./DashBoard";
import { ProtectedRoute } from "./ProtectedRoute";
import { LiveKitConnectionProvider } from "./hooks/useLiveKitConnection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
    ],
  },
]);

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Provider store={store}>
        <LiveKitConnectionProvider>
          <RouterProvider router={router} />
        </LiveKitConnectionProvider>
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
