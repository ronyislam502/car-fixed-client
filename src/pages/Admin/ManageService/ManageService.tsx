import { useAllServicesQuery } from "@/redux/features/service/serviceApi";
import { TService } from "@/types/service";
import { useDebounce } from "@/utils/DebaounceHook";
import { useState } from "react";

const ManageService = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [sort, setSort] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: services } = useAllServicesQuery({
    category,
    search: debouncedSearch,
    limit,
    page,
    sort,
  });

  return (
    <div
      className="mt-2"
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/3xhFNrF5/Screenshot-2025-04-27-061224.png)",
      }}
    >
      <div className="text-xl font-bold text-center py-6">
        <h2>Users</h2>

        <div className="flex gap-2 px-2">
          <input
            className="input input-success"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select select-success ml-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option key="" value="">
              ALL
            </option>
            <option key="repair" value="repair">
              Repair
            </option>
            <option key="others" value="others">
              Others
            </option>
            <option key="maintain" value="maintain">
              Maintain
            </option>
          </select>
          <select
            className="select select-success ml-4"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option key="">ALL</option>
            <option key="+price">Low to High</option>
            <option key="-price">High to Low</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-blue-950">
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Action</th>
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
                <th>
                  <button
                    // onClick={() => handleDeleteUser(user)}
                    className="btn btn-outline btn-success"
                  >
                    add
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageService;
