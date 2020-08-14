import {RRule} from 'rrule';

const computeOptions = ({ hideStart, weekStartsOnSunday, tz }) => {
  const options: any = {};

  if (hideStart) {
    options.dtstart = null;
  }

  if (weekStartsOnSunday) {
    options.wkst = RRule.SU;
  }

  options.tzid = tz ? tz : Intl.DateTimeFormat().resolvedOptions().timeZone;
  return options;
};

export default computeOptions;
