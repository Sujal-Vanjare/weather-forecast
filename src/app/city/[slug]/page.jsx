import styles from "./page.module.css";
import { API_KEY } from "@/utils/urls";
import { formatDateTime } from "@/utils/time";
import BackgroundVideo from "@/components/background-video/backgroundVideo";



async function getWeather(city) {
    const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function City(slug) {
    const city = slug.searchParams.cityName
    const data = await getWeather(city);
    const formattedDateTime = formatDateTime(data.location.localtime);
    const weatherConditionText = data ? data.current.condition.text : "";


    return (
        <main>

            <div className={styles.page}>
                <div className={styles.backgroundVideo}>
                    {/* Use the BackgroundVideo component */}
                    <BackgroundVideo weatherConditionText={weatherConditionText} />
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
                                {data.location.country && <span>{data.location.country}</span>}
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
                        </div>
                    </div>
                </div>





            </div>
        </main>
    );
}
