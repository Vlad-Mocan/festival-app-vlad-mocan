// import { useState } from "react";
import styles from "./ProfileArtists.module.css";

export default function ProfileArtists({ artists }) {
  //   const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
      <p className={styles.profileArtistsSpan}>YOUR ARTISTS</p>
      <div className={styles.artistNamesContainer}>
        {artists.map((artist) => {
          return (
            <div className={styles.textImageContainer}>
              <p
                // onMouseOver={() => setIsHovered(true)}
                className={styles.artistName}
              >
                {artist.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
