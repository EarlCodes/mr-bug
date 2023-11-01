import dayjs, { Dayjs } from 'dayjs';
import { useState } from "react"
import { convertDurationStringToDayJs } from "../services/DateConversions";

export const useTimer = () => {
    const [time, setTime] = useState('00:00:00')
    const [intervalValue, setIntervalValue] = useState();

    const handleTaskPause = () => {
        clearInterval(intervalValue)
        setIntervalValue()
    }

    const handlePlayTask = () => {
        var duration = require('dayjs/plugin/duration')
        dayjs.extend(duration)

        const intervalMethod = (time_) => {
            setTime((prevState)=> convertDurationStringToDayJs(prevState).add(1, 'seconds').format('DD HH:mm:ss'))
        }

        if (!intervalValue) {
            setIntervalValue(setInterval(intervalMethod, 1000,time))
        }
    }

    return {time,setTime,handleTaskPause,handlePlayTask}
}