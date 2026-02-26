import { useState } from "react";
import styles from "./ProfileArtists.module.css";

export default function ProfileArtists({ artists }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpened((prev) => !prev)}
        className={`${styles.toggleBtn} ${isOpened ? styles.active : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="var(--surface-main)"
        >
          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
        </svg>
      </button>
      <div className={`${styles.container} ${isOpened ? styles.active : ""}`}>
        <p className={styles.title}>YOUR ARTISTS</p>

        <div className={styles.artistsGrid}>
          {artists.map((artist) => (
            <div key={artist.id} className={styles.artistsCard}>
              <img
                src={artist.image_url}
                alt={artist.name}
                className={styles.artistImage}
              ></img>
              <p className={styles.artistName}>{artist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
