import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  }
}) ;
export default store;  //export the store to use it in other files