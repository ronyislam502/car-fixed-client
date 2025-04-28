import Admin from "@/pages/Admin/Admin";
import Bookings from "@/pages/Admin/Bookings/Bookings";
import ManageService from "@/pages/Admin/ManageService/ManageService";
import SlotsManage from "@/pages/Admin/SlotsManage/SlotsManage";
import Users from "@/pages/Admin/Users/Users";

export const adminRoutes = [
  {
    name: "Dashboard",
    element: <Admin />,
    children: [
      {
        name: "Slots",
        path: "slots",
        element: <SlotsManage />,
      },
      {
        name: "Users",
        path: "users",
        element: <Users />,
      },
      {
        name: "Services",
        path: "services",
        element: <ManageService />,
      },
      {
        name: "Bookings",
        path: "bookings",
        element: <Bookings />,
      },
      {
        name: "Dashboard",
        path: "admin",
        element: <Admin />,
      },
    ],
  },
];
