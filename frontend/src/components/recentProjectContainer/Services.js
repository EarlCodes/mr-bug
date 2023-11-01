export const getBackLog = (project) => {

    let total = 0
    let completed = 0

    project.project_releases.map((release) => {
        release.release_backlogs.map((backlog) => {
            var tasks = []
            total++;

            var task_complete = 0
            backlog.backlog_tasks.map((task) => {
                tasks.push(task)
                if (task.progress === 'DONE') {
                    task_complete++
                }
            })

            if (task_complete === tasks.length) {
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

export const getProjectTeamMembers = (project) => {
    let team_members = []
    project.project_releases.map((release) => {
        release.teams_working_on.map((team) => {
            team_members = [...new Set(team_members.concat(team.members_team))]
        })
    })
    return team_members;
}

export const projectProgress = (project) => {
    var project_progress = 0
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


    return project_progress = ((completed_tasks + working_tasks) / projects_tasks.length) * 100
}