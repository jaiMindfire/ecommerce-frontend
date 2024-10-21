import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "@models/authTypes";

//shape of the authentication state
interface AuthState {
  token: string | null; // JWT token or null if not authenticated
  user: any | null; // User information or null if not authenticated
}

// Initial state for the authentication slice
const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null, // Initialize token from local storage if it exists
  user: null, // Initial user state is null
};

// slice for authentication-related actions and state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user credentials upon successful login -> setting the token and user infor in redux state and localstorage.
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token;
      state.user = action.payload.userName;
      localStorage.setItem("token", action.payload.token);
    },
    // Action to handle user logout -> clear the token, clear user info and remove token from local storage
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions; //actions based on reducers

export default authSlice.reducer; //auth reducer
