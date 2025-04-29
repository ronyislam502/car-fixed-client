import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/booking";
import { convert24HourToAM_PM, formatDate } from "@/utils/Date";

const Bookings = () => {
  const { data: bookings } = useGetAllBookingsQuery({});

  console.log("data", bookings);

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
              <th>TNXID</th>
              <th>User</th>
              <th>Email</th>
              <th>Service</th>
              <th>Price</th>
              <th>Duration</th>
              <th>StartTime</th>
              <th>EndTime</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.data?.data?.map((booking: TBooking) => (
              <tr key={booking._id}>
                <td>{formatDate(booking.createdAt)}</td>
                <td>{booking?.transactionId}</td>
                <td>{booking?.user?.name}</td>
                <td>{booking?.user?.email}</td>
                <td>{booking?.service?.title}</td>
                <td>$ {(booking?.service?.price as number).toFixed(2)}</td>
                <th>{booking?.service?.duration}min</th>
                <th>{convert24HourToAM_PM(booking?.slot?.startTime)}</th>
                <th>{convert24HourToAM_PM(booking?.slot?.endTime)}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
