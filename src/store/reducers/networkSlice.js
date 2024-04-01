import { createSlice } from "@reduxjs/toolkit";

export const networkSlice = createSlice({
  name: "network",
  initialState: {
    value: 1,
  },
  reducers: {
    changeNetwork: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeNetwork } = networkSlice.actions;

export default networkSlice.reducer;
