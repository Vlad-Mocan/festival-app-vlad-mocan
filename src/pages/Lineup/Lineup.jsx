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
  const [currentPage, setCurrentPage] = useState(1);

  const profile = useSelector((state) => state.auth.profile);

  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("sort") || "name-asc";
  });
  const [selectedStage, setSelectedStage] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("filters"));
      return saved?.selectedStage || "All";
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
    if (!supabase) {
      setError("No Supabase connection. Set up your .env file to load the lineup.");
      return;
    }
    fetchArtists();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStage, selectedDay, sortBy]);

  useEffect(() => {
    localStorage.setItem("sort", sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem(
      "filters",
      JSON.stringify({ selectedStage, selectedDay }),
    );
  }, [selectedDay, selectedStage]);

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

  const stages = ["All", ...new Set(artists.map((a) => a.stage))];
  const days = [
    "All",
    ...dayOrder.filter((day) => artists.some((a) => a.day === day)),
  ];

  const filteredArtists = artists.filter((artist) => {
    const stageMatch =
      artist.stage === selectedStage || selectedStage === "All";
    const dayMatch = selectedDay === "All" || artist.day === selectedDay;

    return stageMatch && dayMatch;
  });

  const stageOrder = ["Main Stage", "Dance Arena", "Orchestra Hall"];

  const sortedArtists = [...filteredArtists].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    if (sortBy === "stage")
      return stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage);
    if (sortBy === "day-asc")
      return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    if (sortBy === "day-desc")
      return dayOrder.indexOf(b.day) - dayOrder.indexOf(a.day);

    return a[sortBy].localeCompare(b[sortBy]);
  });

  const isAdmin = profile?.role === "admin";

  const perPage = 10;

  const totalPages = Math.ceil(sortedArtists.length / perPage);
  const paginatedArtists = sortedArtists.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>FULL LINEUP</h1>
      <div className={styles.toolbar}>
        <Filter
          stages={stages}
          days={days}
          selectedStage={selectedStage}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setSelectedStage={setSelectedStage}
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

        <div className={styles.sortWrapper}>
          <select
            className={styles.sortElement}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>

            <option value="day-asc">Thursday &rarr; Sunday</option>
            <option value="day-desc">Sunday &rarr; Thursday</option>

            <option value="stage">Stage</option>
          </select>
          <svg
            className={styles.sortArrow}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--text-main)"
          >
            <path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z" />
          </svg>
        </div>
      </div>
      {isAdmin && showAdmin && <AdminArtistForm onArtistAdded={fetchArtists} />}
      <div className={styles.gridArtists}>
        {paginatedArtists.map((artist, index) => (
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

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          &#8592;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}