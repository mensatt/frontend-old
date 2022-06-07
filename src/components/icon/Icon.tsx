import ARROW_LEFT from '../../assets/icons/arrow_left.svg';
import FLAG_DE from '../../assets/icons/flag_de.svg';
import FLAG_US from '../../assets/icons/flag_us.svg';

const icons = {
  arrow_left: <ARROW_LEFT />,
  flag_de: <FLAG_DE />,
  flag_us: <FLAG_US />,
};

type Props = {
  name: keyof typeof icons;
};

const Icon = ({ name }: Props) => <div className="icon">{icons[name]}</div>;

export default Icon;
