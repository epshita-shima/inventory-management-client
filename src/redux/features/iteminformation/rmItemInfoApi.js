import { api } from "../../api/apiSlice";

const rmItemInfoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRMItemInformation: builder.query({
      query: () => "/rmiteminfo",
      providesTags: ["insertiteminfo", "updateiteminfo","deleteiteminfo","changesitemtatus"],
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }),

    insertRMItemInformation: builder.mutation({
      query: (payload) => ({
        url: "/rmiteminfo",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["insertiteminfo"],
      transformResponse: (response, meta) => ({
        data: response,
        status: meta.response.status,
      }),
    }),

    getSingleRMItem: builder.query({
      query: (id) => {
        if (id) {
          return `/rmiteminfo/${id}`;
        } else {
          throw new Error("User id is required");
        }
      },
    }),

    updateRMItemInfo: builder.mutation({
      query: (payload) => ({
        url: `/rmiteminfo/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["updateiteminfo"],
      transformResponse: (response, meta) => ({
        data: response,
        status: meta.response.status,
      }),
    }),
    updateRawMaterialStatus: builder.mutation({
      query: (dataToUpdate) => ({
        url: "/rmiteminfo",
        method: "PUT",
        body: dataToUpdate,
      }),
      invalidatesTags: ["changesitemtatus"],
      transformResponse: (response, meta) => ({
        data: response,
        status: meta.response.status,
      }),
    }),
    deleteRMItemInfo: builder.mutation({
      query: (id) => ({
        url: `/rmiteminfo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteiteminfo"],
      transformResponse: (response, meta) => ({
        data: response,
        status: meta.response.status
      })
    
    }),
  }),
});

export const {
useGetAllRMItemInformationQuery,
useInsertRMItemInformationMutation,
useGetSingleRMItemQuery,
useUpdateRMItemInfoMutation,
useUpdateRawMaterialStatusMutation,
useDeleteRMItemInfoMutation
} = rmItemInfoApi;
