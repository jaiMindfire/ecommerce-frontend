import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../types/authTypes";

interface AuthState {
  token: string | null;
  user: any | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      console.log(action.payload,'iuser')
      state.token = action.payload.token;
      state.user = action.payload.userName;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
