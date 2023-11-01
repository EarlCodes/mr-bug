import { setProjects } from "../../api/store/Slices/ProjectsSlice"

export const UpdateTask = () => {
    const insertTask = (projects, selectedProjectId, releaseId, backlogId, task, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project, project_releases: project.project_releases.map((release) => {
                            if (release.id === releaseId) {
                                return {
                                    ...release,
                                    release_backlogs: release.release_backlogs.map((backlog) => {
                                        if (backlog.id === backlogId) {
                                            return { ...backlog, backlog_tasks: [...backlog.backlog_tasks, task] }
                                        } else {
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

    const removeTask = (projects, selectedProjectId, backlog, task, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project, project_releases: project.project_releases.map((release) => {
                            if (release.id === backlog.release) {
                                return {
                                    ...release,
                                    release_backlogs: release.release_backlogs.map((currentBacklog) => {
                                        if (currentBacklog.id === backlog.id) {
                                            return {
                                                ...currentBacklog,
                                                backlog_tasks: currentBacklog.backlog_tasks.filter((currentTask) => {
                                                    if(currentTask.id !== task.id) {
                                                        return currentTask
                                                    }
                                                }),
                                            }
                                        } else {
                                            return currentBacklog
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
    return { insertTask, removeTask }
}