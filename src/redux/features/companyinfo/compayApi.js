import { api } from "../../api/apiSlice";

const companyApi = api.injectEndpoints({
    endpoints: (builder) => ({
      getCompanyInfo: builder.query({
        query: () => "/reportdata/getdata/company",
      }),
    }),
  });
 
  export const {useGetCompanyInfoQuery}=companyApi