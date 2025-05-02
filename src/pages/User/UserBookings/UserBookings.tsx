import TableSkeleton from "@/components/ui/TableSkeleton";
import { useGetMyBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import { TBooking } from "@/types/booking";
import { convert24HourToAM_PM, formatDate } from "@/utils/Date";
import AddReview from "../component/AddReview";

const UserBookings = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: bookings, isLoading } = useGetMyBookingsQuery(user?.email);

  return (
    <div className="mt-2 bg-black/80">
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
              <th>Service</th>
              <th>Price($)</th>
              <th>Duration</th>
              <th>StartTime</th>
              <th>EndTime</th>
              <th>Payment</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={9} />
            ) : (
              bookings?.data?.data?.map((booking: TBooking) => (
                <tr key={booking._id}>
                  <td>{formatDate(booking.createdAt)}</td>
                  <td>{booking?.transactionId}</td>
                  <td>{booking?.service?.title}</td>
                  <td>{(booking?.service?.price as number).toFixed(2)}</td>
                  <th>{booking?.service?.duration}min</th>
                  <th>{convert24HourToAM_PM(booking?.slot?.startTime)}</th>
                  <th>{convert24HourToAM_PM(booking?.slot?.endTime)}</th>
                  <th>{booking?.paymentStatus}</th>
                  <th>
                    <AddReview booking={booking} />
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBookings;
