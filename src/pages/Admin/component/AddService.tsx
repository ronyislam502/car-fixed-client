import CFForm from "@/components/form/CFFrom";
import CFInput from "@/components/form/CFInput";
import CFSelect from "@/components/form/CFSelect";
import CFTextarea from "@/components/form/CFTextarea";
import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addServiceValidationSchema,
  categoryOption,
} from "@/schema/serviceSchema";
import { toast } from "react-toastify";
import { TError } from "@/types/global";
import { useAddServiceMutation } from "@/redux/features/service/serviceApi";

const AddService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const methods = useForm();
  const [createService] = useAddServiceMutation();

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

      const res = await createService(formData).unwrap();
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
      <div className="flex mb-4  flex-col items-center justify-center">
        <button
          className="btn btn-outline btn-primary text-white"
          onClick={() => setIsOpen(true)}
        >
          Add
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-4">Add Service</h3>
            <FormProvider {...methods}>
              <div>
                <CFForm
                  resolver={zodResolver(addServiceValidationSchema)}
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

export default AddService;
