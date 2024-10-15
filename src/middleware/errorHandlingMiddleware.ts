import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "@store/index";

// Custom base query with error handling
const errorHandlingMiddleware = (
  baseUrl: string | undefined
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  // The base query function which modifies the behavior
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // include authorization token or other headers
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);
    console.log(result, "erorrrrerere");
    // Modify or map status code here
    if (result.error) {
      const { status } = result.error;

      // changin 404 to 500
      if (status === 404) {
        result.error.status = 500; // Map 404 to 500 in the frontend
        result.error.data = "Internal Server Error - Resource not found.";
      }
      
    //   switch (result.error.status) {
    //     case 401:
    //       result.error.data = "Unauthorized - Please log in.";
    //       break;
    //     case 403:
    //       result.error.data = "Forbidden - You do not have access.";
    //       break;
    //     case 500:
    //       result.error.data = "Internal Server Error - Please try again later.";
    //       break;
    //     default:
    //       result.error.data = "An unexpected error occurred.";
    //   }
    }

    return result;
  };
};

export default errorHandlingMiddleware;
