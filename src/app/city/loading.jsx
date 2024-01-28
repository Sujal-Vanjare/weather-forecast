import styles from "./page.module.css";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className={styles.page}>
      <div className={styles.firstRow}>
        <div className={styles.weatherReport}></div>
        <div className={styles.sunMoonTime}></div>
      </div>
      <div className={styles.secondRow}></div>
      <h2 className={styles.forecastText}>Forecast for</h2>
      <div className={styles.thirdRow}></div>
      <h2 className={styles.forecastText}>Hourly Forecast </h2>
      <div className={styles.hourlyForecast}></div>
    </main>
  );
}
