import { rrulestr as RRuleObjectFromString } from 'rrule';

import { DATE_TIME_FORMAT } from '../constant';
import computeStartOnDate from './computeStartOnDate';
import computeFrequency from './computeFrequency';
import computeYearlyMode from './computeYearlyMode';
import computeYearlyOnMonth from './computeYearlyOnMonth';
import computeYearlyOnMonthday from './computeYearlyOnMonthday';
import computeYearlyOnTheMonth from './computeYearlyOnTheMonth';
import computeYearlyOnTheMonthday from './computeYearlyOnTheMonthday';
import computeYearlyOnTheWhich from './computeYearlyOnTheWhich';
import computeMonthlyMode from './computeMonthlyMode';
import computeMonthlyInterval from './computeMonthlyInterval';
import computeMonthlyOnDay from './computeMonthlyOnDay';
import computeMonthlyOnTheDay from './computeMonthlyOnTheDay';
import computeMonthlyOnTheWhich from './computeMonthlyOnTheWhich';
import computeWeeklyInterval from './computeWeeklyInterval';
import computeWeeklyDays from './computeWeeklyDays';
import computeWeekStartDay from './computeWeekStartDay';
import computeDailyInterval from './computeDailyInterval';
import computeHourlyInterval from './computeHourlyInterval';
import computeEndMode from './computeEndMode';
import computeEndAfter from './computeEndAfter';
import computeEndOnDate from './computeEndOnDate';
import {formatDate} from "../../common";

export const computeRRule = (data, rrule) => {
  if (!rrule) {
    return data;
  }

  let newDataObj;
  try {
    const rruleOrigOptions = RRuleObjectFromString(rrule).origOptions;
    newDataObj = {
      ...data,
      start: {
        ...data.start,
        onDate: {
          date: formatDate(computeStartOnDate(data, rruleOrigOptions)),
          options: {
            ...data.start.onDate.options,
            weekStartsOnSunday: computeWeekStartDay(data, rruleOrigOptions),
          },
        },
      },
      repeat: {
        ...data.repeat,
        frequency: computeFrequency(data, rruleOrigOptions),
        yearly: {
          ...data.repeat.yearly,
          mode: computeYearlyMode(data, rruleOrigOptions),
          on: {
            month: computeYearlyOnMonth(data, rruleOrigOptions),
            day: computeYearlyOnMonthday(data, rruleOrigOptions),
          },
          onThe: {
            month: computeYearlyOnTheMonth(data, rruleOrigOptions),
            day: computeYearlyOnTheMonthday(data, rruleOrigOptions),
            which: computeYearlyOnTheWhich(data, rruleOrigOptions),
          },
        },
        monthly: {
          ...data.repeat.monthly,
          mode: computeMonthlyMode(data, rruleOrigOptions),
          interval: computeMonthlyInterval(data, rruleOrigOptions),
          on: {
            day: computeMonthlyOnDay(data, rruleOrigOptions),
          },
          onThe: {
            day: computeMonthlyOnTheDay(data, rruleOrigOptions),
            which: computeMonthlyOnTheWhich(data, rruleOrigOptions),
          },
        },
        weekly: {
          interval: computeWeeklyInterval(data, rruleOrigOptions),
          days: computeWeeklyDays(data, rruleOrigOptions),
          options: {
            weekStartsOnSunday: computeWeekStartDay(data, rruleOrigOptions),
          },
        },
        daily: {
          interval: computeDailyInterval(data, rruleOrigOptions),
        },
        hourly: {
          interval: computeHourlyInterval(data, rruleOrigOptions),
        },
      },
      end: {
        ...data.end,
        mode: computeEndMode(data, rruleOrigOptions),
        after: computeEndAfter(data, rruleOrigOptions),
        onDate: {
          date: formatDate(computeEndOnDate(data, rruleOrigOptions)),
          options: {
            ...data.end.onDate.options,
            weekStartsOnSunday: computeWeekStartDay(data, rruleOrigOptions),
          },
        },
      },
      options: {
        ...data.options,
        weekStartsOnSunday: computeWeekStartDay(data, rruleOrigOptions),
      },
      error: null,
    };
  } catch (e) {
    return { ...data, error: { value: rrule, message: e } };
  }

  return newDataObj;
};

