// src/store/apiService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '../config/env.config';

export const creatorApi = createApi({
  reducerPath: 'creatorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl
  }),

  // 1. TagTypes: These are unique "labels" we give to our data.
  tagTypes: ['User'],

  endpoints: (builder) => ({
    // CREATE: Signup
    signupUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      // 2. Invalidation: "If I signup a user, the old list of users is now out of date."
      invalidatesTags: ['User'],
    }),

    // READ: Get All Users (with pagination support)
    getUsers: builder.query<any[], { page: number; limit: number; search?: string }>({
      // MockAPI URL pattern: /users?page=1&limit=5&search=nitesh
      query: ({ page, limit, search }) => {
        let url = `/users?page=${page}&limit=${limit}`;
        if (search) url += `&search=${search}`;
        return url;
      },
      providesTags: ['User'],
    }),

    // DELETE: Remove User
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      // 4. Invalidation: "Once deleted, refresh the UI list automatically."
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation
} = creatorApi;