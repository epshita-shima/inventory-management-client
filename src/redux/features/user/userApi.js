import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
   createUser: builder.mutation({
    query: (payload) => ({
      url: "/user-create",
      method: "POST",
      body: payload,
    }),
   
  }),
  getAllUser:builder.query({
    query: () => "/get-user",
  }),
  getSingleUser:builder.query({
    query: (id) => `/user/${id}`,
  }),
  updateUser: builder.mutation({
    query: (updatedData) => (
      {
      url: `/user/update/${updatedData._id}`,
      method: 'PUT',
      body: updatedData,
    }
    ),
 
  }),
  }),
});
export const {useCreateUserMutation,useGetAllUserQuery,useGetSingleUserQuery,useUpdateUserMutation}=userApi;