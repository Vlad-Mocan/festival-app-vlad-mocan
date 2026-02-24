import styles from "./ArtistCard.module.css";

export default function ArtistCard({ artist, backgroundColor }) {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: backgroundColor }}
    >
      <p className={styles.artistName}>{artist.name}</p>
      <div className={styles.performanceDetails}>
        <p>{artist.day}</p>
        <p className={styles.stageText}>{artist.stage}</p>
      </div>
    </div>
  );
}
