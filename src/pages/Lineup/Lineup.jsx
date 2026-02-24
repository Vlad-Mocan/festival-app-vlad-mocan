import styles from "./Lineup.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/Loader/Loader";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

const colors = [
  "var(--brand-primary)",
  "var(--brand-accent)",
  "var(--border-subtle)",
  "var(--surface-main",
];

export default function Lineup() {
  // https://picsum.photos/400/400
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("artists").select("*");
        if (error) throw new Error("Could not fetch artists");
        setArtists(data);
      } catch (error) {
        setError("Error while fetching the artists.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>FULL LINEUP</h1>
      <div className={styles.gridArtists}>
        {artists.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            backgroundColor={colors[index % colors.length]}
            artist={artist}
          />
        ))}
      </div>
    </div>
  );
}
