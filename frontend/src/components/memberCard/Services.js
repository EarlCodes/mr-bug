export const calculateTaskPercentage = (totalTask, taskDone) => {
    const percentage = (taskDone/totalTask ) * 100
    return percentage
}