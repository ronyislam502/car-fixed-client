import CFForm from "@/components/form/CFFrom";
import CFTextarea from "@/components/form/CFTextarea";
import { TUser } from "@/redux/features/auth/authSlice";
import { useAddReviewMutation } from "@/redux/features/review/reviewApi";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { TBooking } from "@/types/booking";
import { TError } from "@/types/global";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

type TProps = {
  booking: TBooking;
};

const AddReview = ({ booking }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const loggedUser = useAppSelector((state) => state.auth.user) as TUser;
  const { data: userData } = useGetUserByEmailQuery(loggedUser?.email);
  const user = userData?.data[0];
  const service = booking?.service;
  const methods = useForm();
  const [createReview] = useAddReviewMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const reviewData = {
        user: user?._id,
        booking: booking?._id,
        service: service?._id,
        feedback: data?.feedback,
        rating,
      };
      const res = await createReview(reviewData).unwrap();
      if (res.success) {
        toast.success(res?.message);
        methods.reset();
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
          review
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-4">Add Service</h3>
            <FormProvider {...methods}>
              <div>
                <CFForm onSubmit={onSubmit}>
                  <div className="py-2">
                    <CFTextarea label="Feedback" name="feedback" type="text" />
                  </div>
                  <div>
                    <h3>Rating</h3>
                    <div className="flex space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer w-6 h-6 ${
                            rating >= star ? "text-yellow-500" : "text-gray-300"
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
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

export default AddReview;
