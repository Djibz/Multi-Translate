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
        lang.activated = lang.activated ?? false;
        lang.favorite = lang.favorite ?? false;
      });
    },
    swicthLanguage: (state, action) => {
      state.languages.forEach((language) => {
        if (language.language === action.payload) {
          language.activated = !language.activated;
        }
      });
    },
  },
});

export const { setLanguages, swicthLanguage } = languagesSlice.actions;

export default languagesSlice.reducer;
