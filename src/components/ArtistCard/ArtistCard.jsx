import styles from "./ArtistCard.module.css";

export default function ArtistCard({
  artist,
  backgroundColor,
  isAdmin,
  onDelete,
  isLoggedIn,
  onToggleSchedule,
  isScheduled,
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

      {isLoggedIn && (
        <button
          className={styles.addToScheduleBtn}
          onClick={() => onToggleSchedule(artist.id)}
        >
          {isScheduled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--brand-accent)"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--brand-accent)"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
          )}
        </button>
      )}

      <div className={styles.imageWrapper}>
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
          <div className={styles.dayTimeContainer}>
            <p>{artist?.day}</p>
            <p>{artist?.time}</p>
          </div>

          <p className={styles.stageText}>{artist?.stage}</p>
        </div>
      </div>
    </article>
  );
}
