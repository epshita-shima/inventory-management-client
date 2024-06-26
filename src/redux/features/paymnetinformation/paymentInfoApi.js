import { api } from "../../api/apiSlice";

const paymentInfoApi= api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaymentInformation: builder.query({
        query: () => "/paymentinfo",
        providesTags: ["insertpaymentinfo"],
        refetchOnReconnect: true,
        refetchOnFocus: true,
      }),
      
    insertPaymentInformation: builder.mutation({
      query: (payload) => ({
        url: "/paymentinfo",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["insertpaymentinfo"],
      transformResponse: (response, meta) => ({
        data: response,
        status: meta.response.status,
      }),
    }),
  }),
});

export const {useGetAllPaymentInformationQuery,useInsertPaymentInformationMutation}=paymentInfoApi;