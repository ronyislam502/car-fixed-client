import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allReviews: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/reviews",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: "/reviews/create-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: (args) => ({
        url: `/reviews/update/${args?.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["review"],
    }),
    getServiceReviews: builder.query({
      query: (id) => ({
        url: `/reviews/service/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
  }),
});

export const {
  useAllReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useGetServiceReviewsQuery,
} = reviewApi;
