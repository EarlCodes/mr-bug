import { useState } from "react"

export const useTasks = () => {
    const INNITIAL_STATE = {
        not_started: [],
        working_on: [],
        done: []
    }


    const [tasks, setTasks] = useState(INNITIAL_STATE)

    const addTask = (task, status) => {
        setTasks((prevState) => ({
            ...prevState,
            [status]:[...prevState[status],task]
        }))
    }

    const sortTasks = (tasks_arg) => {
        tasks_arg.map((task) => {
            switch (task.progress) {
                case 'TODO': addTask(task,"not_started")
                break;
                case 'IN_PROGRESS':addTask(task,"working_on")
                break;
                case 'DONE':addTask(task,"done")
            }
        })
    }

    const clearTasks = () =>{
        setTasks(INNITIAL_STATE)
    }

    return { tasks, sortTasks,clearTasks}
}