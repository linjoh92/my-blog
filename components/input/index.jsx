import classNames from "classnames";
import styles from "./input.module.css";

export default function Input({ className, ...props }) {
  return (
    <div className={styles.inputConatiner}>
      <input className={classNames(styles.container, className)} {...props} />
    </div>
  );
}
