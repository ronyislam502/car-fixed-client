import UpcomingBookings from "@/pages/User/UpcomingBookings/UpcomingBookings";
import User from "@/pages/User/User";
import UserBookings from "@/pages/User/UserBookings/UserBookings";

export const userRoutes = [
  {
    name: "Dashboard",
    element: <User />,
    children: [
      {
        name: "Profile",
        path: "dashboard",
        element: <User />,
      },
      {
        name: "Bookings",
        path: "bookings",
        element: <UserBookings />,
      },
      {
        name: "UpcomingBookings",
        path: "upcomingBookings",
        element: <UpcomingBookings />,
      },
    ],
  },
];
