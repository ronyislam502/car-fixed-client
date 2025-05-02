// components/skeletons/ReviewSkeleton.tsx

const ReviewSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2].map((_, index) => (
        <div key={index} className="pb-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-4 bg-gray-700 rounded" />
            <div className="w-24 h-3 bg-gray-700 rounded" />
          </div>
          <div className="mt-2 h-4 w-full bg-gray-700 rounded" />
          <div className="h-3 w-1/2 bg-gray-700 rounded mt-2" />
          <div className="flex gap-1 mt-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-700 rounded" />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSkeleton;
