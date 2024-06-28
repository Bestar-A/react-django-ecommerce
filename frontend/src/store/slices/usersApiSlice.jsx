import { USERS_URL } from "../urls";
import { apiSlice } from "./apiSlice";

export const usersSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
        loginUser: builder.mutation({
            query:(data) => ({
                url: USERS_URL + "/login",
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const { useLoginUserMutation, useGetUsersQuery } = usersSlice