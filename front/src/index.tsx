import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./UserProvider";
import Login from "./login/login";
import Register from "./register/register";
import Users from "./users/users";
import Players from "./players/players";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world !</div>,
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
    path: "/users",
    element: <Users />
  },
  {
    path: "/players",
    element: <Players />
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
