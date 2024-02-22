import { api } from "../../api/apiSlice";

const menuApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: () => "/menuitems",
    }),
  }),
});

export const { useGetAllMenuItemsQuery } = menuApi;
