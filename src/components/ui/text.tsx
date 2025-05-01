import React from "react";

const text = () => {
  return (
    <div className="py-8 md:py-12 lg:py-16 w-full bg-base-100">
      <SectionHeading
        slogan="book plan"
        description=""
        heading="Explore more about this service"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 layout_container">
        {/* Service Info Card */}
        <div className="col-span-2">
          <div className="card shadow bg-white rounded-box p-6">
            <h1 className="text-2xl font-bold mb-4 text-primary">
              {service?.data.name}
            </h1>
            <p className="text-gray-500 mb-6">{service?.data.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Duration</h3>
                <p>{service?.data.duration} minutes</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Price</h3>
                <p>$ {service?.data.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar + Slots */}
        <div className="flex flex-col gap-6">
          <div className="card shadow bg-white rounded-box p-6">
            <h2 className="text-xl font-bold mb-4">Select a Date</h2>
            <Calendar
              selected={date}
              onSelect={(date) => {
                setDate(date || new Date());
                dispatch(setBookingInfo({ slot: "" }));
              }}
              mode="single"
              className="mx-auto w-fit"
            />
          </div>

          <div className="card shadow bg-white rounded-box p-6">
            <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {isFetching ? (
                [...Array(4)].map((_, idx) => (
                  <div key={idx} className="skeleton h-10 rounded w-full"></div>
                ))
              ) : data?.data.length ? (
                data.data.map((slot) => {
                  const isDisabled =
                    slot.isBooked === "booked" || slot.isBooked === "cancel";
                  return (
                    <div
                      key={slot._id}
                      className="tooltip"
                      data-tip={isDisabled ? "Not available" : ""}
                    >
                      <button
                        disabled={isDisabled}
                        onClick={() =>
                          !isDisabled &&
                          dispatch(setBookingInfo({ slot: slot._id }))
                        }
                        className={`btn btn-outline w-full ${
                          selectedSlot === slot._id
                            ? "btn-primary text-white"
                            : ""
                        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {slot.startTime}
                      </button>
                    </div>
                  );
                })
              ) : (
                <p>No slot available</p>
              )}
            </div>

            <button
              onClick={handleProcced}
              className="btn btn-primary w-full mt-6"
              disabled={!selectedSlot}
            >
              Book This Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default text;
