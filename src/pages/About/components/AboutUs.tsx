const AboutUs = () => {
  return (
    <div className="py-6 px-6">
      {" "}
      <div className="bg-black/80 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center px-4">
        <figure className="ps-6">
          <img
            src="https://i.postimg.cc/xd9K5L3d/automotive-service-center-mechanic-work-1077802-117272.jpg"
            alt=""
            className="h-[500px]"
          />
        </figure>
        <div className="">
          <h4 className="text-xl font-bold">About Us</h4>
          <h2 className="text-4xl font-extrabold pb-2">
            Care<span className="text-red-500">x</span> Car <br />
            Service & Repair
          </h2>
          <p className="font-bold pr-6">
            Car repair quisque sodales dui ut varius vestibulum drana tortor
            turpis <br /> porttiton tellus eu euismod nisl massa ut odio in the
            miss volume place <br />
            rat urna, a lacinia eros nunta urna mauris, vehicula rutrum tempus
            inter <br />
            dum felis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
