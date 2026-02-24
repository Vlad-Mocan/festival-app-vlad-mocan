import styles from "./ArtistCard.module.css";

export default function ArtistCard({ artist, backgroundColor }) {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={
            artist.image_url ||
            `https://picsum.photos/seed/${artist.id}/400/400`
          }
          alt={artist.name}
          className={styles.artistImage}
        ></img>
      </div>
      <p className={styles.artistName}>{artist.name}</p>
      <div className={styles.performanceDetails}>
        <p>{artist.day}</p>
        <p className={styles.stageText}>{artist.stage}</p>
      </div>
    </div>
  );
}
