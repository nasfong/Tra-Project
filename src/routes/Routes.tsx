import React from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "../page/Home";
import { Layout } from "../layout/Layout";
import Customer from "@/page/Customer";
import Invoice from "@/page/Invoice";
import Product from "@/page/Product";
import Login from "@/page/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthProvider } from "@/context/ContextProvider";
import Types from "@/page/Types";
import NotFound from "@/module/not-found";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />,
        errorElement: <>Page Error</>,
        children: [
          {
            index: true,
            loader: async () => redirect("/dashboard"),
          },
          { path: "dashboard", element: <Home /> },
          { path: "product", element: <Product /> },
          { path: "types", element: <Types /> },
          {
            path: "customer",
            children: [
              { index: true, element: <Customer /> },
              { path: "invoice/:cId", element: <Invoice /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Routes: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default Routes;
