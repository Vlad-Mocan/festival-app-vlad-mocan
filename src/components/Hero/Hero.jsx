import DateDisplay from "../DateDisplay/DateDisplay";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <h1 className={styles.heroTitle}>fonM FESTIVAL</h1>
      <DateDisplay />
    </section>
  );
}
