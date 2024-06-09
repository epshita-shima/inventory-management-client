import { api } from "../../api/apiSlice";

const cftInfosApi= api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCFTInfos: builder.query({
        query: () => "/cftinfo",
        providesTags: ["insertcftinfos","updatecftinfo","changescftinfotatus","deletecftinfo"],
        refetchOnReconnect: true,
        refetchOnFocus: true,
      }),
      
    insertCFTInfo: builder.mutation({
      query: (payload) => ({
        url: "/cftinfo",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["insertcftinfos"],
      transformResponse: (response, meta) => ({
        data: response,
        status: meta.response.status,
      }),
    }),
    getSingleCFTInfo: builder.query({
        query: (id) => {
          if (id) {
            return `/cftinfo/${id}`;
          } else {
            throw new Error("CFT info id is required");
          }
        },
      }),
      updateCFTInfo: builder.mutation({
        query: (payload) => ({
          url: `/cftinfo/${payload._id}`,
          method: "PUT",
          body: payload,
        }),
        invalidatesTags: ["updatecftinfo"],
        transformResponse: (response, meta) => ({
          data: response,
          status: meta.response.status,
        }),
      }),
      updateCFTInfoStatus: builder.mutation({
        query: (dataToUpdate) => ({
          url: "/cftinfo",
          method: "PUT",
          body: dataToUpdate,
        }),
        invalidatesTags: ["changescftinfotatus"],
        transformResponse: (response, meta) => ({
          data: response,
          status: meta.response.status,
        }),
      }),
      deleteCFTInfo: builder.mutation({
        query: (id) => ({
          url: `/cftinfo/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["deletecftinfo"],
        transformResponse: (response, meta) => ({
          data: response,
          status: meta.response.status
        })
      
      }),
  }),
  
});

export const{useGetAllCFTInfosQuery,useInsertCFTInfoMutation,useGetSingleCFTInfoQuery,useUpdateCFTInfoMutation,useUpdateCFTInfoStatusMutation,useDeleteCFTInfoMutation}=cftInfosApi