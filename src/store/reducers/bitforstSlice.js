import { createSlice } from "@reduxjs/toolkit";

export const bitforstSlice = createSlice({
  name: "network",
  initialState: {
    data: [],
  },
  reducers: {
    setProvidersInfo: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setProvidersInfo } = bitforstSlice.actions;

export default bitforstSlice.reducer;
