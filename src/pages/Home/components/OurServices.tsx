import Container from "@/components/ui/Container";
import { useAllServicesQuery } from "@/redux/features/service/serviceApi";
import { TService } from "@/types/service";
import ServiceCard from "@/components/ui/ServiceCard";
import CardSkeleton from "@/components/skeleton/CardSkelaton";

const OurServices = () => {
  const { data: services, isLoading } = useAllServicesQuery({});

  return (
    <Container>
      <h1 className="text-center font-extrabold text-4xl my-10">
        Our Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10 text-white px-10">
        {isLoading ? (
          <CardSkeleton count={4} />
        ) : (
          services?.data
            ?.slice(0, 4)
            ?.map((service: TService) => (
              <ServiceCard key={service._id} service={service} />
            ))
        )}
      </div>
    </Container>
  );
};

export default OurServices;
