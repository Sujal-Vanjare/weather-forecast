import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.head}>Welcome to Weather Forecast</h1>
        <p className={styles.desc}>
          Find the weather for your current city with a single search.
        </p>
      </div>
    </main>
  );
}
