import { apiSlice } from "./apiSlice";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideoComments: builder.query({
      query: ({ videoId, page = 1, limit = 10 }: { videoId: string; page?: number; limit?: number }) => ({
        url: `/comments/${videoId}`,
        params: { page, limit },
      }),
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: ({ videoId, content }: { videoId: string; content: string }) => ({
        url: `/comments/${videoId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, content }: { commentId: string; content: string }) => ({
        url: `/comments/c/${commentId}`,
        method: "PATCH",
        body: { content },
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: (commentId: string) => ({
        url: `/comments/c/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetVideoCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
