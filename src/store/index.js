import { configureStore } from "@reduxjs/toolkit";
import networkReducer from "./reducers/networkSlice";
import bitforstReducer from "./reducers/bitforstSlice";
import loaderReducer from "./reducers/loaderSlice";

export default configureStore({
  reducer: {
    network: networkReducer,
    providersInfo: bitforstReducer,
    loader: loaderReducer,
  },
});
