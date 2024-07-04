import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Home from "../page/Home";
import { Layout } from "../layout/Layout";
import Customer from "@/page/Customer";
import Invoice from "@/page/Invoice";
import Product from "@/page/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <>Page Not Fount</>,
    children: [
      {
        index: true,
        loader: async () => redirect('/dashboard'),
      },
      { path: "dashboard", element: <Home /> },
      { path: "products", element: <Product /> },
      {
        path: "customers",
        children: [
          { index: true, element: <Customer /> },
          { path: "invoice/:cId", element: <Invoice /> },
        ]
      },
    ]
  },
]);

const Routes = () => <RouterProvider router={router} />

export default Routes 