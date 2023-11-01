import {setSelectedProject} from './../api/store/Slices/SelectedProjectSlice'

export const updateSelectedProject = (projects,currentProject,dispatch) =>{
    projects.results.map((project)=>{
        if(project.id === currentProject.id){
            dispatch(setSelectedProject(project))
        }
    })
}