import { api } from "../../../api/apiSlice";

const navbarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNavbar: builder.query({
      query: () => '/navbar',
    }),
  }),
});
export const {useGetNavbarQuery} = navbarApi;
