"use client";

import { FC } from "react";

import styles from "./background.module.css";

interface BackgroundProps {}

const Background: FC<BackgroundProps> = ({}) => {
  return (
    <div className={styles.main}>
      <div className={styles.content} />
    </div>
  );
};

export default Background;
