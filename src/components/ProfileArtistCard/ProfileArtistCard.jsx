import styles from "./ProfileArtistCard.module.css";

export default function ProfileArtistCard({ artist }) {
  return (
    <div className={styles.container}>
      <img className={styles.artistImg} src={artist.image_url}></img>
      <p className={styles.artistName}>{artist.name}</p>{" "}
    </div>
  );
}
