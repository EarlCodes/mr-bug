import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "count": 0,
    "next": null,
    "previous": null,
    "results":[]
}

export const ProjectSlice = createSlice({
    name:'projects',
    initialState,
    reducers :{
        setProjects : (state,action)=>{
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
            state.results = action.payload.results
            
        },
    }
});

export const {setProjects} = ProjectSlice.actions;
export default ProjectSlice.reducer;

