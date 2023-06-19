import styles from "./introText.module.css";

export default function IntroText({ children }) {
  return <div className={styles.introtext}><p>{children}</p></div>
  ;
}

