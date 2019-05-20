export const getDateParts = (date: Date) => {
  return date ? {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  } : null;
}

export const getDateFromParts = (date) => {
  return date ? new Date(Date.UTC(date.year, date.month - 1, date.day)) : null;
}
