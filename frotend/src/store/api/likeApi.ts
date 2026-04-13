import { apiSlice } from "./apiSlice";

export const likeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    toggleVideoLike: builder.mutation({
      query: (videoId: string) => ({
        url: `/likes/toggle/v/${videoId}`,
        method: "POST",
      }),
      invalidatesTags: ["Likes", "Video"],
    }),
    toggleCommentLike: builder.mutation({
      query: (commentId: string) => ({
        url: `/likes/toggle/c/${commentId}`,
        method: "POST",
      }),
      invalidatesTags: ["Comments"],
    }),
    toggleTweetLike: builder.mutation({
      query: (tweetId: string) => ({
        url: `/likes/toggle/t/${tweetId}`,
        method: "POST",
      }),
      invalidatesTags: ["Tweets"],
    }),
    getLikedVideos: builder.query({
      query: () => "/likes/videos",
      providesTags: ["Likes"],
    }),
  }),
});

export const {
  useToggleVideoLikeMutation,
  useToggleCommentLikeMutation,
  useToggleTweetLikeMutation,
  useGetLikedVideosQuery,
} = likeApi;
