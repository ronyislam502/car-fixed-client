import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenerator";
import { pageRoutes } from "./pageRoutes";
import App from "../App";
import Register from "@/pages/Auth/Register";
import Dashboard from "@/layouts/Dashboard";
import { adminRoutes } from "./adminRoutes";
import ProtectedRoute from "./privateRoutes";
import { userRoutes } from "./userRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
  {
    path: "/ADMIN",
    element: (
      <ProtectedRoute role="ADMIN">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminRoutes),
  },
  {
    path: "/USER",
    element: (
      <ProtectedRoute role="USER">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(userRoutes),
  },
  { path: "/register", element: <Register /> },
]);

export default routes;
