import React, { useEffect, useMemo } from 'react';
import { selectedWeekdayVar } from 'src/apollo';
import { GET_NAVIGATION, Navigation } from 'src/graphql/queries';
import { afterFriday, currentWeekday, startOfWeek } from 'src/util/';

import { useQuery } from '@apollo/client';

import Weekday from './Weekday';
import styles from './WeekdaySelection.module.scss';

type Props = {
  className?: string;
};

const WeekdaySelection = ({ className }: Props) => {
  const { data } = useQuery<Navigation>(GET_NAVIGATION);

  useEffect(() => {
    selectedWeekdayVar(afterFriday ? 0 : currentWeekday);
    // Disabling here because we only want to execute on initial page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const week = useMemo(
    () =>
      data &&
      [0, 1, 2, 3, 4].map((elem) => {
        return (
          <Weekday
            key={elem}
            date={startOfWeek.add(elem, 'day')}
            selected={elem === data.selectedWeekday}
            onClick={() => selectedWeekdayVar(elem)}
          />
        );
      }),
    [data],
  );

  return <div className={className + ' ' + styles.container}>{week}</div>;
};

export default WeekdaySelection;
