import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const MainLayout = () => {
  return (
    <div
      style={{
        backgroundImage: "url(https://i.postimg.cc/HsKs93LT/car-3.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
