import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:"",
    expiry:""
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken : (state,action)=>{
            state.token = action.payload.token
            state.expiry = action.payload.expiry
        },
        logout:(state,action)=>{

        }
    },
});

export const {setToken,logout} = tokenSlice.actions;

export default tokenSlice.reducer;