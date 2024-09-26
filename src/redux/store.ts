import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/products/productsApi";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
// import cartReducer from "../features/cart/cartSlice";
// import { cartApi } from "../features/cart/cartApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    // cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    // [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      authApi.middleware,
      // cartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
