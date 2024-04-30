import { api } from "../../api/apiSlice";

const menuApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: () => "/menuitems",
      providesTags: [
        "createmenu",
        "createchildmenu",
      ],
    }),
    createMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/create/menu",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["createmenu"],
    }),
    updateMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/update/menu",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["createchildmenu"],
    }),
    getSingleMenu: builder.query({
      query: (id) => {
        if (id) {
          return `/menuitems/singlemenu/${id}`;
        } else {
          throw new Error("User id is required");
        }
      },
    }),
  }),
});

export const { useGetAllMenuItemsQuery, useCreateMenuMutation,useUpdateMenuMutation,useGetSingleMenuQuery} = menuApi;
