import { useAllServicesQuery } from "@/redux/features/service/serviceApi";
import { TService } from "@/types/service";
import { useDebounce } from "@/utils/DebaounceHook";
import { useState } from "react";
import AddService from "../component/AddService";
import UpdateService from "../component/UpdateService";
import DeleteService from "../component/DeleteService";

const ManageService = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: services } = useAllServicesQuery({
    category,
    search: debouncedSearch,
    limit,
    page,
    sort,
  });

  // const handlePageChange = (newPage: number) => {
  //   if (newPage >= 1 && newPage <= (services?.meta?.totalPage || 1)) {
  //     setPage(newPage);
  //   }
  // };

  return (
    <div
      className="my-2"
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/3xhFNrF5/Screenshot-2025-04-27-061224.png)",
      }}
    >
      <div className="text-xl font-bold text-center py-2">
        <h2 className="text-xl pb-2">Service Management</h2>

        <div className="flex gap-2 px-2">
          <input
            className="input input-success"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
          <select
            className="select select-success ml-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">ALL</option>
            <option value="price">Low to High</option>
            <option value="-price">High to Low</option>
          </select>
          <AddService />
        </div>
      </div>
      <div className="overflow-x-auto px-2">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-blue-950">
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Price</th>
              <th className="px-18">Action</th>
            </tr>
          </thead>
          <tbody>
            {services?.data?.map((service: TService) => (
              <tr key={service._id}>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={service.image} />
                    </div>
                  </div>
                </td>
                <td>{service?.title}</td>
                <td>{service?.category}</td>
                <td>{service?.duration}min</td>
                <td>$ {(service?.price as number).toFixed(2)}</td>
                <th className="flex gap-2">
                  <UpdateService service={service} />
                  <DeleteService service={service} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {/* pagination */}
        {/* <div className="join mt-4 align-center text-center p-2">
          <input
            className="join-item btn btn-square"
            type=""
            name="page"
            aria-label={page}
            checked={page === page + 1}
            onChange={() => handlePageChange}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ManageService;
