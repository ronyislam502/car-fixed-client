import { TService } from "@/types/service";
import { Link } from "react-router-dom";

type TProps = {
  service: TService;
};

const ServiceCard = ({ service }: TProps) => {
  return (
    <div className="card transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-xl pb-2">
      <img
        src={service?.image}
        alt="Services"
        className="rounded-t-lg h-[190px] w-full"
      />
      <div className="card-body items-center text-center rounded-b-lg bg-black/80">
        <h2 className="card-title text-2xl font-bold">{service?.title}</h2>

        <div className="flex gap-6 text-sm font-bold">
          <p>Price: ${service?.price}</p>
          <p>Duration: {service.duration}min</p>
        </div>
        <div className="card-actions pt-4">
          <Link to={`/service/${service?._id}`}>
            <button className="btn btn-outline btn-success">Booking Now</button>
          </Link>
          <button className="btn btn-outline btn-success">See More</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
