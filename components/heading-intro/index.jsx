import styles from "./headingIntro.module.css";

export default function Heading({ title, intro, paraOne, paraTwo }) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <h1 className={styles.intro}>{intro}</h1>
      <p>{paraOne}</p>
      <p>{paraTwo}</p>
    </div>
  );
}
