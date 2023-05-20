import { createSlice } from "@reduxjs/toolkit";

const loadersSlice = createSlice({
  name: "loaders",
  initialState: {
    loading: false,
  },
  reducers: {
    DisplayLoader: (state) => {
      state.loading = true;
    },
    HideLoader: (state) => {
      state.loading = false;
    },
  },
});

export const { DisplayLoader, HideLoader } = loadersSlice.actions;
export default loadersSlice.reducer;
