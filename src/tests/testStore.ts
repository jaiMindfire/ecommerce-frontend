import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@store/redux/authSlice";
import productsReducer from "@store/redux/productsSlice";
import cartReducer from "@store/redux/cartSlice";

export const testStore = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
    ),
});

export type RootState = ReturnType<typeof testStore.getState>;
export type AppDispatch = typeof testStore.dispatch;
