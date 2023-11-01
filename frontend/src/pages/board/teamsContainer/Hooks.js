import { useState } from "react"

export const useTeams = () => {
    const [teams, setTeams] = useState([])
    const [selectedTeam,setSelectedTeam]=useState({})

    const setTeamsList = (team_list) => {
        let list = []

        team_list.map((team) => {
            list.push({
                team: team,
                isActive: false
            })
        })
        setTeams(list)
    }

    const activateTeam = (team_arg) => {
        let temp_list = []

        setTeams((prevState) => (
            prevState.map((team) => {
                if (team.team.id === team_arg.id) {
                    return {
                        team: team_arg,
                        isActive: true
                    }
                } else {
                    return {
                        team: team.team,
                        isActive: false
                    }
                }
            }))
        )
        setSelectedTeam(team_arg)
    }

    return { teams,selectedTeam, setTeamsList, activateTeam }
}

