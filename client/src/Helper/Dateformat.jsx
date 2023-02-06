import moment from 'moment'

export const universalDateFormat = (date, format) => {
    if (!date) return null
    return moment(date, format).format('dddd, MMM DD, YYYY') // Monday, Nov 01, 2021
}
