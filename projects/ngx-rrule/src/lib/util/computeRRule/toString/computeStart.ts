import * as momentImported from 'moment'; const moment = momentImported;

const computeStart = (date) => {
  // verify that incoming date is valid
  // by seeing if it can be converted into a moment object.
  // if not, then create a new date
  const start: any = {};

  if (date) {
    if (!moment.isMoment(moment(date))) {
      date = new Date().setMilliseconds(0);
    }

    return {
      dtstart: moment(date).toDate(),
    };
  }

  return start;
};

export default computeStart;
