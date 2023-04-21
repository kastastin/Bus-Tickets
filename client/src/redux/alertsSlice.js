import { createSlice } from "@reduxjs/toolkit";

const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    DisplayLoader: (state, action) => {
      state.loading = true;
    },
    HideLoader: (state, action) => {
      state.loading = false;
    },
  },
});

export const { DisplayLoader, HideLoader } = alertsSlice.actions;
export default alertsSlice.reducer;
