import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../apis/authSlice";
import { loginAPI } from "../apis/loginAPI";
const store = configureStore({
  reducer: {
    auth: authSlice,
    [loginAPI.reducerPath]: loginAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(loginAPI.middleware),
});

export default store;
