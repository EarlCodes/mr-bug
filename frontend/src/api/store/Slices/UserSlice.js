import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "id": 0,
    "username": "",
    "first_name": "",
    "last_name": "",
    "email": "",
    "role":"",
    "user_profile":{
        "bgcolor":"",
        "avatar":""
    },
    "is_active":false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser : (state,action)=>{
            state.id = action.payload.id
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.email = action.payload.email
            state.role = action.payload.role
            state.user_profile = action.payload.user_profile
            state.is_active = action.payload.is_active
        },
    }
})


export const {setUser} = userSlice.actions;

export default userSlice.reducer;