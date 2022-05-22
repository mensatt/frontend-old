import dayjs from 'dayjs';
import 'dayjs/locale/de';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

export const currentWeekday = dayjs().weekday();
export const afterFriday = currentWeekday > 4;
export const startOfWeek = dayjs()
  .add(afterFriday ? 1 : 0, 'week')
  .weekday(0);
