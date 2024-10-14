import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@services/productsApi";
import { authApi } from "@services/authApi";
import authReducer from "./redux/authSlice";
import productsReducer from "./redux/productsSlice";
import cartReducer from "./redux/cartSlice";
import themeReducer from "@store/redux/themeSlice"
import { cartApi } from "@services/cartApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      authApi.middleware,
      cartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
