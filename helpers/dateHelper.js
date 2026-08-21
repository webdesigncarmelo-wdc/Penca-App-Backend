export function dateHelper(dateString) {
    
    const [day, month, year, hour, minute] = dateString.split(" ")

    const dateUTC = new Date(
        `20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00-03:00`
    )

    return dateUTC
}