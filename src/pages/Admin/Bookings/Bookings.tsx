import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/booking";
import { convert24HourToAM_PM, formatDate } from "@/utils/Date";
import { useState } from "react";

const Bookings = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { data: bookings, isLoading } = useGetAllBookingsQuery({ page, limit });
  const totalPages = bookings?.meta?.totalPage || 1;

  console.log("data", bookings);

  return (
    <div className="mt-2 bg-black/80 text-white">
      <div className="text-xl font-bold text-center py-6">
        <h2>Bookings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-blue-700 text-green-500 text-sm">
              <th>Date</th>
              <th>TNXID</th>
              <th>User</th>
              <th>Email</th>
              <th>Service</th>
              <th>Price($)</th>
              <th>Duration</th>
              <th>StartTime</th>
              <th>EndTime</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={10} rows={limit} />
            ) : (
              bookings?.data?.data?.map((booking: TBooking) => (
                <tr key={booking._id}>
                  <td>{formatDate(booking.createdAt)}</td>
                  <td>{booking?.transactionId}</td>
                  <td>{booking?.user?.name}</td>
                  <td>{booking?.user?.email}</td>
                  <td>{booking?.service?.title}</td>
                  <td>{(booking?.service?.price as number).toFixed(2)}</td>
                  <th>{booking?.service?.duration}min</th>
                  <th>{convert24HourToAM_PM(booking?.slot?.startTime)}</th>
                  <th>{convert24HourToAM_PM(booking?.slot?.endTime)}</th>
                  <th>{booking?.paymentStatus}</th>
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

export default Bookings;
