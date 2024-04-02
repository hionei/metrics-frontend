import { createSlice } from "@reduxjs/toolkit";

export const networkSlice = createSlice({
  name: "network",
  initialState: {
    value: 1,
    symbol: "SGB",
  },
  reducers: {
    changeNetwork: (state, action) => {
      state.value = action.payload;
      if (action.payload == 1) state.symbol = "SGB";
      if (action.payload == 2) state.symbol = "FLR";
    },
  },
});

export const { changeNetwork } = networkSlice.actions;

export default networkSlice.reducer;
