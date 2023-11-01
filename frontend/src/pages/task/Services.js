import { createContext } from "react"

export const getTasks = (projects, user) => {
    let tasks = []

    const getAllTasks = (projects) => {
        const allTasks = []
        projects.map((project) => {
            project.project_releases.map((release) => {
                release.release_backlogs.map((backlog) => {
                    backlog.backlog_tasks.map((task) => {
                        allTasks.push({
                            ...task, project: {
                                tittle: project.tittle,
                                id: project.id
                            }
                        })
                    })
                })
            })
        })
        return allTasks;
    }

    const isTaskAssigned = (userId, taskAssignedId) => {
        let isTaskAssigned = false
        if (userId === taskAssignedId) {
            isTaskAssigned = true
        }
        return isTaskAssigned
    }
    getAllTasks(projects).map((task) => {
        if (isTaskAssigned(user.id, task.assigned_details.user.id)) {
            tasks.push(task)
        }
    })
    return tasks;
}

export const TaskSnackBarContext = createContext();