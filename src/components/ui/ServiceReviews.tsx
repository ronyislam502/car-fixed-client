import { useGetServiceReviewsQuery } from "@/redux/features/review/reviewApi";
import { TReview } from "@/types/review";
import { formatDate } from "@/utils/Date";

const ServiceReviews = ({ serviceId }: { serviceId: string }) => {
  const { data: reviewsData } = useGetServiceReviewsQuery(serviceId);
  const reviews = reviewsData?.data;
  return (
    <div className="p-2 border border-amber-50 rounded-2xl">
      {/* Average Rating */}
      <div className=" flex gap-2">
        <div className="shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">Average Rating</h2>
          <div className="flex items-center gap-3">
            <div className="rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  type="radio"
                  name="avg-rating"
                  className="mask mask-star-2 bg-yellow-400"
                  checked={Math.round(reviews?.averageRating) === i}
                  readOnly
                />
              ))}
            </div>
            <p className="text-lg">{reviews?.averageRating}</p>
          </div>
        </div>
        <div>
          {reviews?.data?.map((review: TReview) => (
            <div
              key={review?._id}
              className="bg-blue/80 shadow-md p-4 rounded-xl border"
            >
              <div className="items-center mb-2">
                <div>
                  <h3 className="font-semibold text-md">
                    {review?.user?.name}
                  </h3>
                </div>
                <p className="text-sm">{review?.feedback}</p>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <input
                      key={i}
                      type="radio"
                      name={`rating-${review._id}`}
                      className="mask mask-star-2 bg-orange-400"
                      checked={review.rating === i}
                      readOnly
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs mt-2">
                Reviewed on {formatDate(review?.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
    </div>
  );
};

export default ServiceReviews;
