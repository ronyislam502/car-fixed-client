/* eslint-disable @typescript-eslint/no-explicit-any */
import CFForm from "@/components/form/CFFrom";
import CFInput from "@/components/form/CFInput";
import CFSelect from "@/components/form/CFSelect";
import { useAllServicesQuery } from "@/redux/features/service/serviceApi";
import { useCreateSlotMutation } from "@/redux/features/slot/slotApi";
import { createSlotValidationSchema } from "@/schema/slotSchema";
import { TError } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateSlot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm();
  const { data: services, isLoading: serviceLoading } = useAllServicesQuery({});
  const [addSlot] = useCreateSlotMutation();

  let serviceOption: { key: string; label: string }[] = [];

  if (services?.data && !serviceLoading) {
    serviceOption = services.data.map(
      (service: { _id: string; title: string; duration: number }) => ({
        key: service._id,
        label: `${service.title} : ${service.duration}min`,
      })
    );
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const slotData = {
        service: data?.service,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
      };

      console.log("slotData", slotData);
      const res = await addSlot(slotData).unwrap();
      if (res.success) {
        toast.success(res.message);
        setIsOpen(false);
      }
    } catch (error) {
      const err = error as TError;

      toast.error(err?.data?.message);
    }
  };

  return (
    <div>
      <div className="flex mb-4  flex-col items-center justify-center">
        <button
          className="btn btn-outline btn-primary text-white"
          onClick={() => setIsOpen(true)}
        >
          Add Slot
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-4">
              Create Service Slot
            </h3>
            <FormProvider {...methods}>
              <div>
                <CFForm
                  resolver={zodResolver(createSlotValidationSchema)}
                  onSubmit={onSubmit}
                >
                  <div className="py-2">
                    <CFInput label="Date" name="date" type="date" />
                  </div>
                  <div className="py-2">
                    <CFSelect
                      label="Service"
                      name="service"
                      options={serviceOption}
                    />
                  </div>

                  <div className="py-2">
                    <CFInput
                      label="StartTime"
                      name="startTime"
                      placeholder="HH:MM"
                      type="time"
                    />
                  </div>
                  <div className="py-2">
                    <CFInput
                      label="EndTime"
                      name="endTime"
                      placeholder="HH:MM"
                      type="time"
                    />
                  </div>
                  <div className="text-end py-2">
                    <button
                      type="button"
                      className="btn btn-outline btn-error sm:w-auto"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-outline btn-success"
                      type="submit"
                    >
                      submit
                    </button>
                  </div>
                </CFForm>
              </div>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSlot;
