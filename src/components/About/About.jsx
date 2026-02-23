import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.container}>
      <div className={styles.vinyl}>
        <div className={styles.circle1}>
          <span className={styles.name}>fonM</span>

          <div className={styles.circle2}></div>
        </div>
      </div>

      <span className={styles.paragprah}>
        fonM is a celebration of sound with no boundaries.
      </span>
    </section>
  );
}
