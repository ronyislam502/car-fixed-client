import CFForm from "@/components/form/CFFrom";
import CFInput from "@/components/form/CFInput";
import CFSelect from "@/components/form/CFSelect";
import CFTextarea from "@/components/form/CFTextarea";
import { useUpdateServiceMutation } from "@/redux/features/service/serviceApi";
import {
  categoryOption,
  updateServiceValidationSchema,
} from "@/schema/serviceSchema";
import { TError } from "@/types/global";
import { TService } from "@/types/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type TProps = {
  service: TService;
};

const UpdateService = ({ service }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(service?.image || "");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const methods = useForm();
  const [updateService] = useUpdateServiceMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      console.log("img", imageUrl);

      setPreviewImage(imageUrl);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const numericPrice = Number(data?.price);
    const numericDuration = Number(data?.duration);

    if (isNaN(numericPrice) || isNaN(numericDuration)) {
      toast.error("Duration and Price must be valid numbers.");
      return;
    }
    const formData = new FormData();

    try {
      const serviceData = {
        title: data?.title,
        description: data?.description,
        duration: numericDuration,
        price: numericPrice,
        category: data?.category,
      };

      formData.append("data", JSON.stringify(serviceData));
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await updateService({
        id: service._id,
        data: formData,
      }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        methods.reset();
        setIsOpen(false);
      }
    } catch (error) {
      const err = error as TError;

      toast.error(err?.data?.message);
    }
  };

  return (
    <div>
      <div className="flex mb-4 flex-col items-center justify-center">
        <button
          className="btn btn-outline btn-primary text-white"
          onClick={() => setIsOpen(true)}
        >
          Update
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-4">
              Update Service
            </h3>
            <FormProvider {...methods}>
              <div>
                <CFForm
                  defaultValues={{
                    title: service?.title,
                    description: service?.description,
                    price: service?.price,
                    category: service?.category,
                    duration: service?.duration,
                  }}
                  resolver={zodResolver(updateServiceValidationSchema)}
                  onSubmit={onSubmit}
                >
                  <div className="py-2">
                    <CFInput label="Title" name="title" type="text" />
                  </div>
                  <div className="py-2">
                    <CFTextarea
                      label="Description"
                      name="description"
                      type="text"
                    />
                  </div>
                  <div className="py-2">
                    <CFSelect
                      label="Category"
                      name="category"
                      options={categoryOption}
                    />
                  </div>
                  <div className="py-2">
                    <CFInput label="Duration" name="duration" type="number" />
                  </div>
                  <div className="py-2">
                    <CFInput label="Price" name="price" type="number" />
                    <div className="min-w-fit flex-1">
                      <label className="text-xl text-white">Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input file-input-bordered file-input-success"
                      />
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="mt-4 w-20 max-h-64 object-cover rounded-full shadow"
                        />
                      )}
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
                    >
                      Update
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

export default UpdateService;
