import { useGetStatisticsQuery } from "@/redux/features/statistic/statisticApi";
import CategoryStats from "./component/CategoryStats";
import ServiceStats from "./component/ServiceStats";

const Admin = () => {
  const { data: statistics } = useGetStatisticsQuery("");
  console.log(statistics);

  const categoryData = statistics?.data?.categoryAggregation;
  const serviceData = statistics?.data?.serviceAggregation;
  const revenue = statistics?.data?.revenue;

  return (
    <div>
      <h2 className="text-center text-4xl font-bold py-6 text-white">Sales Dashboard</h2>

      <h2 className="text-2xl font-bold p-2 text-white">
        Revenue:{" "}
        <span className="text-green-500">${revenue?.totalRevenue}</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category-wise */}
        <div
          className="card shadow-xl bg-black/80"
        >
          <div className="card-header">
            <h3 className="text-center text-2xl font-semibold text-white">
              Category-wise
            </h3>
          </div>
          <div className="card-body">
            <CategoryStats data={categoryData} />
          </div>
        </div>

        {/* service-wise  */}
        <div
          className="card shadow-xl bg-black/80"
        >
          <div className="card-header">
            <h3 className="text-center text-2xl font-bold text-white">Service-wise</h3>
          </div>
          <div className="card-body">
            <ServiceStats data={serviceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
