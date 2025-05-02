import { useGetAllSlotsQuery } from "@/redux/features/slot/slotApi";
import { TSlot } from "@/types/slot";
import { useState } from "react";
import CreateSlot from "../component/CreateSlot";
import { convert24HourToAM_PM } from "@/utils/Date";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

const SlotsManage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { data: slots, isLoading } = useGetAllSlotsQuery({
    page,
    limit,
  });

  const totalPages = slots?.meta?.totalPage || 1;

  return (
    <div className="mt-2 bg-black/80">
      <div className="text-xl font-bold text-center py-6">
        <h2>Slots</h2>
      </div>
      <div>
        <CreateSlot />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-blue-700 text-green-500 text-lg">
              <th>Date</th>
              <th>Service</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Price</th>
              <th>StartTime</th>
              <th>EndTime</th>
              <th>isBooked</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={8} rows={limit} />
            ) : (
              slots?.data?.map((slot: TSlot) => (
                <tr key={slot._id}>
                  <td>{slot.date}</td>
                  <td>{slot?.service.title}</td>
                  <td>{slot?.service.category}</td>
                  <td>{slot?.service?.duration}min</td>
                  <td>$ {(slot?.service?.price as number).toFixed(2)}</td>
                  <td>{convert24HourToAM_PM(slot.startTime)}</td>
                  <td>{convert24HourToAM_PM(slot.endTime)}</td>
                  <td>{slot.isBooked}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 my-2 px-10">
        <button
          className="btn btn-outline btn-primary text-white btn-sm"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="text-white">
          {page} / {totalPages}
        </span>
        <button
          className="btn btn-outline btn-primary text-white btn-sm"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SlotsManage;
