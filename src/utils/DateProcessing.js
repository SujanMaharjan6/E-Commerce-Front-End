import React from 'react'
import moment from 'moment'
export const DateFormat = (date, format = 'ddd YYYY/MM/DD') =>{
    if(!date)
    {
        return
    }
    return moment(date).format(format);
}
