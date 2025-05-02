import CFForm from "@/components/form/CFFrom";
import CFInput from "@/components/form/CFInput";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { updateUserValidationSchema } from "@/schema/userSchema";
import { TError } from "@/types/global";
import { TUserDetail } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type TProps = {
  user: TUserDetail;
};

const EditProfile = ({ user }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.avatar || "");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const methods = useForm();
  const [userUpdate] = useUpdateUserMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      //   console.log("img", imageUrl);

      setPreviewImage(imageUrl);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();

    try {
      const userInfo = {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
      };

      //   console.log("user-data", userInfo);

      if (selectedImage) {
        formData.append("avatar", selectedImage);
      }

      formData.append("data", JSON.stringify(userInfo));

      const res = await userUpdate({
        id: user._id,
        data: formData,
      }).unwrap();

      //   console.log("view-res", res);

      if (res?.success) {
        toast.success(res?.message);
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
                    name: user?.name,
                    phone: user?.phone,
                    email: user?.email,
                    address: user?.address,
                  }}
                  resolver={zodResolver(updateUserValidationSchema)}
                  onSubmit={onSubmit}
                >
                  <div className="py-2">
                    <CFInput label="Name" name="name" type="text" />
                  </div>
                  <div className="py-2">
                    <CFInput label="Email" name="email" type="email" />
                  </div>
                  <div className="py-2">
                    <CFInput label="Phone" name="phone" type="text" />
                  </div>
                  <div className="py-2">
                    <CFInput label="Address" name="address" type="text" />
                  </div>
                  <div className="py-2">
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

export default EditProfile;
