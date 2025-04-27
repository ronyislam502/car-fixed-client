import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const MainLayout = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/9F8nq7z5/gradient-connection-background-23-2150462053.avif)",
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
