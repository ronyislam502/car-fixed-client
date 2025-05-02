import CardSkeleton from "@/components/skeleton/CardSkelaton";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import { useAllServicesQuery } from "@/redux/features/service/serviceApi";
import { TService } from "@/types/service";

const Services = () => {
  const { data: services, isLoading } = useAllServicesQuery({});

  return (
    <div className="">
      <Container>
        <h1 className="text-center text-black font-extrabold text-4xl my-2">
          Service
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          {isLoading ? (
            <CardSkeleton count={8} />
          ) : (
            services?.data?.map((service: TService) => (
              <ServiceCard key={service._id} service={service} />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default Services;
