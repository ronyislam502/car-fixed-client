import { TResponseRedux } from "../../../types/global";
import { TSlot } from "../../../types/slot";
import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/slots",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["slot"],
      transformResponse: (response: TResponseRedux<TSlot[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createSlot: builder.mutation({
      query: (slotInfo) => ({
        url: "/slots/create-slot",
        method: "POST",
        body: slotInfo,
      }),
      invalidatesTags: ["slot"],
    }),
    getAvailableSlot: builder.query({
      query: () => ({
        url: `/slots/availability`,
        method: "GET",
      }),
      providesTags: ["slot"],
    }),
    getSingleSlot: builder.query({
      query: (id) => ({
        url: `/slots/slot/${id}`,
        method: "GET",
      }),
      providesTags: ["slot"],
    }),
    getServiceSlots: builder.query({
      query: (id) => ({
        url: `/slots/service/${id}`,
        method: "GET",
      }),
      providesTags: ["slot"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetAllSlotsQuery,
  useGetAvailableSlotQuery,
  useGetServiceSlotsQuery,
  useGetSingleSlotQuery,
} = slotApi;
