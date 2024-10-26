import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    contacts: [],
    state: "idle",
  
} ;

export const handleGetContactsAction = createAsyncThunk("/contact/signin",async (searchterm) =>{
    console.log('====================================');
    console.log(searchterm,"SEARCHTERM");
    console.log('====================================');
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/contacts/search`,{searchterm},{
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials:true 
          }) ;


          return response.data ;
    } catch (error) {
        return error ;
    }
}) ;


const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(handleGetContactsAction.pending, (state,action) => {
            state.state = "loading";
            })
        .addCase(handleGetContactsAction.fulfilled , (state,action)=>{
            state.state = action.payload.status ? "sucess" : "idle" ;
            state.contacts = action.payload.status ? action.payload.contacts : null ;
           

        })
        .addCase(handleGetContactsAction.rejected,(state,action)=>{
            state.contacts = [] ;
            
            state.state = "idle"
        })
        

    }
})

export const getContacts = (state)=>state.contact.contacts ;
export const {} = contactSlice.actions ;
export default contactSlice.reducer ;  