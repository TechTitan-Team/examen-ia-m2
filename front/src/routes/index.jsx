import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Common/Layout/Layout";
import Home from "@/Pages/Home/Home";
import Landing from "../Pages/LandingPage/landing-page";
// import Landing from "../Pages/components/landing-page";
import Login from "@/Pages/Login/Login";
import Signup from "@/Pages/Signup/Signup";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        // element: <Landing/>
      },
    ],
  },
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
