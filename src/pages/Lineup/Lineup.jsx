import styles from "./Lineup.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/Loader/Loader";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import Filter from "../../components/Filter/Filter";

const colors = [
  "var(--brand-primary)",
  "var(--text-main)",
  "var(--brand-accent)",
  "var(--border-subtle)",
];

export default function Lineup() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedGenre, setSelectedGenre] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("filters"));
      return saved?.selectedGenre || "All";
    } catch (error) {
      console.error(error);
      return "All";
    }
  });

  const [selectedDay, setSelectedDay] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("filters"));
      return saved?.selectedDay || "All";
    } catch (error) {
      console.error(error);
      return "All";
    }
  });

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

  useEffect(() => {
    localStorage.setItem(
      "filters",
      JSON.stringify({ selectedGenre, selectedDay }),
    );
  }, [selectedDay, selectedGenre]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
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

  const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday"];

  const genres = ["All", ...new Set(artists.map((a) => a.genre))];
  const days = [
    "All",
    ...dayOrder.filter((day) => artists.some((a) => a.day === day)),
  ];

  const filteredArtists = artists.filter((artist) => {
    const genreMatch =
      artist.genre === selectedGenre || selectedGenre === "All";
    const dayMatch = selectedDay === "All" || artist.day === selectedDay;

    return genreMatch && dayMatch;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>FULL LINEUP</h1>
      <Filter
        genres={genres}
        days={days}
        selectedGenre={selectedGenre}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setSelectedGenre={setSelectedGenre}
      />
      <div className={styles.gridArtists}>
        {filteredArtists.map((artist, index) => (
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
