import dayjs from "dayjs"
import { convertDurationStringToDayJs } from "../../../services/DateConversions"

export const actualDuration = (timePlay, timeWorked) => {
    var user_timezone = dayjs.tz.guess()
    const currentTime = dayjs().tz(user_timezone)
    const timePlayed = dayjs.tz(timePlay, user_timezone)
    var duration_elispesed = dayjs.duration(currentTime.diff(timePlayed), 'milliseconds')
    const actualDuration = duration_elispesed.add(convertDurationStringToDayJs(timeWorked));
    return actualDuration;
}