import { configureStore } from "@reduxjs/toolkit";
import languagesReducer from "./languages-context";

export const store = configureStore({
  reducer: {
    languages: languagesReducer,
  },
});
