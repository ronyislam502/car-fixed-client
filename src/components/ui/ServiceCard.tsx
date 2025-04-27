import { TService } from "@/types/service";

type TProps = {
  service: TService;
};

const ServiceCard = ({ service }: TProps) => {
  return (
    <div className="card">
      <img
        src={service?.image}
        alt="Services"
        className="rounded-t-lg h-[300px]"
      />
      <div
        className="card-body items-center text-center rounded-b-lg"
        style={{
          backgroundImage:
            "url(https://i.postimg.cc/3xhFNrF5/Screenshot-2025-04-27-061224.png)",
        }}
      >
        <h2 className="card-title text-2xl font-bold">{service?.title}</h2>
        <p className="font-bold">
          {(service?.description as string).slice(0, 95)}.....{" "}
        </p>
        <div className="flex gap-6 text-xl font-bold">
          <p>Price: ${service?.price}</p>
          <p>duration: {service.duration}min</p>
        </div>
        <div className="card-actions pt-4">
          <button className="btn btn-outline btn-success">Booking Now</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
