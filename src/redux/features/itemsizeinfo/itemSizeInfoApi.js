import { api } from "../../api/apiSlice";

const itemSizeInfoApi= api.injectEndpoints({
  endpoints: (builder) => ({
    getAllItemSize: builder.query({
        query: () => "/itemzise",
        providesTags: ["insertitemsize"],
        refetchOnReconnect: true,
        refetchOnFocus: true,
      }),
      
    insertItemSize: builder.mutation({
      query: (payload) => ({
        url: "/itemzise",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["insertitemsize"],
      transformResponse: (response, meta) => ({
        data: response,
        status: meta.response.status,
      }),
    }),
  }),
});

export const { useGetAllItemSizeQuery,useInsertItemSizeMutation } = itemSizeInfoApi;