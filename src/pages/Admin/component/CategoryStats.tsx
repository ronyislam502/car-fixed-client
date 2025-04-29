/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CategoryStats = ({ data }: { data: any[] }) => {
  const formattedData = data?.map((item) => ({
    category: item?.category,
    totalRevenue: item?.totalRevenue,
  }));

  return (
    <ResponsiveContainer
      height={300}
      width="100%"
      //   className="text-xl font-bold"
    >
      <BarChart data={formattedData}>
        <XAxis
          dataKey="category"
          tick={{ fill: "#3B82F6", fontWeight: "bold", fontSize: 14 }}
        />
        <YAxis tick={{ fill: "#10B981", fontWeight: "bold", fontSize: 14 }} />
        <Tooltip />
        <Bar dataKey="totalRevenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryStats;
