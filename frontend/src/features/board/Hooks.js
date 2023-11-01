import { useState } from "react"

export const useBacklogTasks = () => {
    const [backlogs, setBacklogs] = useState([])

    const setDefaultBacklogs = (selectedRelease) => {
        setBacklogs((prevState) => 
            selectedRelease.release_backlogs.map((backlog) => {
                return {backlog:backlog,tasks:sortTasks(backlog.backlog_tasks)}
            })
        )
    }

    const sortTasks = (tasks) => {
        let sorted_task = {
            todo: [],
            working_on: [],
            done: []
        }
        const addProgressItem = (item) => {
            const addItem = (list, item) => {
                const temp_list = [...sorted_task[list], item]
                sorted_task = {
                    ...sorted_task,
                    [list]: temp_list
                }
            }

            switch (item.progress) {
                case "TODO": addItem('todo', item)
                    break;
                case "IN_PROGRESS": addItem('working_on', item)
                    break;
                case "DONE": addItem('done', item)
            }
        }
        tasks.map((task) => {
            addProgressItem(task)
        })

        return sorted_task
    }

    return {backlogs,setDefaultBacklogs,sortTasks}
}