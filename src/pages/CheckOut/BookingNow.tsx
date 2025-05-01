import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useSingleServiceQuery } from "@/redux/features/service/serviceApi";
import { useGetServiceReviewsQuery } from "@/redux/features/review/reviewApi";
import ServiceReviews from "../../components/ui/ServiceReviews";
import { useGetServiceSlotsQuery } from "@/redux/features/slot/slotApi";
import ServiceSlots from "../../components/ui/ServiceSlots";

const BookingNow = () => {
  const id = useParams();
  const { data: serviceData } = useSingleServiceQuery(id);
  const service = serviceData?.data;
  // console.log("service", service);
  const { data: slotData } = useGetServiceSlotsQuery(service?._id);
  const slots = slotData?.data;
  const { data: reviewsData } = useGetServiceReviewsQuery(service?._id);
  const reviews = reviewsData?.data;

  return (
    <Container>
      <h2 className="text-center text-2xl font-bold mt-10">
        Service Details & Book Now{" "}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="col-span-2">
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
              <ServiceReviews reviews={reviews} />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <ServiceSlots slots={slots} />
        </div>
      </div>
    </Container>
  );
};

export default BookingNow;
