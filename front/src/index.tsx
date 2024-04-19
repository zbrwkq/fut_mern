import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./UserProvider";
import Login from "./auth/login";
import Register from "./auth/register";
import Logout from "./auth/logout";
import Users from "./admin/users";
import Players from "./admin/players";
import Market from "./routes/market";
import Dashboard from "./dashboard/dashboard";
import axios from "axios";

import Market from "./market/market";
import Admin from "./admin/admin";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/users",
    element: <Users />,
  },
  {
    path: "/admin/players",
    element: <Players />,
  },
  {
    path: "/market",
    element: <Market />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
