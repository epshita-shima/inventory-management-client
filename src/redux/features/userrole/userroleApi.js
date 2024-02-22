import { api } from "../../api/apiSlice";

const useroleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserRole: builder.query({
      query: () => "/getuserrole",
    }),
    addNewUserRole: builder.mutation({
      query: (payload) => ({
        url: "/userrole",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});
export const { useGetUserRoleQuery, useAddNewUserRoleMutation } = useroleApi;
