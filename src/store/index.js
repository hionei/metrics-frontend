import { configureStore } from "@reduxjs/toolkit";
import networkReducer from "./reducers/networkSlice";

export default configureStore({
  reducer: {
    network: networkReducer,
  },
});
