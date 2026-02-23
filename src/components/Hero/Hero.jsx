import About from "../About/About";
import DateDisplay from "../DateDisplay/DateDisplay";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.heroTitle}>FREAMĂT</h1>
      <DateDisplay />
      <About />
    </section>
  );
}
