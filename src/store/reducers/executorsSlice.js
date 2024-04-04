import { createSlice } from "@reduxjs/toolkit";

export const executorsSlice = createSlice({
  name: "executersInfo",
  initialState: {
    data: [],
  },
  reducers: {
    setExecutorsInfo: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setExecutorsInfo } = executorsSlice.actions;

export default executorsSlice.reducer;
