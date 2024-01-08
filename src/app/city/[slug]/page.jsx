import styles from "./page.module.css";
import { API_KEY } from "@/utils/urls";
import { formatDateTime, formatDateOnly, extractTime } from "@/utils/time";
import SunMoonTime from "@/components/sunMoonTime/sunMoonTime";
import Image from "next/image";
import HourlyForecast from "@/components/hourlyForecast/hourlyForecast";
import siteMetadata from "@/utils/siteMetaData";

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

export async function generateMetadata(slug) {
  const city = slug.searchParams.cityName;
  const data = await getWeather(city);

  if (!data) {
    return;
  }
  const queryString = `${slug.params.slug}?cityName=${slug.searchParams.cityName}`;
  const formattedTime = new Date(data.current.last_updated).toISOString();

  return {
    title: `${data.location.name} | ${data.location.country} `,
    description: `Get the latest weather forecast for ${data.location.name}, ${data.location.country}. Explore current conditions, daily and hourly forecasts, climate details, and more. Stay informed with accurate and up-to-date weather information.`,
    keywords: [
      "weather",
      "weather forecast",
      `${data.location.name} local weather`,
      `${data.location.name} forecast`,
      `${data.location.name} daily forecast`,
      `${data.location.name} hourly forecast`,
      `${data.location.name} climate`,
      `${data.location.name} temperature`,
      `${data.location.name} humidity`,
      `${data.location.name} wind speed`,
      `${data.location.name} precipitation`,
      `${data.location.name} weather conditions`,
      `${data.location.name} meteorology`,
      `${data.location.name} weather updates`,
      `${data.location.name} weather information`,
      `${data.location.name} weather report`,
      `${data.location.name} sunrise and sunset times`,
    ],
    openGraph: {
      title: `${data.location.name} | ${data.location.country} `,
      description: `Get the latest weather forecast for ${data.location.name}, ${data.location.country}. Explore current conditions, daily and hourly forecasts, climate details, and more. Stay informed with accurate and up-to-date weather information.`,

      url: siteMetadata.siteUrl + "/city/" + queryString,
      siteName: siteMetadata.title,

      locale: "en_US",
      type: "article",
      publishedTime: formattedTime,
      modifiedTime: formattedTime,
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.location.name} | ${data.location.country} `,
      description: `Get the latest weather forecast for ${data.location.name}, ${data.location.country}. Explore current conditions, daily and hourly forecasts, climate details, and more. Stay informed with accurate and up-to-date weather information.`,

      images: [siteMetadata.socialBanner],
    },
  };
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

  const lastUpdateTime = formatDateTime(data.current.last_updated);

  const astro = data.forecast.forecastday[0].astro;

  const forecastDate = formatDateOnly(data.forecast.forecastday[0].date);
  const forecast = data.forecast.forecastday[0].day;
  const hourlyForecastData = data.forecast.forecastday[0].hour;

  // for google
  const formattedTime = new Date(data.current.last_updated).toISOString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: `${data.location.name} | ${data.location.country} `,
    description: `Get the latest weather forecast for ${data.location.name}, ${data.location.country}. Explore current conditions, daily and hourly forecasts, climate details, and more. Stay informed with accurate and up-to-date weather information.`,

    image: [siteMetadata.socialBanner],
    datePublished: formattedTime,
    dateModified: formattedTime,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <div className={styles.page}>
          <div className={styles.firstRow}>
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
                  <Image
                    width={100}
                    height={100}
                    src={`https:${data.current.condition.icon}`}
                    alt={data.current.condition.text}
                    className={styles.currentConditionIcon}
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
                <div className={styles.lastUpdated}>
                  <span>Last Updated : </span>
                  <span> {lastUpdateTime}</span>
                </div>
              </div>
            </div>

            {/* sun rise moon rise time */}

            <SunMoonTime astro={astro} />
          </div>
          <div className={styles.secondRow}>
            <div className={styles.dayNight}>
              <Image
                width={86}
                height={86}
                className={styles.dayNightIcon}
                src={data.current.is_day ? "/day.png" : "/night.png"}
                alt="day night icon"
              />

              <p className={styles.boxText}>
                <span className={styles.boxTextFirst}>it&apos;s a </span>
                <span>{data.current.is_day ? "Day" : "Night"}</span>
              </p>
            </div>
            <div className={styles.humidity}>
              <Image
                width={73}
                height={73}
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
              <Image
                width={73}
                height={73}
                className={styles.cloudIcon}
                src="/cloud.png"
                alt="cloud icon"
              />
              <p className={styles.boxText}>
                <span className={styles.boxTextFirst}>Cloud </span>
                <span>{data.current.cloud}&#37;</span>
              </p>
            </div>
            <div className={styles.windSpeed}>
              <Image
                width={55}
                height={55}
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
              <Image
                width={45}
                height={45}
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
            <div className={styles.boxVisibility}>
              <Image
                width={55}
                height={55}
                className={styles.boxVisibilityIcon}
                src="/visibility.png"
                alt=""
              />
              <div className={styles.boxVisibilityText}>
                <span className={styles.boxTextFirst}>Visibility </span>
                <span>
                  <p>{data.current.vis_km} km</p>
                  <p>{data.current.vis_miles} miles</p>
                </span>
              </div>
            </div>
          </div>

          <h2 className={styles.forecastText}>
            Forecast{" "}
            <span className={styles.forecastDate}> for {forecastDate}</span>
          </h2>
          <div className={styles.thirdRow}>
            <div className={styles.temperatures}>
              <div className={styles.maxTemp}>
                <span className={styles.forecastBoxText}>
                  Max temp today &#58;{" "}
                </span>
                <span className={styles.forecastBoxUnit}>
                  <span> {forecast.maxtemp_c} </span>
                  <span className={styles.feelsTempUnit}>&deg;C</span>
                  <span className={styles.maxTempDivide}></span>
                  <span> {forecast.maxtemp_f} </span>
                  <span className={styles.feelsTempUnit}>&deg;F</span>
                </span>
              </div>
              <div className={styles.minTemp}>
                <span className={styles.forecastBoxText}>
                  Min temp today &#58;{" "}
                </span>
                <span className={styles.forecastBoxUnit}>
                  <span> {forecast.mintemp_c} </span>
                  <span className={styles.feelsTempUnit}>&deg;C</span>
                  <span className={styles.maxTempDivide}></span>
                  <span> {forecast.mintemp_f} </span>
                  <span className={styles.feelsTempUnit}>&deg;F</span>
                </span>
              </div>
              <div className={styles.minTemp}>
                <span className={styles.forecastBoxText}>
                  avg temp today &#58;{" "}
                </span>
                <span className={styles.forecastBoxUnit}>
                  <span> {forecast.avgtemp_c} </span>
                  <span className={styles.feelsTempUnit}>&deg;C</span>
                  <span className={styles.maxTempDivide}></span>
                  <span> {forecast.avgtemp_f} </span>
                  <span className={styles.feelsTempUnit}>&deg;F</span>
                </span>
              </div>
            </div>
            <div className={styles.windHumidity}>
              <div className={styles.wind}>
                <span className={styles.forecastBoxText}>
                  Max wind speed &#58;{" "}
                </span>
                <span className={styles.forecastBoxUnit}>
                  <p>{forecast.maxwind_kph} km&#47;hr</p>
                  <p>{forecast.maxwind_mph} miles&#47;hr</p>
                </span>
              </div>
              <div className={styles.visibility}>
                <span className={styles.forecastBoxText}>
                  Average visibility &#58;{" "}
                </span>
                <span className={styles.forecastBoxUnit}>
                  <p>{forecast.avgvis_km} km</p>
                  <p>{forecast.avgvis_miles} miles</p>
                </span>
              </div>
              <div className={styles.avgHumidity}>
                <span className={styles.forecastBoxText}>
                  Average humidity &#58;{" "}
                </span>
                <span className={styles.forecastBoxUnit}>
                  {forecast.avghumidity} &#37;
                </span>
              </div>
            </div>
            <div className={styles.chancesOff}>
              <div className={styles.rain}>
                <div>
                  <span className={styles.forecastBoxText}>
                    Will it Rain today &#58;{" "}
                  </span>
                  <span className={styles.forecastBoxUnit}>
                    {forecast.daily_will_it_rain ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <span className={styles.forecastBoxText}>
                    Chance of rain &#58;{" "}
                  </span>
                  <span className={styles.forecastBoxUnit}>
                    {forecast.daily_chance_of_rain} &#37;
                  </span>
                </div>
              </div>
              <div className={styles.snow}>
                <div>
                  <span className={styles.forecastBoxText}>
                    Will it Snow today &#58;{" "}
                  </span>
                  <span className={styles.forecastBoxUnit}>
                    {forecast.daily_will_it_snow ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <span className={styles.forecastBoxText}>
                    Chance of Snow &#58;{" "}
                  </span>
                  <span className={styles.forecastBoxUnit}>
                    {forecast.daily_chance_of_snow} &#37;
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.forecastCondition}>
              <Image
                width={90}
                height={90}
                src={`https:${forecast.condition.icon}`}
                alt={forecast.condition.text}
                className={styles.forecastConditionIcon}
              />
              <p className={styles.conditionWill}>Conditions will be</p>
              <p className={styles.conditionText}>{forecast.condition.text}</p>
            </div>
          </div>

          <h2 className={styles.forecastText}>Hourly Forecast </h2>
          <HourlyForecast
            hourlyForecastData={hourlyForecastData}
            currentTime={extractTime(formattedDateTime)}
          />
        </div>
      </main>{" "}
    </>
  );
}
