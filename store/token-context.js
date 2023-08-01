import { createSlice, configureStore } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
  },
  reducers: {
    set: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { set } = tokenSlice.actions;

export const store = configureStore({
  reducer: tokenSlice.reducer,
});

// Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented());
// // {value: 1}
// store.dispatch(incremented());
// // {value: 2}
// store.dispatch(decremented());
// {value: 1}
