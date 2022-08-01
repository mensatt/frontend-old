import { useMemo } from 'react';

import StarIcon, { StarIconProps } from '../../assets/icons/Star';
import ARROW_LEFT from '../../assets/icons/arrow_left.svg';
import ARROW_RIGHT from '../../assets/icons/arrow_right.svg';
import FLAG_DE from '../../assets/icons/flag_de.svg';
import FLAG_US from '../../assets/icons/flag_us.svg';
import LOGOUT from '../../assets/icons/logout.svg';
import MENU from '../../assets/icons/menu.svg';

const icons = {
  arrow_left: () => <ARROW_LEFT />,
  arrow_right: () => <ARROW_RIGHT />,
  flag_de: () => <FLAG_DE />,
  flag_us: () => <FLAG_US />,
  logout: () => <LOGOUT />,
  menu: () => <MENU />,
  star: (args: StarIconProps) => <StarIcon {...args} />,
};

type Props<
  T extends keyof typeof icons,
  Args = Parameters<typeof icons[T]>[0],
> = Args extends undefined ? { name: T } : { name: T } & Args;

const Icon = <T extends keyof typeof icons>(props: Props<T>) => {
  const icon = useMemo(() => {
    // compProps contains all but name
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, ...compProps } = props;
    const selectedIcon = icons[props.name];
    return selectedIcon(compProps);
  }, [props]);

  return <div className="icon">{icon}</div>;
};

export default Icon;
