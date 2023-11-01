import { useState } from "react"

export const useDrawer = () => {
    const INNITIAL_STATE = {
        project: {
            isSelected: false
        },
        tasks: {
            isSelected: false
        },
        backlog: {
            isSelected: false
        },
        board: {
            isSelected: false
        },
        team: {
            isSelected: false
        },
        stats: {
            isSelected: false
        },
        setting: {
            isSelected: false
        }
    }
    const [drawer, setDrawer] = useState(INNITIAL_STATE)

    const setDrawerFieldSelected = (field) => {
        setDrawer((prevState) => ({
            ...INNITIAL_STATE,
            [field]: {
                isSelected: true
            }
        }))
    }

    return { drawer, setDrawerFieldSelected }
} 