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
    updateSingleMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/updatesingle-menu",
        method: "PUT",
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
    getSingleChangeParentMenu: builder.query({
      query: (id) => {
        console.log(id)
        if (id) {
          return `/menuitems/singlemenu/changingparent/${id}`;
        } else {
          throw new Error("User id is required");
        }
      },
    }),

  }),
});

export const { useGetAllMenuItemsQuery, useCreateMenuMutation,useUpdateMenuMutation,useGetSingleMenuQuery,useGetSingleChangeParentMenuQuery,useUpdateSingleMenuMutation} = menuApi;
