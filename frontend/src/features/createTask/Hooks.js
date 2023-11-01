import dayjs from "dayjs"
import { useState } from "react"

export const useTask = () => {
    const TASK_INNITIAL = {
        "tittle": "",
        "backlog_id": 0,
        "description": "",
        "estimations": "00:00:00",
        "time_worked": "00:00:00",
        "progress": "TODO",
        "assigned": 0,
        "time_assigned": dayjs().format('YYYY-MM-DD')
    }

    const [task, setTask] = useState(TASK_INNITIAL)

    const setTaskField = (field, value) => {
        setTask((prevState) => ({
            ...prevState,
            [field]: value
        }))
    }
    const clearTaskField = () => {
        setTask(TASK_INNITIAL)
    }


    return { task, setTaskField, clearTaskField }
}

export const useTaskErrors = () => {
    const TASK_INNITIAL = {
        "tittle": {
            isError: false,
            label: ""
        },
        "backlog_id": 0,
        "description": {
            isError: false,
            label: ""
        },
        "estimations": "00:00:00",
        "time_worked": "00:00:00",
        "progress": "TODO",
        "assigned": 0,

    }

    const [taskErrors, setTaskFieldErrors] = useState(TASK_INNITIAL)

    const setTaskErrors = (field, value) => {
        setTaskFieldErrors((prevState) => ({
            ...prevState,
            [field]: {
                isError: true,
                label: value
            }
        }))
    }

    const clearTaskErrors = (field) => {
        setTaskFieldErrors((prevState) => ({
            ...prevState,
            [field]: {
                isError: false,
                label: ""
            }
        }))
    }

    const checkIsTaskFieldValid = (field, value) => {
        if (value === "") {
            setTaskErrors(field, "This field is required")
        } else {
            clearTaskErrors(field)
        }
    }

    const isTaskValid = () => {
        let isValid = true
        if (isValid) {
            isValid = true
        } else {
            isValid = false
        }
        return isValid
    }

    const isAllFieldsValid = () => {
        var isValid = false
        if (!taskErrors.tittle.isError & !taskErrors.description.isError) {
            isValid = true
        }
        return isValid
    }

    return { taskErrors, checkIsTaskFieldValid, isTaskValid,isAllFieldsValid }
}