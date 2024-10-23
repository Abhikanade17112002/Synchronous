import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    state: "idle",
    authenticated:false 
} ;

export const handleUserSignInAction = createAsyncThunk("/auth/signin",async (formData) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/signin`,formData,{
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

export const handleUserSignUpAction = createAsyncThunk("/auth/signup",async (formData) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/signup`,formData,{
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

export const handleUserSignOutAction = createAsyncThunk("/auth/signout",async (formData) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/update`,formData,{
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


export const handleUserUpdateProfileAction = createAsyncThunk("/auth/profile/update",async (formData) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/profile/update`,formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials:true 
          }) ;


          return response.data ;
    
    } catch (error) {
        return error ;
    }
}) ;

export const handleRemoveUserProfileImageAction = createAsyncThunk("/auth/profile/update/delete",async (formData) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/profile/update/remove`,formData,{
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

export const getUserInfoAction = createAsyncThunk("/auth/getinfo",async()=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}/auth/getinfo`,{
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials:true 
          }) ;


          return response.data ;
    
    } catch (error) {
        return error ;
    }
})
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(handleUserSignInAction.pending, (state,action) => {
            state.state = "loading";
            })
        .addCase(handleUserSignInAction.fulfilled , (state,action)=>{
            state.state = action.payload.status ? "sucess" : "idle" ;
            state.user = action.payload.status ? action.payload.user : null ;
            state.authenticated = action.payload.status;

        })
        .addCase(handleUserSignInAction.rejected,(state,action)=>{
            state.user = null ;
            state.authenticated = false ;
            state.state = "idle"
        })
        .addCase(handleUserSignUpAction.pending, (state,action) => {
            state.state = "loading";
            })
        .addCase(handleUserSignUpAction.fulfilled , (state,action)=>{
            console.log('====================================');
            console.log(action,"action");
            console.log('====================================');
            state.state = action.payload.status ? "sucess" : "idle" ;
            state.user = action.payload.status ? action.payload.user : null ;
            state.authenticated = action.payload.status;

        })
        .addCase(handleUserSignUpAction.rejected,(state,action)=>{
            state.user = null ;
            state.authenticated = false ;
            state.state = "idle"
        })
        .addCase(getUserInfoAction.pending, (state,action) => {
            state.state = "loading";
        })
        .addCase(getUserInfoAction.fulfilled , (state,action)=>{
            console.log('====================================');
            console.log(action,"action");
            console.log('====================================');
            state.state = action.payload.status ? "sucess" : "idle" ;
            state.user = action.payload.status ? action.payload.user : null ;
            state.authenticated = action.payload.status;

        })
        .addCase(getUserInfoAction.rejected,(state,action)=>{
            state.user = null ;
            state.authenticated = false ;
            state.state = "idle"
        })
        .addCase(handleUserUpdateProfileAction.pending, (state,action) => {
            state.state = "loading";
        })
        .addCase(handleUserUpdateProfileAction.fulfilled , (state,action)=>{
            console.log('====================================');
            console.log(action,"action");
            console.log('====================================');
            state.state = action.payload.status ? "sucess" : "idle" ;
            state.user = action.payload.status ? action.payload.user : null ;
            state.authenticated = action.payload.status;

        })
        .addCase(handleUserUpdateProfileAction.rejected,(state,action)=>{
            state.user = null ;
            state.authenticated = false ;
            state.state = "idle"
        })
        .addCase(handleRemoveUserProfileImageAction.pending, (state,action) => {
            state.state = "loading";
        })
        .addCase(handleRemoveUserProfileImageAction.fulfilled , (state,action)=>{
            console.log('====================================');
            console.log(action,"action");
            console.log('====================================');
            state.state = action.payload.status ? "sucess" : "idle" ;
            state.user = action.payload.status ? action.payload.user : null ;
            state.authenticated = action.payload.status;

        })
        .addCase(handleRemoveUserProfileImageAction.rejected,(state,action)=>{
            state.user = null ;
            state.authenticated = false ;
            state.state = "idle"
        })


    }
})

export const getUser = (state)=>state.user.user ;
export const {} = userSlice.actions ;
export default userSlice.reducer ;  