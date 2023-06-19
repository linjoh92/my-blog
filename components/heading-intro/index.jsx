import styles from "./headingIntro.module.css";

export default function Heading({ title, paraOne, paraTwo }) {
  return(
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p>{paraOne}</p>
      <p>{paraTwo}</p>
    </div>
  )
}
