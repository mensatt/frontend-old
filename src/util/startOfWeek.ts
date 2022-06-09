import dayjs from 'dayjs';
import 'dayjs/locale/de';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

export const currentDate = dayjs();
export const afterFriday = dayjs().weekday() > 4;
// Date of monday of the week that will be displayed when page is loaded initially
// If it's after friday this is the next monday
export const startOfWeek = dayjs()
  .add(afterFriday ? 1 : 0, 'week')
  .weekday(0);

// Format for dates that is used throughout app
export const DATE_FORMAT = 'YYYY-MM-DD';
