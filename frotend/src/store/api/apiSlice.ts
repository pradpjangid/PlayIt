import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "/api/v1";   // ← Changed to relative path so Vite proxy handles it

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Videos",
    "Video",
    "Comments",
    "Tweets",
    "Playlists",
    "Subscriptions",
    "Likes",
    "Dashboard",
  ],
  endpoints: () => ({}),
});