import { useState } from "react";
import styles from "./ProfileArtists.module.css";

export default function ProfileArtists({ artists }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <div className={`${styles.container} ${isOpened ? styles.active : ""}`}>
        <button
          onClick={() => setIsOpened((prev) => !prev)}
          className={`${styles.toggleBtn} ${isOpened ? styles.active : ""}`}
        >
          SEE YOUR ARTISTS
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
        <p className={styles.title}>YOUR ARTISTS</p>

        <div className={styles.artistsGrid}>
          {artists.map((artist) => (
            <div key={artist.id} className={styles.artistsCard}>
              <img
                src={artist.image_url}
                alt={artist.name}
                className={styles.artistImage}
              ></img>
              {/* <p className={styles.artistName}>{artist.name}</p> */}
              <p className={styles.artistName}>{artist.stage}</p>
              <p className={styles.artistName}>{artist.day}</p>
              <p className={styles.artistName}>{artist.time}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
