import { api } from "../../api/apiSlice";

const menuApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: () => "/menuitems",
    }),
    insertMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/insert/menu",
        method: "PUT",
        body: payload,
      }),
    })
  }),
});

export const { useGetAllMenuItemsQuery, useInsertMenuMutation} = menuApi;
