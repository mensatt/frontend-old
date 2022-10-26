import { ReactNode } from 'react';

import styles from './Tooltip.module.scss';

const Tooltip = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div className={styles.elem}>
      {children}
      <div className={styles.tooltip}>{text}</div>
    </div>
  );
};

export default Tooltip;
