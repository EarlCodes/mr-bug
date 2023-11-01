import { useState } from "react"

export const useButtonList = () => {
    const [buttonsList, setButtonsList] = useState([])

    const setDefaultButtonList = (projects) => {
        let button_list = []

        projects.results.map((project) => {
            button_list.push({
                project: project,
                isSelected: false
            })
        })

        setButtonsList(button_list)
    }

    const setProjectSelected = (project) => {
        setButtonsList((prevState) => 
            prevState.map((button) => {
                if (button.project.id === project.id) {
                    return { project: project, isSelected: true }
                } else {
                    return { project: button.project, isSelected: false }
                }
            })
        )
    }

    return { buttonsList, setDefaultButtonList, setProjectSelected }
}