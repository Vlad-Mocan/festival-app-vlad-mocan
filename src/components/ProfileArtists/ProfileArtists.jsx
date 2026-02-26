import styles from "./ProfileArtists.module.css";

export default function ProfileArtists({ artists, isOpened }) {
  return (
    <div className={`${styles.container} ${isOpened ? styles.active : ""}`}>
      <div className={styles.handleBar}></div>

      <p className={styles.profileArtistsSpan}>YOUR ARTISTS</p>
      <div className={styles.artistNamesContainer}>
        {artists.map((artist) => (
          <div key={artist.id} className={styles.textImageContainer}>
            <p className={styles.artistName}>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
