import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserCredentials, AuthResponse } from "@models/authTypes";
import errorHandlingMiddleware from "@middleware/errorHandlingMiddleware";

// Create an API slice for authentication-related operations
export const authApi = createApi({
  reducerPath: "authApi", // Unique key for the slice in the Redux store
  baseQuery: errorHandlingMiddleware(process.env.REACT_APP_API_URL), // Base URL for API requests with error handling middleware
  endpoints: (builder) => ({
    // login mutation
    login: builder.mutation<AuthResponse, UserCredentials>({
      query: (credentials) => ({
        url: "/api/auth/login", // Endpoint for login
        method: "POST",
        body: credentials, // Send user credentials as the request body
      }),
    }),
    // signup mutation
    signup: builder.mutation<AuthResponse, UserCredentials>({
      query: (credentials) => ({
        url: "/api/auth/register", // Endpoint for signup
        method: "POST",
        body: credentials, // Send user credentials as the request body
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
