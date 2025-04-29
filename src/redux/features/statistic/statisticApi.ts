import { baseApi } from "../../api/baseApi";
// { search, role, page, limit }

const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => ({
        url: "/statistics/stats",
        method: "GET",
      }),
      providesTags: ["statistic"],
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
