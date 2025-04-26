import { TResponseRedux } from "../../../types/global";
import { TSlot } from "../../../types/slot";
import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();
        console.log(params);

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
      providesTags: ["service"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetAllSlotsQuery,
  useGetAvailableSlotQuery,
} = slotApi;
