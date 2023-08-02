import { createSlice } from "@reduxjs/toolkit";

const languagesSlice = createSlice({
  name: "languages",
  initialState: {
    languages: [],
  },
  reducers: {
    setLanguages: (state, action) => {
      state.languages = action.payload;
      state.languages.forEach((lang) => {
        lang.activated = false;
      });
    },
    activateLanguage: (state, action) => {
      state.languages[action.payload].activated = true;
    },
  },
});

export const { setLanguages, activateLanguage } = languagesSlice.actions;

export default languagesSlice.reducer;
