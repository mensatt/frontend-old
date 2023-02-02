import { useMemo } from 'react';

import StarIcon, { StarIconProps } from '../../assets/icons/Star';
import ARROW_LEFT from '../../assets/icons/arrow_left.svg';
import ARROW_RIGHT from '../../assets/icons/arrow_right.svg';
import DISCORD from '../../assets/icons/discord.svg';
import FLAG_DE from '../../assets/icons/flag_de.svg';
import FLAG_US from '../../assets/icons/flag_us.svg';
import GITHUB from '../../assets/icons/github.svg';
import LOGOUT from '../../assets/icons/logout.svg';
import MAIL from '../../assets/icons/mail.svg';
import MENU from '../../assets/icons/menu.svg';

const icons = {
  arrow_left: () => <ARROW_LEFT />,
  arrow_right: () => <ARROW_RIGHT />,
  discord: () => <DISCORD />,
  flag_de: () => <FLAG_DE />,
  flag_us: () => <FLAG_US />,
  github: () => <GITHUB />,
  logout: () => <LOGOUT />,
  mail: () => <MAIL />,
  menu: () => <MENU />,
  star: (args: StarIconProps) => <StarIcon {...args} />,
};

type Props<
  T extends keyof typeof icons,
  Args = Parameters<(typeof icons)[T]>[0],
> = Args extends undefined ? { name: T } : { name: T } & Args;

const Icon = <T extends keyof typeof icons>(props: Props<T>) => {
  const icon = useMemo(() => {
    // compProps contains all but name
    const { name, ...compProps } = props;
    const selectedIcon = icons[name];
    return selectedIcon(compProps);
  }, [props]);

  return <div className="icon">{icon}</div>;
};

export default Icon;
