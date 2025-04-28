import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenerator";
import { pageRoutes } from "./pageRoutes";
import App from "../App";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Dashboard from "@/layouts/Dashboard";
import { adminRoutes } from "./adminRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
  {
    path: "/admin",
    element: <Dashboard />,
    children: routeGenerator(adminRoutes),
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default routes;
