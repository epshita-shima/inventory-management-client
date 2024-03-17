import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/user-create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["createuser"],
    }),
    getAllUser: builder.query({
      query: () => "/get-user",
      providesTags: [
        "createuser",
        "updatedata",
        "changestatus",
        "deleteuser",
        "changesmanytatus",
      ],
    }),
    getSingleUser: builder.query({
      query: (id) => {
        if (id) {
          return `/user/${id}`;
        } else {
          throw new Error("User id is required");
        }
      },
    }),
    updateUser: builder.mutation({
      query: (updatedData) => ({
        url: `/user/update/${updatedData._id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["changestatus"],
    }),
    updateMultipleUserStatus: builder.mutation({
      query: (dataToUpdate) => ({
        url: "user/status/updateStatus",
        method: "PUT",
        body: dataToUpdate,
      }),
      invalidatesTags: ["changesmanytatus"],
    }),
    updateMultipleUserField: builder.mutation({
      query: (dataToUpdate) => ({
        url: "user/updatestatus/updateMultiple",
        method: "PUT",
        body: dataToUpdate,
      }),
      invalidatesTags: ["updatedata"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteuser"],
    }),
  }),
});
export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateMultipleUserStatusMutation,
  useUpdateMultipleUserFieldMutation,
} = userApi;
