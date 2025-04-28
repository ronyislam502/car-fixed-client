import Services from "@/pages/Services/Services";
import Home from "../pages/Home/Home";

export const pageRoutes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
    children: [
      {
        name: "Services",
        path: "services",
        element: <Services />,
      },
    ],
  },
];
