import { useGetAllSlotsQuery } from "@/redux/features/slot/slotApi";
import { TSlot } from "@/types/slot";
import { useState } from "react";

const SlotsManage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const { data: slots } = useGetAllSlotsQuery({
    page,
    limit,
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
        <h2>Slots</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-blue-950">
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
            {slots?.data?.map((slot: TSlot) => (
              <tr key={slot._id}>
                <td>{slot.date}</td>
                <td>{slot?.service.title}</td>
                <td>{slot?.service.category}</td>
                <td>{slot?.service?.duration}min</td>
                <td>$ {(slot?.service?.price as number).toFixed(2)}</td>
                <th>{slot.startTime}</th>
                <th>{slot.endTime}</th>
                <th>{slot.isBooked}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlotsManage;
