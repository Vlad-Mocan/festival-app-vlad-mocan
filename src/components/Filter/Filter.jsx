import styles from "./Filter.module.css";

export default function Filter({
  genres,
  days,
  selectedGenre,
  selectedDay,
  setSelectedGenre,
  setSelectedDay,
}) {
  return (
    <div className={styles.container}>
      <div className={`${styles.detailsContainer}  ${styles.genreContainer}`}>
        {/* <span className={styles.genreSpan}>GENRE:</span> */}
        {genres.map((genre) => (
          <button
            className={`${styles.pill} ${selectedGenre === genre ? styles.active : ""}`}
            onClick={() => setSelectedGenre(genre)}
            key={genre}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className={`${styles.detailsContainer}  ${styles.daysContainer}`}>
        {/* <span className={styles.daySpan}>DAY:</span> */}
        {days.map((day) => (
          <button
            className={`${styles.pill} ${selectedDay === day ? styles.active : ""}`}
            onClick={() => {
              setSelectedDay(day);
            }}
            key={day}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
