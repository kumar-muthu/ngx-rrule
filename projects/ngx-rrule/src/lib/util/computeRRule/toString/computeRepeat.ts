import computeYearly from './computeYearly';
import computeMonthly from './computeMonthly';
import computeWeekly from './computeWeekly';
import computeDaily from './computeDaily';
import computeHourly from './computeHourly';

const computeRepeat = ({
  frequency,
  yearly,
  monthly,
  weekly, interval
}) => {
  switch (frequency) {
    case 'Yearly': {
      return computeYearly(yearly);
    }
    case 'Monthly': {
      return computeMonthly(monthly);
    }
    case 'Weekly': {
      return computeWeekly(weekly);
    }
    case 'Daily': {
      return computeDaily(interval);
    }
    case 'Hourly': {
      return computeHourly(interval);
    }
    default:
      return {};
  }
};

export default computeRepeat;
