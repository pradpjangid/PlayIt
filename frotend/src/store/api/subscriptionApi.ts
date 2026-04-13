import { apiSlice } from "./apiSlice";

export const subscriptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    toggleSubscription: builder.mutation({
      query: (channelId: string) => ({
        url: `/subscriptions/c/${channelId}`,
        method: "POST",
      }),
      invalidatesTags: ["Subscriptions", "User"],
    }),
    getSubscribedChannels: builder.query({
      query: (channelId: string) => `/subscriptions/c/${channelId}`,
      providesTags: ["Subscriptions"],
    }),
    getUserChannelSubscribers: builder.query({
      query: (subscriberId: string) => `/subscriptions/u/${subscriberId}`,
      providesTags: ["Subscriptions"],
    }),
  }),
});

export const {
  useToggleSubscriptionMutation,
  useGetSubscribedChannelsQuery,
  useGetUserChannelSubscribersQuery,
} = subscriptionApi;
