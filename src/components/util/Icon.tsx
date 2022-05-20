import FLAG_DE from '../../assets/icons/flag_de.svg';
import FLAG_US from '../../assets/icons/flag_us.svg';

const icons = {
  flag_de: <FLAG_DE />,
  flag_us: <FLAG_US />,
};

type Props = {
  name: keyof typeof icons;
};

const Icon = ({ name }: Props) => {
  // return
  return <div className="icon">{icons[name]}</div>;
};

export default Icon;
