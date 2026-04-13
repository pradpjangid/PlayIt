import { apiSlice } from "./apiSlice";

export const tweetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTweet: builder.mutation({
      query: (data: { content: string }) => ({
        url: "/tweets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tweets"],
    }),
    getUserTweets: builder.query({
      query: (userId: string) => `/tweets/user/${userId}`,
      providesTags: ["Tweets"],
    }),
    updateTweet: builder.mutation({
      query: ({ tweetId, content }: { tweetId: string; content: string }) => ({
        url: `/tweets/${tweetId}`,
        method: "PATCH",
        body: { content },
      }),
      invalidatesTags: ["Tweets"],
    }),
    deleteTweet: builder.mutation({
      query: (tweetId: string) => ({
        url: `/tweets/${tweetId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tweets"],
    }),
  }),
});

export const {
  useCreateTweetMutation,
  useGetUserTweetsQuery,
  useUpdateTweetMutation,
  useDeleteTweetMutation,
} = tweetApi;
