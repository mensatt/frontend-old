import dayjs from 'dayjs';
import 'dayjs/locale/de';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);
dayjs.updateLocale('en', {
  weekStart: 1,
});

export const currentDate = dayjs();
export const afterFriday = dayjs().weekday() > 4;
// Function that returns the beginning of the week of the date that is passed
export const getStartOfWeek = (date: dayjs.Dayjs) => date.weekday(0);

// Format for dates that is used throughout app
export const DATE_FORMAT = 'YYYY-MM-DD';
