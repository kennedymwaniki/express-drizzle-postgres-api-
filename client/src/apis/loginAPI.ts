import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/users/auth/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "login",
        body: user,
        method: "POST",
      }),
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "register",
        body: user,
        method: "POST",
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});
