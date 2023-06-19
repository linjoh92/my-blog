import Image from "next/image";
import styles from "./blog-image-banner.module.css";

export default function BlogImageBanner({ src, alt = "", noHover = true }){
  const imageClassName = noHover ? `${styles.image} ${styles.noHover}` : styles.image;

  return (
    <div className={styles.imageContainer}>
      <Image
        src={src}
        alt={alt}
        className={imageClassName}
        width={800}
        height={400}
        priority={true}
      />
    </div>
  );
}
