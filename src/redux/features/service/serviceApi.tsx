import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { TService } from "@/types/service";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allServices: builder.query({
      query: ({ search, sort, page, limit, category }) => {
        const params = new URLSearchParams();

        if (search) {
          params.append("searchTerm", search);
        }
        if (category) {
          params.append("category", category);
        }
        if (sort) {
          params.append("sort", sort);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/services",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["service"],
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    singleService: builder.query({
      query: (args) => ({
        url: `/services/service/${args?.id}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: "/services/create-service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
    updateService: builder.mutation({
      query: (args) => ({
        url: `/services/update/${args?.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useAllServicesQuery,
  useSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useAddServiceMutation,
} = serviceApi;
