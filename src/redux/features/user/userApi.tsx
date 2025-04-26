import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: ({ search, role, page, limit }) => {
        const params = new URLSearchParams();

        if (search) {
          params.append("searchTerm", search);
        }
        if (role) {
          params.append("role", role);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),
    getUserByEmail: builder.query({
      query: (email) => ({
        url: `/users/user/${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ userData, id }) => ({
        url: `/users/update/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} = userApi;
