import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import contactsReducer from "./contactSlice/contactSlice" ;
import chatReducer from "./chatSlice/chatSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    contact:contactsReducer,
    chat:chatReducer
  }
}) ;
export default store;  //export the store to use it in other files