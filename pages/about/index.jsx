/* eslint-disable react/no-unescaped-entities */
import Heading from "@components/heading-intro";
import Image from "next/image";
import styles from "../home.module.css";

export default function About() {
  const title = "What can you expect";
  const intro =
    "Explore captivating traditions, mouthwatering food, and joyous celebrations. Join us as we dive into the vibrant world of Midsummer and discover the essence of this enchanting Swedish festival.";
  const paraOne =
    "Our passionate team of summer enthusiasts is here to curate a collection of articles, tips, and recommendations, guiding you every step of the way as you create unforgettable memories.";
  const paraTwo =
    "Whether you're seeking travel inspiration, summer fashion trends, or simply looking for ways to bask in the sunshine, we're dedicated to providing you with valuable insights and guidance.";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <Heading {...{ title, intro, paraOne, paraTwo }} />
        </div>
        <div className={styles.imgContainer}>
          <Image
            src="/images/midsommarbord.webp"
            alt="Uppdukat midsommarbord i skärgården med massa människor"
            width={600}
            height={400}
            className={styles.img}
          />
        </div>
      </div>
    </>
  );
}
