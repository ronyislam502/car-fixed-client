import { TService } from "@/types/service";

type TProps = {
  service: TService;
};

const ServiceCard = ({ service }: TProps) => {
  return (
    <div className="card bg-slate-500 shadow-md">
      <img
        src={service?.image}
        alt="Services"
        className="rounded-t-md h-[300px]"
      />
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold">{service?.title}</h2>
        <p className="font-bold">
          {(service?.description as string).slice(0, 95)}.....
        </p>
        <div className="flex gap-6 text-xl font-bold">
          <p>Price: ${service?.price}</p>
          <p>duration: {service.duration}min</p>
        </div>
        <div className="card-actions">
          <button className="btn btn-outline btn-success">Booking Now</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
