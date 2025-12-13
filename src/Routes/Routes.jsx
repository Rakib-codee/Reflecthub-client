import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register"
import Dashboard from "../Layout/Dashboard"; // Import Dashboard Layout
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import AddLesson from "../pages/Dashboard/AddLesson/AddLesson";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>, // Protect the whole dashboard
    children: [
        {
            path: "add-lesson",
            element: <AddLesson />
        },
        {
            path: "my-lessons",
            element: <div>My Lessons Table Coming Soon...</div> // Placeholder
        },
        {
            path: "home",
            element: <div>Dashboard Home Coming Soon...</div> // Placeholder
        }
    ]
  }
]);