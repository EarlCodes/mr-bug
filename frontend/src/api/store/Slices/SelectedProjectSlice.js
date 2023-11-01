import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project: '',
    id: 0,
    date_created: "",
    due_date: "",
    tittle: "",
    description: "",
    progress: 0,
    project_owner: {
        user_profile: {
            avatar: "UserAvatar1",
            bgcolor: "#374e00"
        }
    },
    project_requirements:[],
    project_releases: []
}

const SelectedProjectSlice = createSlice({
    name: 'selectedProject',
    initialState: initialState,
    reducers: {
        setSelectedProject: (state, action) => {
            state.project = action.payload.project
                state.id = action.payload.id
                state.date_created = action.payload.date_created
                state.due_date = action.payload.due_date
                state.tittle = action.payload.tittle
                state.description = action.payload.description
                state.progress = action.payload.progress
                state.project_owner = action.payload.project_owner
                state.project_requirements = action.payload.project_requirements
                state.project_releases = action.payload.project_releases
        },
    },
})

export const { setSelectedProject } = SelectedProjectSlice.actions;
export default SelectedProjectSlice.reducer;