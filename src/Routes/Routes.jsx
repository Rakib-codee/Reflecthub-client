import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register"
import Dashboard from "../Layout/Dashboard"; // Import Dashboard Layout
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import AddLesson from "../pages/Dashboard/AddLesson/AddLesson";
import MyLessons from "../pages/Dashboard/MyLessons/MyLessons";
import Lessons from "../pages/Lessons/Lessons";
import LessonDetails from "../pages/Lessons/LessonDetails";
import Payment from "../pages/Payment/Payment";
import Profile from "../pages/Dashboard/Profile/Profile";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import UpdateLesson from "../pages/Dashboard/UpdateLesson/UpdateLesson";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import ManageLessons from "../pages/Dashboard/ManageLessons/ManageLessons";
import MyFavorites from "../pages/Dashboard/MyFavorites/MyFavorites";
import Community from "../pages/Community/Community";
import NotFound from "../pages/NotFound/NotFound";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "lessons",
        element: <Lessons />
      },
      {
        path: "lessons/:id",
        element: <PrivateRoute><LessonDetails /></PrivateRoute>, // Protect this page
        loader: ({ params }) => fetch(`${API_BASE_URL}/lessons/${params.id}`)
      },
      {
        path: "payment",
        element: <PrivateRoute><Payment /></PrivateRoute>
      },
       {
        path: "community",
        element: <Community></Community>
    }
    ],
    
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>, // Protect the whole dashboard
    children: [
      {
        path: "admin",
        element: <AdminHome></AdminHome>
      },
      {
        path: "add-lesson",
        element: <AddLesson />
      },
      {
        path: "my-lessons",
        element: <MyLessons />
      },
      {
        path: "my-favorites",
        element: <MyFavorites />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "users",
        element: <AllUsers />
      },
      {
        path: "manage-lessons",
        element: <ManageLessons />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "update-lesson/:id",
        element: <UpdateLesson />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/lessons/${params.id}`)
      },
      {
        path: "admin-home",
        element: <AdminHome></AdminHome>
      }

    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);