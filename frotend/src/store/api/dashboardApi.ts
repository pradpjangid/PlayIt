import { apiSlice } from "./apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannelStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),
    getChannelVideos: builder.query({
      query: () => "/dashboard/videos",
      providesTags: ["Dashboard", "Videos"],
    }),
  }),
});

export const {
  useGetChannelStatsQuery,
  useGetChannelVideosQuery,
} = dashboardApi;
