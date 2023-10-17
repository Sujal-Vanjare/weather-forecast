import Image from "next/image";
import styles from "./sunMoonTime.module.css";

const moonPhaseImages = {
  "New Moon": "new-moon.png",
  "Waxing Crescent": "waxing-crescent-moon.png",
  "First Quarter": "first-quarter-moon.png",
  "Waxing Gibbous": "waxing-gibbous-moon.png",
  "Full Moon": "full-moon.png",
  "Waning Gibbous": "waning-gibbous-moon.png",
  "Third Quarter": "last-quarter-moon.png",
  "Waning Crescent": "waning-crescent-moon.png",
};

export default function SunMoonTime({ astro }) {
  // Function to calculate time difference and format it
  function calculateAndFormatTimeDifference(start, end) {
    const startTime = new Date(`2000-01-01 ${start}`);
    const endTime = new Date(`2000-01-01 ${end}`);

    const timeDifference = endTime - startTime;
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);

    return `${hours.toString().padStart(2, "0")} hr ${minutes
      .toString()
      .padStart(2, "0")} min`;
  }

  // Calculate and format time differences
  const sunriseToSunset = calculateAndFormatTimeDifference(
    astro.sunrise,
    astro.sunset
  );
  const moonriseToMoonset = calculateAndFormatTimeDifference(
    astro.moonrise,
    astro.moonset
  );
  return (
    <>
      <div className={styles.sunmoon}>
        <p className={styles.sunmoonhead}>Sun/Moon</p>
        <div className={styles.sunMoonPhaseContainer}>
          <div className={styles.sunMoonContainer}>
            <div className={styles.sun}>
              <div className={styles.rise}>
                <div className={styles.sunriseIcon}></div>
                <div className={styles.sunmoontext}>Sunrise</div>
                <div className={styles.sunmoontime}>{astro.sunrise}</div>
              </div>
              <div className={styles.totalTime}>
                <div className={styles.sunmoontext}>total time</div>
                <div className={styles.timeDiff}>{sunriseToSunset}</div>
              </div>
              <div className={styles.set}>
                <div className={styles.sunsetIcon}></div>
                <div className={styles.sunmoontext}>Sunset</div>
                <div className={styles.sunmoontime}>{astro.sunset}</div>
              </div>
            </div>

            <div className={styles.moon}>
              <div className={styles.rise}>
                <div className={styles.moonriseIcon}></div>
                <div className={styles.sunmoontext}>Moonrise</div>
                <div className={styles.sunmoontime}>{astro.moonrise}</div>
              </div>
              <div className={styles.totalTime}>
                <div className={styles.sunmoontext}>total time</div>
                <div className={styles.timeDiff}>{moonriseToMoonset}</div>
              </div>
              <div className={styles.set}>
                <div className={styles.moonsetIcon}></div>
                <div className={styles.sunmoontext}>Moonset</div>
                <div className={styles.sunmoontime}>{astro.moonset}</div>
              </div>
            </div>
          </div>

          <div className={styles.moonPhase}>
            <p className={styles.moonPhaseHead}>Moon phase</p>
            <div className={styles.phaseContainer}>
              <Image
                className={styles.phaseIcon}
                width={80}
                height={80}
                src={`/moon/${moonPhaseImages[astro.moon_phase]}`}
                alt="moon-icon"
              />
              <div className={styles.phaseText}>{astro.moon_phase}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
