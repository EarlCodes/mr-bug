import dayjs from 'dayjs'

export const convertDurationStringToDayJs = (durationString) => {
    var duration = require('dayjs/plugin/duration')
    dayjs.extend(duration)

    var dayDuration = dayjs.duration()

    if (durationString.length === 8) {
        dayDuration = dayjs.duration({
            seconds: parseInt(durationString.slice(6, 9)),
            minutes: parseInt(durationString.slice(3, 5)),
            hours: parseInt(durationString.slice(0, 2))
        })
    } else {
        const split_duration = durationString.split(" ")
        dayDuration = dayjs.duration({
            seconds: parseInt(split_duration[1].slice(6, 9)),
            minutes: parseInt(split_duration[1].slice(3, 5)),
            hours: parseInt(split_duration[1].slice(0, 2)),
            days: parseInt(split_duration[0])
        })
    }

    return dayDuration;
}