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
      invalidatesTags: ["createmenu,createchildmenu"],
    }),
    updateMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/update/menu",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["createmenu,createchildmenu"],
    }),
    updateNestedMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/updatenesteditems/menu",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["createmenu,createchildmenu"],
    }),
    updateSingleMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/updatesingle-menu",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["createmenu,createchildmenu"],
    }),
    updateSingleProtionMenu: builder.mutation({
      query: (payload) => ({
        url: `/menuitems/singlemenu/singleupdate/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["createmenu,createchildmenu"],
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

export const { useGetAllMenuItemsQuery, useCreateMenuMutation,useUpdateMenuMutation,useGetSingleMenuQuery,useGetSingleChangeParentMenuQuery,useUpdateSingleMenuMutation,useUpdateNestedMenuMutation,useUpdateSingleProtionMenuMutation} = menuApi;
