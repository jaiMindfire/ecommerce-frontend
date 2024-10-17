import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";
import { store } from "@store/index";
import LoadingSpinner from "@components/LoadingSpinner";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <Suspense fallback={<div><LoadingSpinner/></div>}>
      <RouterProvider router={routes} />
    </Suspense>
  </Provider>
);
