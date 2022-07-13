import { useMemo } from 'react';

import StarIcon, { StarIconProps } from '../../assets/icons/Star';
import ARROW_LEFT from '../../assets/icons/arrow_left.svg';
import FLAG_DE from '../../assets/icons/flag_de.svg';
import FLAG_US from '../../assets/icons/flag_us.svg';
import LOGOUT from '../../assets/icons/logout.svg';

const icons = {
  arrow_left: <ARROW_LEFT />,
  flag_de: <FLAG_DE />,
  flag_us: <FLAG_US />,
  logout: <LOGOUT />,
  star: (args: StarIconProps) => <StarIcon {...args} />,
};

type Props = {
  name: keyof typeof icons;
  compProps?: object;
};

const Icon = ({ name, compProps }: Props) => {
  const icon = useMemo(() => {
    const selectedIcon = icons[name];
    if (typeof selectedIcon === 'object') return selectedIcon;
    else if (typeof selectedIcon === 'function') {
      return selectedIcon(compProps ?? {});
    }
  }, [compProps, name]);
  return <div className="icon">{icon}</div>;
};

export default Icon;
