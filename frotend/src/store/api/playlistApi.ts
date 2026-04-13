import { apiSlice } from "./apiSlice";

export const playlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPlaylist: builder.mutation({
      query: (data: { name: string; description: string }) => ({
        url: "/playlists",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Playlists"],
    }),
    getPlaylistById: builder.query({
      query: (playlistId: string) => `/playlists/${playlistId}`,
      providesTags: ["Playlists"],
    }),
    getUserPlaylists: builder.query({
      query: (userId: string) => `/playlists/user/${userId}`,
      providesTags: ["Playlists"],
    }),
    updatePlaylist: builder.mutation({
      query: ({ playlistId, ...data }: { playlistId: string; name: string; description: string }) => ({
        url: `/playlists/${playlistId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Playlists"],
    }),
    deletePlaylist: builder.mutation({
      query: (playlistId: string) => ({
        url: `/playlists/${playlistId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Playlists"],
    }),
    addVideoToPlaylist: builder.mutation({
      query: ({ videoId, playlistId }: { videoId: string; playlistId: string }) => ({
        url: `/playlists/add/${videoId}/${playlistId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Playlists"],
    }),
    removeVideoFromPlaylist: builder.mutation({
      query: ({ videoId, playlistId }: { videoId: string; playlistId: string }) => ({
        url: `/playlists/remove/${videoId}/${playlistId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Playlists"],
    }),
  }),
});

export const {
  useCreatePlaylistMutation,
  useGetPlaylistByIdQuery,
  useGetUserPlaylistsQuery,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
  useAddVideoToPlaylistMutation,
  useRemoveVideoFromPlaylistMutation,
} = playlistApi;
