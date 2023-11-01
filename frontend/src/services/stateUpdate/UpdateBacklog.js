import { setProjects } from "../../api/store/Slices/ProjectsSlice"

export const updateBacklog = () => {
    const insertBacklog = (projects, selectedProjectId, backlog, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project, project_releases: project.project_releases.map((release) => {
                            if (release.id === backlog.release) {
                                return {
                                    ...release,
                                    release_backlogs: [...release.release_backlogs, backlog]
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

    const modifyBacklog = (projects, selectedProjectId, backlog, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project, project_releases: project.project_releases.map((release) => {
                            if (release.id === backlog.release) {
                                return {
                                    ...release,
                                    release_backlogs: release.release_backlogs.map((current_backlog)=>{
                                        if(current_backlog.id === backlog.id){
                                            return backlog
                                        }else{
                                            return current_backlog
                                        }
                                    }), 
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

    const removeBacklog = (projects, selectedProjectId, backlog, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project, project_releases: project.project_releases.map((release) => {
                            if (release.id === backlog.release) {
                                return {
                                    ...release,
                                    release_backlogs: release.release_backlogs.filter((current_backlog) => {
                                        if (current_backlog.id !== backlog.id) {
                                            return backlog
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

    return { insertBacklog ,removeBacklog,modifyBacklog}
}