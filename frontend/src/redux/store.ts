import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./slice/LoaderSlice";

export const store = configureStore({
  reducer: { loader: loaderSlice },
});

export type RootState = ReturnType<typeof store.getState>;
