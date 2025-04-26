import Container from "@/components/ui/Container";
import { useAllServicesQuery } from "@/redux/features/service/serviceApi";
import { TService } from "@/types/service";
import ServiceCard from "@/components/ui/ServiceCard";

const OurServices = () => {
  const { data: services } = useAllServicesQuery("");

  console.log("data", services);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {services?.data?.map((service: TService) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </Container>
  );
};

export default OurServices;
