import styles from "./Lineup.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/Loader/Loader";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import Filter from "../../components/Filter/Filter";
import { useSelector } from "react-redux";
import AdminArtistForm from "../../components/AdminArtistForm/AdminArtistForm";

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
  const [showAdmin, setShowAdmin] = useState(false);
  const profile = useSelector((state) => state.auth.profile);

  const [selectedGenre, setSelectedGenre] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("filters"));
      return saved?.selectedGenre || "All";
    } catch {
      return "All";
    }
  });

  const [selectedDay, setSelectedDay] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("filters"));
      return saved?.selectedDay || "All";
    } catch {
      console.error(error);
      return "All";
    }
  });

  const [schedule, setSchedule] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("schedule") || []);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "filters",
      JSON.stringify({ selectedGenre, selectedDay }),
    );
  }, [selectedDay, selectedGenre]);

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

  const handleDelete = async (id) => {
    await supabase.from("artists").delete().eq("id", id);
    fetchArtists();
  };

  const toggleSchedule = (id) => {
    const updatedSchedule = schedule.includes(id)
      ? schedule.filter((artistId) => artistId !== id)
      : [...schedule, id];
    console.log(updatedSchedule);

    setSchedule(updatedSchedule);
    console.log(schedule);

    try {
      localStorage.setItem("schedule", JSON.stringify(updatedSchedule));
    } catch {
      console.error("Failed to save schedule");
    }
  };

  if (loading) {
    return <Loader />;
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

  const isAdmin = profile?.role === "admin";

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>FULL LINEUP</h1>
      <div className={styles.toolbar}>
        <Filter
          genres={genres}
          days={days}
          selectedGenre={selectedGenre}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setSelectedGenre={setSelectedGenre}
        />
        {isAdmin && (
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            type="button"
            className={styles.showAdminBtn}
          >
            {showAdmin ? "Close" : "Add Artist"}
          </button>
        )}
      </div>
      {isAdmin && showAdmin && <AdminArtistForm onArtistAdded={fetchArtists} />}
      <div className={styles.gridArtists}>
        {filteredArtists.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            backgroundColor={colors[index % colors.length]}
            artist={artist}
            isAdmin={isAdmin}
            onDelete={handleDelete}
            isLoggedIn={!!profile}
            onToggleSchedule={toggleSchedule}
            isScheduled={schedule.includes(artist.id)}
          />
        ))}
      </div>
    </div>
  );
}
