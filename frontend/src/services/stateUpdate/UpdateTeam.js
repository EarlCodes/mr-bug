import { setProjects } from "../../api/store/Slices/ProjectsSlice"

export const updateTeam = () => {

    const insertTeam = (projects, selectedProjectId, releaseId, team, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project, project_releases: project.project_releases.map((release) => {
                            if (release.id === releaseId) {
                                return {
                                    ...release,
                                    teams_working_on:[...release.teams_working_on,team]
                                }
                            } else {
                                return release
                            }
                        })
                    }
                } else {
                    return project
                }
            })
        }))
    }

    const removeTeam = (projects, selectedProjectId, releaseId, team, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project, project_releases: project.project_releases.map((release) => {
                            if (release.id === releaseId) {
                                return {
                                    ...release,
                                    teams_working_on:release.teams_working_on.filter((current_team)=>{
                                        if(current_team.id !== team.id){
                                            return current_team
                                        }
                                    })
                                }
                            } else {
                                return release
                            }
                        })
                    }
                } else {
                    return project
                }
            })
        }))
    }

    return { insertTeam, removeTeam }
}