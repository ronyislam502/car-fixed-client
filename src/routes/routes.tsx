import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../redux/utils/routeGenerator";
import { pageRoutes } from "./pageRoutes";
import App from "../App";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
]);

export default routes;
