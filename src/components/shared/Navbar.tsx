import { MenuLinks } from "@/utils/navMenu";
import Container from "../ui/Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { logout, TUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";

const Navbar = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: user } = useGetUserByEmailQuery(loggedUser?.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Log out successfully");
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/3xhFNrF5/Screenshot-2025-04-27-061224.png)",
      }}
    >
      <Container>
        <div className="navbar shadow-sm text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content font-bold text-xl rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {MenuLinks?.map((menu) => (
                  <NavLink key={menu?.name} to={menu?.path}>
                    {menu?.name}
                  </NavLink>
                ))}
              </ul>
            </div>
            <Link to="/" className="text-2xl text-cyan-500 font-extrabold">
              Car-Fixed
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-bold text-xl">
              {MenuLinks?.map((menu, idx) => (
                <Link className="px-2" key={idx} to={menu?.path}>
                  {menu?.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-center">
                <div tabIndex={0} role="button">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.data[0].avatar} />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm bg-black/80 text-xl font-bold text-blue-700"
                >
                  <li>
                    <Link to={`/${user.data[0].role}/dashboard`}>
                      Dashboard
                    </Link>
                  </li>
                  <li onClick={handleLogout}>
                    <a>logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
