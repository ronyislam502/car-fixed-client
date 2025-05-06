import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const HowWeWork = () => {
  const contents = [
    {
      id: 1,
      heading: "Book appointment",
      desc: "Car lorem quisque sodales the varius vestibulum felis.",
    },
    {
      id: 2,
      heading: "Bring your Vehicle",
      desc: "Car lorem quisque sodales the varius vestibulum felis.",
    },
    {
      id: 3,
      heading: "Get the Vehicle Repaired",
      desc: "Car lorem quisque sodales the varius vestibulum felis.",
    },
    {
      id: 4,
      heading: "Ready for Deliver",
      desc: "ar lorem quisque sodales the varius vestibulum felis.",
    },
  ];

  return (
    <div className="text-center py-6 px-6 text-white">
      <h4 className="text-xl font-bold">How We Work</h4>
      <h2 className="text-4xl font-extrabold pb-2">Our Process</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-2">
        {contents.map((content: any) => (
          <div
            key={content?.id}
            className="card transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-xl pb-2"
          >
            <div className="card-body items-center text-center rounded-b-lg bg-black/80">
              <h2 className="card-title text-xl font-bold">
                {content?.heading}
              </h2>
              <p className="card-title font-md">{content?.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/services">
        <button className="btn btn-outline btn-success ">Booking Now</button>
      </Link>
    </div>
  );
};

export default HowWeWork;
