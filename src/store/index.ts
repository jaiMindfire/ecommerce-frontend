import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import productsReducer from "./redux/productsSlice";
import cartReducer from "./redux/cartSlice";
import themeReducer from "@store/redux/themeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      products: productsReducer,
      cart: cartReducer,
      theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        // authApi.middleware,
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
