import React from 'react'
import { format, isToday, isYesterday } from 'date-fns'

/**
 * gonna format the time and also include when today
 * @param {time} string
 */
const formatTime = (time: string) => {
    const date = new Date(time);
    if(isToday(date)) {
        return `Today at ${format(date, 'HH:mm')}`
    } else if(isYesterday(date)) {
        return `Yesterday at ${format(date, 'HH:mm')}`
    }

    return format(date, 'MM-dd HH:mm')
}

export default formatTime