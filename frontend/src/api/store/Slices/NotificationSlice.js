import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "count": 0,
    "next": null,
    "previous": null,
    "results": []
}
export const NotificationSlice = createSlice({
    name: "notifications",
    initialState: initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
            state.results = action.payload.results
        }
    }
})

export const {setNotifications} = NotificationSlice.actions;
export default NotificationSlice.reducer;