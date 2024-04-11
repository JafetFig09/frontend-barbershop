import { parse, format } from 'date-fns'
import es from 'date-fns/locale/es'

export function displayDate(date){
    const newDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Date())
    const formattedDate = format(newDate, 'PPPP',{locale:es})
    return formattedDate
}