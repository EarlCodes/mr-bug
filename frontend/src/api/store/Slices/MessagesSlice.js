import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        "count": 0,
        "next": null,
        "previous": null,
        "results": [
        ]
}


const MessagesSlice = createSlice({
    name :'messages',
    initialState: initialState,
    reducers :{
        setMessages : (state,action)=>{
            state.count = action.payload.count 
            state.next = action.payload.next
            state.previous =  action.payload.next
            state.results = action.payload.results
        },
    },
})

export const {setMessages} = MessagesSlice.actions;
export default MessagesSlice.reducer;