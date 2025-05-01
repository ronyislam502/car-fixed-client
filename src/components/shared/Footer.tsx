import { MenuLinks } from "@/utils/navMenu";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaTwitterSquare } from "react-icons/fa";
import Container from "../ui/Container";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/3xhFNrF5/Screenshot-2025-04-27-061224.png)",
      }}
    >
      <Container>
        <footer className=" py-5 px-5 bg-primary-foreground/10 mt-[70px] text-white flex lg:flex-row flex-col justify-between gap-x-10 gap-y-5">
          <div className="lg:w-[33.33%]">
            <p className="text-4xl font-bold">Car-Fixed</p>
            <p className="mt-5">
              Effortless car care with premium cleaning services, easy booking,
              and convenient comparison for a spotless ride.
            </p>
          </div>
          <div className="lg:w-[33.33%] flex flex-col items-center">
            <p className="text-lg font-semibold mb-5">Important links</p>
            <div className="flex flex-col text-center gap-y-2 font-medium">
              {MenuLinks?.map((menu, idx) => (
                <Link key={idx} to={menu?.path}>
                  {menu?.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:w-[33.33%] flex flex-col lg:items-end items-center">
            <p className="font-semibold text-lg">Socials</p>
            <div className="flex gap-x-4 items-center text-secondaryColor mt-5">
              <p>
                <FaFacebookSquare className="text-2xl text-primary-foreground hover:text-blue-800 cursor-pointer" />{" "}
              </p>
              <p>
                <FaInstagramSquare className="text-2xl text-primary-foreground hover:text-blue-800 cursor-pointer" />{" "}
              </p>
              <p>
                <IoLogoYoutube className="text-2xl text-primary-foreground hover:text-blue-800 cursor-pointer" />{" "}
              </p>
              <p>
                <FaTwitterSquare className="text-2xl text-primary-foreground hover:text-blue-800 cursor-pointer" />{" "}
              </p>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
