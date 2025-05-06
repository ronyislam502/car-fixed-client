import { useState } from "react";
import Container from "@/components/ui/Container";
import { useAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { TReview } from "@/types/review";
import { formatDate } from "@/utils/Date";
import { FaStar } from "react-icons/fa";
import { AnimatedProgress } from "@/utils/AnimateProgressBar";
import ReviewSkeleton from "@/components/skeleton/ReviewSkeleton";

const ReviewSummary = () => {
  const [limit, setLimit] = useState(2);
  const { data: reviewData, isFetching } = useAllReviewsQuery({
    page: 1,
    limit,
  });

  const reviews = reviewData?.data?.data;
  const totalReviews = reviewData?.data?.meta?.total;
  const averageRating = reviewData?.data?.averageRating;

  // Count star ratings
  const ratingCounts = [1, 2, 3, 4, 5].reduce((acc, star) => {
    acc[star] = reviews?.filter(
      (review: TReview) => review?.rating === star
    )?.length;
    return acc;
  }, {} as Record<number, number>);

  return (
    <Container>
      <div className="bg-black/80 p-6 rounded-md shadow-md text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Rating Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Reviews</h2>
            <div className="text-5xl font-bold mb-2 text-white">
              {averageRating ?? "0.0"}
            </div>
            <div className="space-y-3 mb-6">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star] || 0;
                const percent = totalReviews ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-6">{star}.0</span>
                    <AnimatedProgress value={percent} />
                    <span className="w-16 text-right">{count} reviews</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Review List */}
          <div className="py-6">
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
              {isFetching ? (
                <ReviewSkeleton />
              ) : (
                reviews?.map((review: TReview) => (
                  <div
                    key={review?._id}
                    className="pb-4 border-b border-gray-600"
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-semibold">
                          {review?.user?.name || "User"}
                        </p>
                        <p className="text-xs text-white">
                          {formatDate(review?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-200">
                      {review?.feedback}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <FaStar
                          key={idx}
                          size={16}
                          fill={idx < review?.rating ? "currentColor" : "white"}
                        />
                      ))}
                      <span className="ml-1 text-sm font-semibold text-white">
                        {review?.rating}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Show More Button */}
            {!isFetching && reviews?.length < totalReviews && (
              <div className="pt-4 text-center">
                <button
                  disabled={isFetching}
                  onClick={() => setLimit((prev) => prev + 4)}
                  className="btn btn-outline btn-primary btn-sm text-white"
                >
                  See More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReviewSummary;
