import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    selectedChatType:null,
    selectedChatData:null,
    selectedChatMessages:[],
    state: "idle",
  
} ;




const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectChatType(state, action) {
            console.log('====================================');
            console.log(action);
            console.log('====================================');
            state.selectedChatType = action.payload
        },
        setSelectChatData(state, action) {
            console.log('====================================');
            console.log(action);
            console.log('====================================');
            state.selectedChatData = action.payload

        },
        setChatClose(state,action) {
            console.log('====================================');
            console.log(action);
            console.log('====================================');
            state.selectedChatType = null;
            state.selectedChatData = null;
            state.selectedChatMessages= [];
        },
        setSelectedChatMessages(state,action){
            console.log('====================================');
            console.log(action);
            console.log('====================================');
            state.selectedChatMessages = action.payload; 
        }
    },
    
})

export const getChat = (state)=>state.chat.selectedChatData ;
export const {setChatClose,setSelectChatData,setSelectedChatMessages,setSelectChatType} = chatSlice.actions ;
export default chatSlice.reducer ;  