import { api } from "../../api/apiSlice";

const iteminfoApi= api.injectEndpoints({
  endpoints: (builder) => ({
    getAllItemInformation: builder.query({
        query: () => "/iteminfo",
        providesTags: ["insertiteminfo"],
        refetchOnReconnect: true,
        refetchOnFocus: true,
      }),
      
    insertItemInformation: builder.mutation({
      query: (payload) => ({
        url: "/iteminfo",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["insertiteminfo"],
      transformResponse: (response, meta) => ({
        data: response,
        status: meta.response.status,
      }),
    }),
    getSingleItem: builder.query({
        query: (id) => {
          if (id) {
            return `/iteminfo/${id}`;
          } else {
            throw new Error("User id is required");
          }
        },
      }),
  }),
})

export const{useGetAllItemInformationQuery,useInsertItemInformationMutation,useGetSingleItemQuery}=iteminfoApi