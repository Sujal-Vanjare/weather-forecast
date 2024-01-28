import styles from "./page.module.css";

export default async function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <video
          className={styles.video}
          width="640"
          height="360"
          autoPlay
          loop
          muted
        >
          <source src="/earth.mp4" type="video/mp4" />
        </video>

        <h1 className={styles.head}>Hey there!</h1>
        <p className={styles.desc}>
          Curious about the weather in your city? Find out with a quick search!
        </p>
      </div>
    </main>
  );
}
