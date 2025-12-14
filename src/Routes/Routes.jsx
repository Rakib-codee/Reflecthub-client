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
        loader: ({ params }) => fetch(`http://localhost:3000/lessons/${params.id}`)
      },
      {
        path: "payment",
        element: <PrivateRoute><Payment /></PrivateRoute>
      }
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
        element: <MyLessons />
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
        element:  <AllUsers />
      }
    ]
  }
]);