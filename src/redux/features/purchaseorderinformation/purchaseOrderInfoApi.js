import { api } from "../../api/apiSlice";

const purchaseOrderInfoApi= api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPurchaseOrderInformation: builder.query({
        query: () => "/purchaseorderinfo",
        providesTags: ["insertpurchaseorderinfo"],
        refetchOnReconnect: true,
        refetchOnFocus: true,
      }),
      
    insertPurchaseOrderInformation: builder.mutation({
      query: (payload) => ({
        url: "/purchaseorderinfo",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["insertpurchaseorderinfo"],
      transformResponse: (response, meta) => ({
        data: response,
        status: meta.response.status,
      }),
    }),
  }),
});

export const {useGetAllPurchaseOrderInformationQuery,useInsertPurchaseOrderInformationMutation}=purchaseOrderInfoApi