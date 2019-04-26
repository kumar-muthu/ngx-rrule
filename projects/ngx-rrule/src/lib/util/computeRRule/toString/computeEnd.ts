import * as momentImported from 'moment'; const moment = momentImported;

const computeEnd = ({ mode, after, date }) => {
  const end: any = {};

  if (mode === 'After') {
    end.count = after;
  }

  if (mode === 'On date') {
    end.until = moment(date).format();
  }

  return end;
};

export default computeEnd;
