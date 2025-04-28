/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { TUserPath } from "@/types/route";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user) as TUser;

  const links: any = user.role === "ADMIN" ? adminRoutes : userRoutes;

  return (
    <div className="text-black">
      {/* Mobile Dropdown */}
      <div className="dropdown lg:hidden">
        <div tabIndex={0} role="button" className="btn btn-primary m-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-transparent text-green-500 rounded-box w-52"
        >
          {links[0]?.children?.map((menu: TUserPath) => (
            <li key={menu?.name}>
              <NavLink
                to={menu?.path || "/"}
                className={({ isActive }) =>
                  isActive ? "font-bold text-xl text-primary" : "text-lg"
                }
              >
                {menu?.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar for Desktop */}
      <div
        className="hidden lg:block p-4 rounded-md"
        style={{
          backgroundImage:
            "url(https://i.postimg.cc/3xhFNrF5/Screenshot-2025-04-27-061224.png)",
        }}
      >
        <ul className="space-y-3 text-center font-bold text-xl">
          {links[0]?.children?.map((menu: TUserPath) => (
            <li key={menu?.name}>
              <NavLink
                to={menu?.path || "/"}
                className={({ isActive }) =>
                  isActive ? "font-bold text-white" : "text-white"
                }
              >
                {menu?.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
