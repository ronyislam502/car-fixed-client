import CFForm from "@/components/form/CFFrom";
import CFInput from "@/components/form/CFInput";
import CFSelect from "@/components/form/CFSelect";
import { TUser } from "@/redux/features/auth/authSlice";
import { useCreateBookingsMutation } from "@/redux/features/booking/bookingApi";
import { useGetSingleSlotQuery } from "@/redux/features/slot/slotApi";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { vehicleOption } from "@/schema/serviceSchema";
import { TError } from "@/types/global";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CheckOut = () => {
  const methods = useForm();
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const bookingInfo = useAppSelector((state) => state?.booking);
  const { data: userInfo } = useGetUserByEmailQuery(loggedUser?.email);
  const id = bookingInfo?.selectedSlot;
  const user = userInfo?.data[0];
  const { data: slotInfo } = useGetSingleSlotQuery(id);
  const slot = slotInfo?.data;

  const [createBooking] = useCreateBookingsMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const bookingData = {
        user: user._id,
        service: slot?.service?._id,
        slot: slot?._id,
        vehicleType: data?.vehicleType,
        vehicleBrand: data?.vehicleBrand,
        vehicleModel: data?.vehicleModel,
        manufacturingYear: data?.manufacturingYear,
        registrationPlate: data?.registrationPlate,
      };

      console.log(bookingData);

      const res = await createBooking(bookingData).unwrap();
      console.log(res);

      if (res?.success) {
        window.location.href = res?.data;
        toast.success(res?.message);
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card bg-black/80 text-white shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-4">Checkout</h2>
          <FormProvider {...methods}>
            <CFForm
              defaultValues={{
                name: user?.name,
                email: user?.email,
                phone: user?.phone,
                address: user?.address,
              }}
              onSubmit={onSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center px-10">
                <div className="col-span-1 px-10">
                  <div className="card">
                    <h3 className="text-xl font-semibold mb-2">User Info</h3>
                    <div className="card-body items-start text-start">
                      <div className="py-2 flex gap-2">
                        <CFInput label="Name" name="name" type="text" />
                        <CFInput label="E-mail" name="email" type="email" />
                      </div>
                      <div className="py-2 flex gap-2">
                        <CFInput label="Phone" name="phone" type="text" />
                        <CFInput label="Address" name="address" type="text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="card">
                    <h3 className="text-xl font-semibold mb-2">Vehicle Info</h3>
                    <div className="card-body items-start text-start">
                      <div className="py-2 flex gap-2">
                        <CFSelect
                          label="VehicleType"
                          name="vehicleType"
                          options={vehicleOption}
                        />
                        <CFInput
                          label="VehicleBrand"
                          name="vehicleBrand"
                          type="text"
                        />
                      </div>
                      <div className="py-2 flex gap-2">
                        <CFInput
                          label="VehicleModel"
                          name="vehicleModel"
                          type="text"
                        />
                        <CFInput
                          label="ManufacturingYear"
                          name="manufacturingYear"
                          type="text"
                        />
                      </div>

                      <div className="py-2">
                        <CFInput
                          label="RegistrationPlate"
                          name="registrationPlate"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Order Summary
                </h3>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="bg-blue-400 text-lg font-bold">
                        <th>Service</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>StartTime</th>
                        <th>EndTime</th>
                        <th>Tax</th>
                        <th>totalPay</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={slot?._id}>
                        <td>{slot?.service?.title}</td>
                        <td>${(slot?.service?.price as number)?.toFixed(2)}</td>
                        <td>{slot?.service?.duration}min</td>
                        <td>{slot?.startTime}</td>
                        <td>{slot?.endTime}</td>
                        <td>${(slot?.service?.price * 0.1).toFixed(2)}</td>
                        <td>
                          $
                          {(
                            parseFloat(
                              (slot?.service?.price * 0.1).toFixed(2)
                            ) + slot?.service?.price
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between mt-6 text-lg font-medium">
                {/* <p>Total Tax: ${cart?.tax.toFixed(2)}</p>
              <p>Total Payable: ${cart?.grandTotal.toFixed(2)}</p> */}
              </div>

              <div className="mt-6 text-right">
                <button className="btn btn-success" type="submit">
                  Proceed to Payment
                </button>
              </div>
            </CFForm>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
