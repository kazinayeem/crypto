import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthPage } from "./auth/AuthPage";

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

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
