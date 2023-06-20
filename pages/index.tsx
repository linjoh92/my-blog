import Heading from "@components/heading-intro";
import Image from "next/image";
import styles from "./home.module.css";

export default function Home() {
  const title = "Welcome to the Midsummer blog";
  const intro =
    "Let us show you the magic of Swedish Midsummer on our blog. Discover traditional celebrations, delicious food, and captivating traditions. Join us on this joyful journey through the vibrant world of Midsummer!";
  const paraOne =
    "Welcome to our blog! Get ready to immerse yourself in the enchanting world of Swedish Midsummer. Discover the vibrant traditions, delectable summer food recipes, and delightful celebrations that make this season truly special.";
  const paraTwo =
    "From dancing around the maypole to enjoying delicious Swedish delicacies, our blog is your go-to resource for all things Midsummer. Whether you're seeking inspiration for your own Midsummer festivities or simply want to learn more about this cherished Swedish tradition, join us on this captivating journey through the magic of Midsummer. Let the sunshine and joy of the season fill your heart as you explore our curated collection of Midsummer articles, tips, and inspiration.";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <Heading {...{ title, intro, paraOne, paraTwo }} />
        </div>
        <div className={styles.imgContainer}>
          <Image
            src="/images/sommar_blomma.jpeg"
            alt="svensk sommaräng"
            width={600}
            height={400}
            className={styles.img}
          />
        </div>
      </div>
    </>
  );
}
