import { useMemo } from 'react';

import StarIcon, { StarIconProps } from '../../assets/icons/Star';
import ARROW_LEFT from '../../assets/icons/arrow_left.svg';
import FLAG_DE from '../../assets/icons/flag_de.svg';
import FLAG_US from '../../assets/icons/flag_us.svg';
import LOGOUT from '../../assets/icons/logout.svg';

const icons = {
  arrow_left: () => <ARROW_LEFT />,
  flag_de: () => <FLAG_DE />,
  flag_us: () => <FLAG_US />,
  logout: () => <LOGOUT />,
  star: (args: StarIconProps) => <StarIcon {...args} />,
};

type Props<
  T extends keyof typeof icons,
  Args = Parameters<typeof icons[T]>[0],
> = Args extends undefined ? { name: T } : { name: T; compProps: Args };

const Icon = <T extends keyof typeof icons>(props: Props<T>) => {
  const icon = useMemo(() => {
    const compProps = { compProps: {}, ...props }.compProps;
    const selectedIcon = icons[props.name];
    return selectedIcon(compProps ?? {});
  }, [props]);

  return <div className="icon">{icon}</div>;
};

export default Icon;
