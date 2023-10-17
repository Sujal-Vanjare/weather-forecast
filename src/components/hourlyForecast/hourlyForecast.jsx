import styles from "./hourlyForecast.module.css";
import Image from "next/image";
import { extractTime } from "@/utils/time";

export default function HourlyForecast({ hourlyForecastData, currentTime }) {
  const isAM = currentTime.includes("AM");
  const currentHour = parseInt(currentTime.split(":")[0]);
  return (
    <div className={styles.container}>
      <div className={styles.hourContainer}>
        {hourlyForecastData.map((hour, index) => {
          const hourTime = extractTime(hour.time);
          const forecastHour = parseInt(hourTime.split(":")[0]);
          const forecastIsAM = hourTime.includes("AM");

          const isCurrentHour =
            currentHour === forecastHour && isAM === forecastIsAM;

          return (
            <div
              className={`${styles.hourBox} ${
                isCurrentHour ? styles.active : ""
              } ${isCurrentHour ? styles.centered : ""}`}
              key={index}
            >
              <Image
                width={80}
                height={80}
                src={`https:${hour.condition.icon}`}
                alt=""
              />

              <div className={styles.hourTempContainer}>
                <p>
                  <span className={styles.hourTemp}>{hour.temp_c}</span>
                  <span className={styles.hourTempUnit}>&deg;C</span>
                </p>
                <div className={styles.tempDivide}></div>
                <p>
                  <span className={styles.hourTemp}>{hour.temp_f}</span>

                  <span className={styles.hourTempUnit}>&deg;F</span>
                </p>
              </div>
              <div className={styles.hourConditionText}>
                {hour.condition.text}
              </div>

              <div className={styles.humidity}>
                <Image width={16} height={16} src="/drop.png" alt="drop icon" />

                <span> {hour.humidity}&#37;</span>
              </div>
              <div className={styles.windDir}>
                <div>
                  <p>
                    {hour.wind_kph} <span>km/h</span>
                  </p>
                  <p>
                    {hour.wind_mph} <span>miles/h</span>
                  </p>
                </div>

                <Image
                  width={26}
                  height={26}
                  src="/wind-direction.png"
                  alt=""
                  style={{ transform: `rotate(${hour.wind_degree}deg)` }}
                />
              </div>
              <div className={styles.hourTime}>
                <p
                  className={`${styles.hourTimeText} ${
                    isCurrentHour ? styles.activeText : ""
                  } `}
                >
                  {hourTime}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
