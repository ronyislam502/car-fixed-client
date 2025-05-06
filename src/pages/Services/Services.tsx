import CardSkeleton from "@/components/skeleton/CardSkelaton";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import { useAllServicesQuery } from "@/redux/features/service/serviceApi";
import { TService } from "@/types/service";
import { useDebounce } from "@/utils/DebaounceHook";
import { useState } from "react";

const Services = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: services, isLoading } = useAllServicesQuery({
    category,
    search: debouncedSearch,
    limit,
    page,
    sort,
  });

  const totalPages = services?.meta?.totalPage || 1;

  return (
    <div className="">
      <Container>
        <h1 className="text-center text-white font-extrabold text-4xl my-2">
          Services
        </h1>
        <p className="text-center text-white font-bold text-xl my-2">
          Choose your needed service
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 px-10 items-center text-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Search</h2>
            <input
              className="input input-success"
              type="text"
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Category</h2>
            <select
              className="select select-success ml-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option key="repair">Repair</option>
              <option key="others">Others</option>
              <option key="maintain">Maintain</option>
            </select>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Sort by Price</h2>
            <select
              className="select select-success ml-2"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">ALL</option>
              <option value="price">Low to High</option>
              <option value="-price">High to Low</option>
            </select>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white px-10">
            {isLoading ? (
              <CardSkeleton count={8} />
            ) : (
              services?.data?.map((service: TService) => (
                <ServiceCard key={service?._id} service={service} />
              ))
            )}
          </div>
          <div className="flex gap-2 my-2 px-10">
            <button
              className="btn btn-outline btn-primary text-white btn-sm"
              disabled={page <= 1}
              onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>
            <span className="text-white">
              {page} / {totalPages}
            </span>
            <button
              className="btn btn-outline btn-primary text-white btn-sm"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((prev: number) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Services;
