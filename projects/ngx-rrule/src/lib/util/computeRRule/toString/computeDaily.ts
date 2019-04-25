import {RRule} from 'rrule';

const computeDaily = ({ interval }) => ({
  freq: RRule,
  interval,
});

export default computeDaily;
