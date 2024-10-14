import { AuthState, User } from "./../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  cookie: localStorage.getItem("cookie"),
  isAuthenticated: !!localStorage.getItem("cookie"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; cookie: string }>
    ) => {
      state.user = action.payload.user;
      state.cookie = action.payload.cookie;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("cookie", action.payload.cookie);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.cookie = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("cookie");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
