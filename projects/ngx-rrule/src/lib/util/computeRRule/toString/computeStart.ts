import {getDateParts, isValidDate} from '../../common'

const computeStart = (date) => {
  let start: any = {};

  if (date) {
    if (!date.onDate || !isValidDate(date.onDate.date)) {
      start = new Date().setMilliseconds(0);
    } else {
      start = date.onDate.date;
    }
    const dateParts = getDateParts(start);
    return {
      dtstart: new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, 0, 0))
    };
  }

  return start;
};

export default computeStart;
