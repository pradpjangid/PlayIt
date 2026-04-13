import { apiSlice } from "./apiSlice";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: (params?: { page?: number; limit?: number; query?: string; sortBy?: string; sortType?: string; userId?: string }) => ({
        url: "/videos",
        params,
      }),
      providesTags: ["Videos"],
    }),
    getVideoById: builder.query({
      query: (videoId: string) => `/videos/${videoId}`,
      providesTags: (_result, _error, videoId) => [{ type: "Video", id: videoId }],
    }),
    publishVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    updateVideo: builder.mutation({
      query: ({ videoId, data }: { videoId: string; data: FormData }) => ({
        url: `/videos/${videoId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Videos", "Video"],
    }),
    deleteVideo: builder.mutation({
      query: (videoId: string) => ({
        url: `/videos/${videoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
    togglePublishStatus: builder.mutation({
      query: (videoId: string) => ({
        url: `/videos/toggle/publish/${videoId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Videos", "Video"],
    }),
  }),
});

export const {
  useGetAllVideosQuery,
  useGetVideoByIdQuery,
  usePublishVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useTogglePublishStatusMutation,
} = videoApi;
