import { api } from "../../api/apiSlice";

const userollApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addNewUserRoll: builder.mutation({
          query: (payload) => ({
            url: "/create-user-roll",
            method: "POST",
            body: payload,
          }),
        }),
        }),
})
export const {useAddNewUserRollMutation}=userollApi