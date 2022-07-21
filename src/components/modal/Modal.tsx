import React, { ReactNode } from 'react';

import styles from './Modal.module.scss';

export type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  return <div className={styles.modal}>{children}</div>;
};

export default Modal;
