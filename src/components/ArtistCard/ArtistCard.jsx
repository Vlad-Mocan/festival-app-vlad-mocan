import styles from "./ArtistCard.module.css";

export default function ArtistCard({
  artist,
  backgroundColor,
  isAdmin,
  onDelete,
}) {
  const imgSrc =
    artist?.image_url || `https://picsum.photos/seed/${artist?.id}/800/800`;

  return (
    <article
      className={styles.container}
      style={{
        ["--accent"]: backgroundColor,
      }}
      aria-label={`${artist?.name} – ${artist?.day}, ${artist?.stage}`}
    >
      {isAdmin && (
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(artist.id)}
        >
          &#10005;
        </button>
      )}
      <div className={styles.imageWrapper} aria-hidden="true">
        <img
          loading="lazy"
          src={imgSrc}
          alt={artist?.name || "Artist image"}
          className={styles.artistImage}
        />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.artistName}>{artist?.name}</h3>

        <div className={styles.performanceDetails}>
          <p>{artist?.day}</p>
          <p className={styles.stageText}>{artist?.stage}</p>
        </div>
      </div>
    </article>
  );
}
