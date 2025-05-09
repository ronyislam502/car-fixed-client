import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url(https://i.postimg.cc/cLZtfCmD/car-dis.webp)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
