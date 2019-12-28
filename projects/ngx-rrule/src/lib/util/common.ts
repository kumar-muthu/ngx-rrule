import * as moment from 'moment';

export const getDateParts = (date: Date) => {
  return date ? {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  } : null;
}

export const getDateFromParts = (date) => {
  return moment.utc(date).startOf('day').toDate();
}
