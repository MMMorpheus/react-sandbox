import { usePageScrollPercentage } from "../../hooks";
import styles from "./scrollProgress.module.scss";

export const ScrollProgress = () => {
  const scrollPercent = usePageScrollPercentage();
  return (
    <div style={{ width: `${scrollPercent}%` }} className={styles.progress} />
  );
};
