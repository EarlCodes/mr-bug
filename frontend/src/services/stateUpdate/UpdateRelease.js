import { setProjects } from "../../api/store/Slices/ProjectsSlice"

export const updateRelease = () => {

    const insertRelease = (projects, selectedProjectId, release, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return { ...project, project_releases: [...project.project_releases, release] }
                } else {
                    return project
                }
            })
        }))
    }

    const removeRelease = (projects, selectedProjectId, release, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project, project_releases: project.project_releases.filter((current_release) => {
                            if (release.id !== current_release.id) {
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

    return { insertRelease, removeRelease }
}