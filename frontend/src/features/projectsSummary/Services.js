export const usersProjects = (projects, user) => {
    let totalProjets = 0

    projects.results.map((project) => {
        if (project.project_owner.id === user.id) {
            totalProjets++;
        }
    })

    return totalProjets;
}

export const completedProjects = (projects) => {
    let completedProjets = 0

    projects.results.map((project) => {
        if (project.progress === 100) {
            completedProjets++;
        }
    })

    return completedProjets;
}

export const inProgressProjects = (projects) => {
    let progressProjects = 0

    projects.results.map((project) => {
        if (project.progress < 100) {
            progressProjects++;
        }
    })

    return progressProjects;
}

export const dueProjects = (projects) => {
    const Dayjs = require('dayjs')
    let dueProjects = 0
    projects.results.map((project) => {
        const due_date = Dayjs(new Date(project.due_date))
        if (Dayjs().isAfter(due_date)) {
            dueProjects++;
        }
    })

    return dueProjects;
}

export const getCompletedProjects = (projects) => {
    var completed_projects = 0
    projects.results.map((project) => {
        var projects_tasks = []
        project.project_releases.map((release) => {
            release.release_backlogs.map((backlog) => {
                backlog.backlog_tasks.map((task) => {
                    projects_tasks.push(task)
                })
            })
        })

        var not_started_tasks = 0
        var working_tasks = 0
        var completed_tasks = 0

        projects_tasks.map((task) => {
            if (task.progress === "DONE") {
                completed_tasks++
            }
            if (task.progress === "TIN_PROGRESS") {
                working_tasks++
            }
            if (task.progress === "TODO") {
                not_started_tasks++
            }
        })

        const project_percent = (completed_tasks / projects_tasks.length) * 100
        if (project_percent === 100) {
            completed_projects++
        }
    })
    return completed_projects
}