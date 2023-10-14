import styles from "./page.module.css";
import { API_KEY } from "@/utils/urls";
import { formatDateTime } from "@/utils/time";
import BackgroundVideo from "@/components/background-video/backgroundVideo";
import SunMoonTime from "@/components/sunMoonTime/sunMoonTime";

async function getWeather(city) {
  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Example function to map wind direction abbreviations to full forms
const windDirectionMap = {
  N: "North",
  NNE: "North-Northeast",
  NE: "Northeast",
  ENE: "East-Northeast",
  E: "East",
  ESE: "East-Southeast",
  SE: "Southeast",
  SSE: "South-Southeast",
  S: "South",
  SSW: "South-Southwest",
  SW: "Southwest",
  WSW: "West-Southwest",
  W: "West",
  WNW: "West-Northwest",
  NW: "Northwest",
  NNW: "North-Northwest",
};

function getFullWindDirection(abbreviation) {
  return windDirectionMap[abbreviation] || abbreviation;
}

export default async function City(slug) {
  const city = slug.searchParams.cityName;
  const data = await getWeather(city);
  const formattedDateTime = formatDateTime(data.location.localtime);
  const weatherConditionText = data ? data.current.condition.text : "";

  const lastUpdateTime = formatDateTime(data.current.last_updated);
  console.log(lastUpdateTime);

  const astro = data.forecast.forecastday[0].astro;
  return (
    <main>
      <div className={styles.page}>
        <div className={styles.firstRow}>
          <div className={styles.backgroundVideo}>
            {/* Use the BackgroundVideo component */}
            {/* <BackgroundVideo weatherConditionText={weatherConditionText} /> */}
            {/* Rest of your component */}
            <div className={styles.weatherReport}>
              <div className={styles.climate}>
                <h2 className={styles.city}>{data.location.name}</h2>
                <div className={styles.region}>
                  {data.location.region && (
                    <span>
                      {data.location.region}
                      {" | "}
                    </span>
                  )}
                  {data.location.country && (
                    <span>{data.location.country}</span>
                  )}
                </div>

                <h4 className={styles.current}>Current Weather</h4>
                <div className={styles.localTime}>{formattedDateTime}</div>

                <div className={styles.weatherContainer}>
                  <img
                    className={styles.weatherIcon}
                    src={data.current.condition.icon}
                    alt={data.current.condition.text}
                  />
                  <div className={styles.conditionContainer}>
                    <div className={styles.degree}>
                      <div>
                        <span className={styles.celsius}>
                          {data.current.temp_c}
                        </span>
                        <span className={styles.tempUnit}>&deg;C</span>
                      </div>
                      <div className={styles.divide}></div>
                      <div>
                        <span className={styles.fahrenheit}>
                          {data.current.temp_f}
                        </span>

                        <span className={styles.tempUnit}>&deg;F</span>
                      </div>
                    </div>
                    <div className={styles.condition}>
                      {data.current.condition.text}
                    </div>
                  </div>
                </div>
                <div className={styles.feelsLike}>
                  <p className={styles.feelhead}>Feels like :</p>

                  <p>
                    <span className={styles.feelsTemp}>
                      {data.current.feelslike_c}
                    </span>
                    <span className={styles.feelsTempUnit}>&deg;C</span>
                  </p>
                  <div className={styles.feelDivide}></div>
                  <p>
                    <span className={styles.feelsTemp}>
                      {data.current.feelslike_f}
                    </span>

                    <span className={styles.feelsTempUnit}>&deg;F</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* sun rise moon rise time */}

          <SunMoonTime astro={astro} />
        </div>
        <div className={styles.secondRow}>
          <div className={styles.dayNight}>
            <img
              className={styles.dayNightIcon}
              src={data.current.is_day ? "/day.png" : "/night.png"}
              alt="day night icon"
            />
            <p className={styles.boxText}>
              <span className={styles.boxTextFirst}>it's a </span>
              <span>{data.current.is_day ? "Day" : "Night"}</span>
            </p>
          </div>
          <div className={styles.humidity}>
            <img
              className={styles.humidityIcon}
              src="/humidity.png"
              alt="humidity icon"
            />
            <p className={styles.boxText}>
              <span className={styles.boxTextFirst}>Humidity </span>
              <span>{data.current.humidity}&#37;</span>
            </p>
          </div>
          <div className={styles.cloud}>
            <img className={styles.cloudIcon} src="/cloud.png" alt="" />
            <p className={styles.boxText}>
              <span className={styles.boxTextFirst}>Cloud </span>
              <span>{data.current.cloud}&#37;</span>
            </p>
          </div>
          <div className={styles.windSpeed}>
            <img
              className={styles.windSpeedIcon}
              src="/wind-speed.png"
              alt=""
            />
            <div className={styles.windSpeedText}>
              <span className={styles.windTextFirst}>Wind Speed</span>
              <span className={styles.windSpeedUnit}>
                <p>{data.current.wind_kph} km&#47;hr</p>
                <p>{data.current.wind_mph} miles&#47;hr</p>
              </span>
            </div>
          </div>
          <div className={styles.windDir}>
            <img
              className={styles.windDirIcon}
              src="/wind-direction.png"
              alt=""
              style={{ transform: `rotate(${data.current.wind_degree}deg)` }}
            />
            <div className={styles.dirBoxText}>
              <span className={styles.boxTextFirst}>Wind dir </span>
              <span>{data.current.wind_dir} &#124;</span>
              <span> {data.current.wind_degree}&deg;</span>
              <div className={styles.windDirText}>
                ({getFullWindDirection(data.current.wind_dir)})
              </div>
            </div>
          </div>
          <div className={styles.lastUpdate}>
            <p className={styles.lastUpdateFirst}>Last Updated</p>
            <p>{lastUpdateTime}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
