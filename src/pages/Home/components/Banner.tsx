import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Banner = () => {
  const sliderData = [
    {
      id: 1,
      image: "https://i.postimg.cc/X7HbH2N5/hero-slider-bg-1.png",
      heading: "Services with easy online booking.",
      desc: "At Car-Fixed, we revolutionize car care with seamless online booking, top-tier services, and a commitment to making your vehicle shine like new—every time.",
    },
    {
      id: 2,
      image:
        "https://3jon.com/demo/nwp/item/cras/wp-content/uploads/2024/09/hero-bg-video-3.mp4",
      heading: "top-tier services",
      desc: "At Car-Fixed, we revolutionize car care with seamless online booking, top-tier services, and a commitment to making your vehicle shine like new—every time.",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/85JzWpXH/hero-slider-bg-2.png",
      heading: "Expert engineer fixed problem",
      desc: "At Car-Fixed, we revolutionize car care with seamless online booking, top-tier services, and a commitment to making your vehicle shine like new—every time.",
    },
    {
      id: 4,
      image:
        "https://3jon.com/demo/nwp/item/cras/wp-content/uploads/2024/09/hero-bg-video-2-1.mp4",
      heading: "Fully automatic machine",
      desc: "At Car-Fixed, we revolutionize car care with seamless online booking, top-tier services, and a commitment to making your vehicle shine like new—every time.",
    },
  ];

  return (
    <Carousel
      autoPlay
      infiniteLoop
      transitionTime={800}
      showThumbs={false}
      showStatus={false}
    >
      {sliderData.map((slider) => (
        <div key={slider.id} className="min-w-full">
          <div className="flex items-center justify-center h-full p-0 w-full">
            <div className="relative w-full lg:h-[70vh] h-[600px] overflow-hidden">
              {slider?.image?.endsWith(".mp4") ? (
                <video
                  src={slider?.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute z-[1] top-0 left-0 h-full w-full object-cover"
                />
              ) : (
                <img
                  src={slider?.image}
                  alt=""
                  className="absolute z-[1] top-0 left-0 h-full w-full object-cover scale-100 animate-zoomSlow"
                />
              )}

              <div className="relative z-[21] w-full h-full flex flex-col items-center justify-center pl-[50px] bg-[#00000011] gap-[5px]">
                <h4 className="text-center font-[700] uppercase hero_title text-primaryMat tracking-[7px]">
                  Top Class Servicing
                </h4>
                <h1 className="text-[20px] sm:text-[30px] hero_title lg:text-[90px] font-[700] text-white capitalize">
                  {slider?.heading}
                </h1>
                <p className="max-w-[550px] text-white text-center text-[12px] sm:text-[14px] lg:text-[16px]">
                  {slider?.desc}
                </p>
                <div className="flex justify-center items-center gap-[10px]">
                  <Link to="/services">
                    <button className="btn btn-success">Book Now</button>
                  </Link>
                  <Link to="/services">
                    <button className="btn btn-outline btn-success">
                      Services
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
export default Banner;
