import {getDateParts, isValidDate} from "../../common";

const computeEnd = (attr) => {
  const end: any = {};

  if (attr) {
    const { mode, after } = attr;
    const date =  attr.onDate.date;
    if (mode === 'After') {
      end.count = after;
    }

    if (mode === 'On date' && isValidDate(date)) {
      const dateParts = getDateParts(date);
      end.until = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, 23, 59, 59, 999));
    }
  }

  return end;
};

export default computeEnd;
