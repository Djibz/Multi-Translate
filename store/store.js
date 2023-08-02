import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token-context";
import languagesReducer from "./languages-context";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    languages: languagesReducer,
  },
});
