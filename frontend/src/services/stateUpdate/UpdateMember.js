import { setProjects } from "../../api/store/Slices/ProjectsSlice"


export const UpdateMember = () => {
    const insertMember = (projects, selectedProjectId, releaseId, teamId, member, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project,
                        project_releases: project.project_releases.map((release) => {
                            if (release.id === releaseId) {
                                return {
                                    ...release,
                                    teams_working_on: release.teams_working_on.map((team) => {
                                        if (team.id === teamId) {
                                            return { ...team, members_team: [...team.members_team, member] }
                                        } else {
                                            return team
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

    const removeMember = (projects, selectedProjectId, releaseId, teamId, member, dispatch) => {
        dispatch(setProjects({
            ...projects,
            results: projects.results.map((project) => {
                if (project.id === selectedProjectId) {
                    return {
                        ...project,
                        project_releases: project.project_releases.map((release) => {
                            if (release.id === releaseId) {
                                return {
                                    ...release,
                                    teams_working_on: release.teams_working_on.map((team) => {
                                        if (team.id === teamId) {
                                            return { ...team, members_team: team.members_team.filter((current_member)=>{
                                                if(member.id !== current_member.id){
                                                    return current_member
                                                }
                                            }),}
                                        } else {
                                            return team
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

    return { insertMember, removeMember }
}