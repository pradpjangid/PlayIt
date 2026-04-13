import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/users/refresh-token",
        method: "POST",
      }),
    }),
    getCurrentUser: builder.query({
      query: () => "/users/current-user",
      providesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password",
        method: "POST",
        body: data,
      }),
    }),
    updateAccount: builder.mutation({
      query: (data) => ({
        url: "/users/update-account",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: "/users/avatar",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateCoverImage: builder.mutation({
      query: (data) => ({
        url: "/users/coverImage",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getChannelProfile: builder.query({
      query: (userName: string) => `/users/c/${userName}`,
      providesTags: ["User", "Subscriptions"],
    }),
    getWatchHistory: builder.query({
      query: () => "/users/watch-history",
      providesTags: ["Videos"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useChangePasswordMutation,
  useUpdateAccountMutation,
  useUpdateAvatarMutation,
  useUpdateCoverImageMutation,
  useGetChannelProfileQuery,
  useGetWatchHistoryQuery,
} = authApi;
