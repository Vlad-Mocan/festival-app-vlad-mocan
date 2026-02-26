import styles from "./Filter.module.css";

export default function Filter({
  stages,
  days,
  selectedStage,
  selectedDay,
  setSelectedStage,
  setSelectedDay,
}) {
  return (
    <div className={styles.container}>
      <div className={`${styles.detailsContainer}  ${styles.stageContainer}`}>
        {stages.map((stage) => (
          <button
            className={`${styles.pill} ${selectedStage === stage ? styles.active : ""}`}
            onClick={() => setSelectedStage(stage)}
            key={stage}
          >
            {stage}
          </button>
        ))}
      </div>

      <div className={`${styles.detailsContainer}  ${styles.daysContainer}`}>
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
