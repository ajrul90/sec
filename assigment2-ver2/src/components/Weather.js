"use client";

import { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";
import styles from "../styles/globals.css"; // Import CSS Module

export default function Weather() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("Temperature"); // Tab aktif

    const fetchWeather = async () => {
        if (!latitude || !longitude) {
            alert("Please enter latitude and longitude.");
            return;
        }

        setLoading(true);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,wind_speed_10m&hourly=temperature_2m,precipitation_probability,wind_speed_10m&forecast_days=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData({
                temperature: data.hourly.temperature_2m,
                windSpeed: data.hourly.wind_speed_10m,
                precipitation: data.hourly.precipitation_probability,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch data");
        }

        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <button
                    className={`${styles.tabButton} ${activeTab === "Temperature" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("Temperature")}
                >
                    Temperature
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "Precipitation" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("Precipitation")}
                >
                    Precipitation
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "Wind Speed" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("Wind Speed")}
                >
                    Wind speed
                </button>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                    <button onClick={fetchWeather} disabled={loading} className={styles.submitButton}>
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </div>

                {weatherData && (
                    <>
                        {activeTab === "Temperature" && (
                            <WeatherDisplay data={weatherData.temperature} type="Temperature" />
                        )}
                        {activeTab === "Wind Speed" && (
                            <WeatherDisplay data={weatherData.windSpeed} type="Wind Speed" />
                        )}
                        {activeTab === "Precipitation" && (
                            <WeatherDisplay data={weatherData.precipitation} type="Precipitation" />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
