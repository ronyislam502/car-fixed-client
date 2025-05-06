import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useSingleServiceQuery } from "@/redux/features/service/serviceApi";
import ServiceReviews from "../../components/ui/ServiceReviews";

import ServiceSlots from "../../components/ui/ServiceSlots";

const BookingNow = () => {
  const id = useParams();
  const { data: serviceData } = useSingleServiceQuery(id);
  const service = serviceData?.data;

  return (
    <Container>
      <h2 className="text-center text-2xl font-bold mt-10 text-white py-10">
        Service Details & Book Now{" "}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 text-white">
        <div className="col-span-2 px-4">
          <div className="card bg-black/80 shadow-sm">
            <div className="card-body items-center ">
              <div className="flex gap-6">
                <img src={service?.image} className="h-[200px]" />
                <div className="text-xl font-bold">
                  <h2 className="card-title text-2xl font-bold">
                    {service?.title}
                  </h2>
                  <p>Price: ${service?.price}</p>
                  <p>Duration: {service?.duration}</p>
                  <p>Category: {service?.category}</p>
                </div>
              </div>
              <div>
                <p>{service?.description}</p>
              </div>
            </div>
            <div>
              <ServiceReviews serviceId={service?._id} />
            </div>
          </div>
        </div>
        <div className="col-span-1 px-16">
          <ServiceSlots serviceId={service?._id} />
        </div>
      </div>
    </Container>
  );
};

export default BookingNow;
