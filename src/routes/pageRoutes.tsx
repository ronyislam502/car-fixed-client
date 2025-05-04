import Services from "@/pages/Services/Services";
import Home from "../pages/Home/Home";
import BookingNow from "@/pages/CheckOut/BookingNow";
import CheckOut from "@/pages/CheckOut/CheckOut";
import ProtectedRoute from "./privateRoutes";
import About from "@/pages/About/About";

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
      {
        name: "Booking Now",
        path: "/service/:id",
        element: <BookingNow />,
      },
      {
        name: "Check Out",
        path: "/checkOut",
        element: (
          <ProtectedRoute role="USER">
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        name: "About",
        path: "about",
        element: <About />,
      },
    ],
  },
];
