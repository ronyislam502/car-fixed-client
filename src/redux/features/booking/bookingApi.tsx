import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();
        console.log(params);

        return {
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["booking"],
    }),
    getMyBookings: builder.query({
      query: ({ user, page, limit }) => {
        const params = new URLSearchParams();

        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: `/bookings/user/${user?.email}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["booking"],
    }),
    createBookings: builder.mutation({
      query: (bookingInfo) => ({
        url: "/bookings/create-booking",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useCreateBookingsMutation,
} = bookingApi;
