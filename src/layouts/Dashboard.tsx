/* eslint-disable @typescript-eslint/no-explicit-any */

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Container from "@/components/ui/Container";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
      className="h-[100vh]"
      style={{
        backgroundImage: "url(https://i.postimg.cc/cLZtfCmD/car-dis.webp)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <Container>
        <div className="flex flex-col lg:flex-row gap-2 ">
          {/* Sidebar */}
          <div className="w-full lg:w-1/6 mt-2">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-5/6 h-[60vh]">
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard;
