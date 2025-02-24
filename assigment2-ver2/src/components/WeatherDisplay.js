import styles from "../styles/globals.css";


export default function WeatherDisplay({ data, type }) {
    return (
        <div className={styles.weatherDisplay}>
            <h1 className={styles.bigTemperature}>{data[0]}°C</h1>
            <ul>
                {data.map((value, index) => (
                    <li key={index} className={styles.weatherItem}>
                        {index}:00 - {value} {type === "Temperature" ? "°C" : type === "Wind Speed" ? "m/s" : "%"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
