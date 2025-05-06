import { useDeleteServiceMutation } from "@/redux/features/service/serviceApi";
import { TError } from "@/types/global";
import { TService } from "@/types/service";
import { useState } from "react";
import { toast } from "react-toastify";

type TProps = {
  service: TService;
};

const DeleteService = ({ service }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteService] = useDeleteServiceMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteService(id);

      if (res?.data.success) {
        toast.success(res?.data?.message);
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
          className="btn btn-outline btn-error text-white"
          onClick={() => setIsOpen(true)}
        >
          Delete
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-4">
              Delete Service
            </h3>
            <div className="w-full">
              <div className="py-2">
                <h2 className="font-bold">{service?.title}</h2>
                <div className="flex gap-4">
                  <img
                    className="cursor-pointer border-spacing-2"
                    height={150}
                    src={service?.image}
                    width={170}
                  />
                </div>
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
                  onClick={() => handleDelete(service?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteService;
