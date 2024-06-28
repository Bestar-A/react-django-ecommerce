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
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: USERS_URL + "/register",
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        }),
        getProfile: builder.query({
            query: (data) => ({
                url: USERS_URL + "/profile",
                headers: {
                    Authorization: `Bearer ${data.access}`
                }
            }),
            providesTags: ['Users']
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: USERS_URL + '/profile/update',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${data.access}`
                },
                body: data
            }),
            invalidatesTags: ["Users"]
        })
    })
})

export const { useLoginUserMutation, useGetUsersQuery, useRegisterUserMutation,
    useGetProfileQuery, useUpdateProfileMutation
 } = usersSlice