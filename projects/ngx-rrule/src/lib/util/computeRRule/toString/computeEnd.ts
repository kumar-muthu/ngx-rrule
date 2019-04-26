import * as momentImported from 'moment'; const moment = momentImported;

const computeEnd = ({ mode, after, date }) => {
  const end: any = {};

  if (mode === 'After') {
    end.count = after;
  }

  if (mode === 'On date' && moment.isMoment(moment(date))) {
    end.until = moment(date).toDate();
  }

  return end;
};

export default computeEnd;
