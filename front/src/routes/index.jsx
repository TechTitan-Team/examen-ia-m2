import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Common/Layout/Layout";
import Home from "@/Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
