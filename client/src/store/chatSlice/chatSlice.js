
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  selectedChatType: null,
  selectedChatData: null,
  selectedChatMessages: [],
  selectedUserDMList:[],
  selectUserChannelList:[],
  state: "idle",
};

// Fixing the `createAsyncThunk` to accept a single argument object
export const handleFetchAllDMMessages = createAsyncThunk(
  "chat/fetchMessages", // Note: The name should be in "slice/action" format
  async ( reciver ) => {
    console.log("====================================");
    console.log( reciver, "SENDRECIV");
    console.log("====================================");
    try {
      const response = await axios.post(
        `http://localhost:9000/api/messages/get`,
        { reciver },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error; // Propagate error to handle rejection state
    }
  }
);


export const handleUploadChatFile = createAsyncThunk(
  "chat/file", // Note: The name should be in "slice/action" format
  async ( formData ) => {
    console.log("====================================");
    console.log( formData, "UPLOAD FILE");
    console.log("====================================");
    try {
      const response = await axios.post(
        `http://localhost:9000/api/messages/upload`,
         formData ,
        {
          headers: {
            "Content-Type": "multi-part/formdata",
          },
          withCredentials: true,
        }
      );
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error Uploading chat File :: ", error);
      throw error; // Propagate error to handle rejection state
    }
  }
);
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectChatType(state, action) {
      console.log("====================================");
      console.log(action.payload, "SELECT CHAT TYPE");
      console.log("====================================");
      state.selectedChatType = action.payload;
    },
    setSelectChatData(state, action) {
      console.log("====================================");
      console.log(action.payload, "SELECT CHAT DATA");
      console.log("====================================");
      state.selectedChatData = action.payload;
    },
    setChatClose(state, action) {
      console.log("====================================");
      console.log(action);
      console.log("====================================");
      state.selectedChatType = null;
      state.selectedChatData = null;
      state.selectedChatMessages = [];
    },
    setSelectedChatMessages(state, action) {
      console.log("====================================");
      console.log(action);
      console.log("====================================");
      state.selectedChatMessages = action.payload;
    },
    setAddMessage(state, action) {
      console.log("SETMESSAGE", state, action);
      const selectedChatType = state.selectedChatType;
      const newMessage = action.payload.message;
      state.selectedChatMessages.push({
        ...newMessage,
        reciver:
          selectedChatType === "channel"
            ? newMessage.reciver
            : newMessage.reciver._id,

        sender:
          selectedChatType === "channel"
            ? newMessage.sender
            : newMessage.sender._id,
      });
    },
    setSelectedUserDMList(state, action) {
      console.log("====================================");
      console.log(action , action.payload);
      console.log("====================================");
      state.selectedUserDMList= action.payload;
    },
    setSelectedUserChannelList(state, action) {
      console.log("====================================");
      console.log(action);
      console.log("====================================");
      state.selectUserChannelList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchAllDMMessages.pending, (state, action) => {
        state.state = "loading";
      })
      .addCase(handleFetchAllDMMessages.fulfilled, (state, action) => {
        state.state = action.payload.status ? "success" : "idle";
        state.selectedChatMessages = action.payload.status
          ? action.payload.messages
          : [];
      })
      .addCase(handleFetchAllDMMessages.rejected, (state, action) => {
        state.selectedChatMessages = [];
        state.state = "idle";
      })
      
  },
});

export const getChat = (state) => state.chat.selectedChatData;
export const {
  setChatClose,
  setSelectChatData,
  setSelectedChatMessages,
  setSelectChatType,
  setAddMessage,
  setSelectedUserChannelList,
  setSelectedUserDMList
} = chatSlice.actions;
export default chatSlice.reducer;
