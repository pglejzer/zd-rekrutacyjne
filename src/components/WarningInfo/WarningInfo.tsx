import React from 'react';
import styles from './WarningInfo.module.css';

interface WarningInfoProps {
  info?: string;
}

export const WarningInfo: React.FC<WarningInfoProps> = ({ info }) =>
  info ? <span className={styles.warningInfo}>{info}</span> : null;
