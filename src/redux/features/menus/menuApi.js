import { api } from "../../api/apiSlice";

const menuApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: () => "/menuitems",
      providesTags: ["getallmenu", "getallchildmenu", "deletemenu",],
      refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnTags: ["getallmenu", "getallchildmenu"],
    }),
    createMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/create/menu",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          dispatch(api.util.invalidateTags(["getallmenu", "getallchildmenu"]));
          await dispatch(api.endpoints.getAllMenuItems.initiate());
        } catch {}
      },
      invalidatesTags: ["getallmenu"],
    }),
    updateMenu: builder.mutation({
      query: (payload) => (
        {
        url: "/menuitems/update/menu",
        method: "POST",
        body: payload,
      }
    ),

      invalidatesTags: ["getallchildmenu"],
    }),
    updateNestedMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/updatenesteditems/menu",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getallmenu,getallchildmenu"],
    }),
    updateSingleMenu: builder.mutation({
      query: (payload) => ({
        url: "/menuitems/updatesingle-menu",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["getallmenu,getallchildmenu"],
    }),
    updateSingleProtionMenu: builder.mutation({
      query: (payload) => ({
        url: `/menuitems/singlemenu/singleupdate/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          dispatch(api.util.invalidateTags(["getallmenu", "getallchildmenu"]));
          await dispatch(api.endpoints.getAllMenuItems.initiate());
        } catch {}
      },
      invalidatesTags: ["getallmenu", "getallchildmenu"],
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
        console.log(id);
        if (id) {
          return `/menuitems/singlemenu/changingparent/${id}`;
        } else {
          throw new Error("User id is required");
        }
      },
    }),
    deleteMenuData: builder.mutation({
      query: (id) => ({
        url: `/menuitems/deletemenu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deletemenu"],
    }),
  }),
});

export const {
  useGetAllMenuItemsQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useGetSingleMenuQuery,
  useGetSingleChangeParentMenuQuery,
  useUpdateSingleMenuMutation,
  useUpdateNestedMenuMutation,
  useUpdateSingleProtionMenuMutation,
  useDeleteMenuDataMutation,
} = menuApi;
