import React from "react";
import styles from "./MensaSelection.module.scss";

type Props = {
  className?: string;
};

const Navigation = ({ className }: Props) => {
  return (
    <div className={className + " " + styles.content}>
      Südmensa
    </div>
  );
};
export default Navigation;
