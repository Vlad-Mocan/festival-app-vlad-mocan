import styles from "./DateDisplay.module.css";
export default function DateDisplay() {
  return (
    <>
      <div className={styles.dateGrid}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>

        <div className={styles.days}>
          <span>18-21</span>
        </div>
        <div className={styles.month}>
          <span>JUN</span>
        </div>
        <div className={styles.yearPrefix}>
          <span>20</span>
        </div>
        <div className={styles.yearSuffix}>
          <span>26</span>
        </div>
      </div>
    </>
  );
}
