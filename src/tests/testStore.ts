import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@services/productsApi";
import { authApi } from "@services/authApi";
import authReducer from "@store/redux/authSlice";
import productsReducer from "@store/redux/productsSlice";
import cartReducer from "@store/redux/cartSlice";
import { cartApi } from "@services/cartApi";

export const testStore = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
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

export type RootState = ReturnType<typeof testStore.getState>;
export type AppDispatch = typeof testStore.dispatch;
