import { TSlot } from "@/types/slot";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import {
  setSelectedDate,
  setSlot,
} from "@/redux/features/booking/bookingSlice";
import { useGetServiceSlotsQuery } from "@/redux/features/slot/slotApi";

const ServiceSlots = ({ serviceId }: { serviceId: string }) => {
  const { data: slotData } = useGetServiceSlotsQuery(serviceId);
  const slots = slotData?.data;
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDateState] = useState<Date | undefined>();
  const [filteredSlots, setFilteredSlots] = useState<TSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      const availableForDate = slots?.filter(
        (slot: TSlot) => slot?.date === formattedDate
      );

      setFilteredSlots(availableForDate);
      setSelectedTime(null); // reset on date change

      // Dispatch the selected date to Redux
      dispatch(setSelectedDate(formattedDate));
    } else {
      setFilteredSlots([]);
    }
  }, [selectedDate, slots, dispatch]);

  const handleTimeSlotSelection = (time: string) => {
    setSelectedTime(time);
    dispatch(setSlot(time));
  };

  return (
    <div className="space-y-4">
      {/* Calendar */}
      <div className="bg-black/80 text-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Select a Date</h3>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDateState}
          classNames={{
            day_selected: "bg-green-600 text-white",
          }}
        />
      </div>

      {/* Time Slots */}
      <div className="bg-black/80 text-black p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>

        {filteredSlots?.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {filteredSlots?.map((slot: TSlot) => (
              <button
                key={slot?._id}
                disabled={slot?.isBooked !== "available"}
                onClick={() => handleTimeSlotSelection(slot?._id)}
                className={`border rounded px-2 py-2 text-sm font-medium
                  ${
                    slot?.isBooked !== "available"
                      ? "bg-gray-200 text-white cursor-not-allowed"
                      : selectedTime === slot?._id
                      ? "bg-green-600 text-white"
                      : "hover:bg-blue-500 text-white"
                  }`}
              >
                {slot?.startTime} - {slot?.endTime}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-white">No available slots for this date.</p>
        )}

        {selectedTime ? (
          <Link to={"/checkOut"}>
            <button
              className={`btn w-full ${
                selectedTime
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedTime}
            >
              Book This Service
            </button>
          </Link>
        ) : (
          <button
            className="btn w-full bg-gray-200 text-gray-400 cursor-not-allowed"
            disabled
          >
            Book This Service
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceSlots;
