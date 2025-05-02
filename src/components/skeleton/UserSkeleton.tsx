const UserSkeleton = () => {
  return (
    <div className="card bg-black/80 shadow-sm animate-pulse">
      <h2 className="text-center text-4xl font-bold p-6 bg-gray-700 rounded w-1/2 mx-auto"></h2>
      <div className="flex gap-6">
        <div className="px-10 py-10">
          <div className="h-[400px] w-[300px] bg-gray-700 rounded-xl"></div>
        </div>
        <div className="card-body px-10 py-10 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="h-5 w-24 bg-blue-500 rounded mb-1"></div>
              <div className="h-6 w-56 bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSkeleton;
