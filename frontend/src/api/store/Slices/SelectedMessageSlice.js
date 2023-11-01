import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    conversations: [],
    date_created: "",
    id: 0,
    participant_one: {
        id: 0,
        username: "",
        isActive: false,
        email: "",
        first_name: "",
        last_name: "",
        user_profile: {
            avatar: "",
            bgcolor: ""
        }
    },
    participant_two: {
        id: 0,
        username: "",
        isActive: false,
        email: "",
        first_name: "",
        last_name: "",
        user_profile: {
            avatar: "",
            bgcolor: ""
        }
    }
}
export const SelectedMessageSlice = createSlice({
    initialState: INITIAL_STATE,
    name: "SelectedMessage",
    reducers: {
        setSelectedMessage: (state, action) => {
            state.conversations = action.payload.conversations
            state.date_created = action.payload.date_created
            state.id = action.payload.id
            state.participant_one = action.payload.participant_one
            state.participant_two = action.payload.participant_two
        }
    }
})

export const {setSelectedMessage} = SelectedMessageSlice.actions;
export default SelectedMessageSlice.reducer;