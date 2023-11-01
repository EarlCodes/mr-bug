import { setProjects } from "../../api/store/Slices/ProjectsSlice";

export const getProjectTeams = (project) => {
    const teams_list = []
    project.project_releases.map((release) => {
        teams_list.push(...release.teams_working_on)
    })
    return teams_list;
}

export const getBackLog = (project) => {

    let total = 0
    let completed = 0

    project.project_releases.map((release) => {
        release.release_backlogs.map((backlog) => {
            total++;
            if (backlog.status === "DONE") {
                completed++;
            }
        })
    })
    return { total: total, completed: completed }
}

export const getTasks = (project) => {

    let total = 0
    let completed = 0

    project.project_releases.map((release) => {
        release.release_backlogs.map((backlog) => {
            backlog.backlog_tasks.map((task) => {
                total++;
                if (task.progress === "DONE") {
                    completed++;
                }
            })

        })
    })
    return { total: total, completed: completed }
}

export const getBugs = (project) => {

    let total = 0
    let completed = 0

    project.project_releases.map((release) => {
        release.release_bugs.map((bug) => {
            total++;
            if (bug.status === "RESOLVED") {
                completed++;
            }
        })
    })
    return { total: total, completed: completed }
}

export const handleUpdateProjectRequirement = (projects, updateProject, requirement, dispatch) => {
    dispatch(setProjects({
        ...projects,
        results: projects.results.map((project) => {
            if (project.id === updateProject.id) {
                var requirement_list = []
                project.project_requirements.map((current_requirement) => {
                    if (current_requirement.id === requirement.id) {
                        requirement_list.push(requirement)
                    } else {
                        requirement_list.push(current_requirement)
                    }
                })
                return {
                    ...project,
                    project_requirements: requirement_list
                }
            } else {
                return project
            }
        })
    }))
}
