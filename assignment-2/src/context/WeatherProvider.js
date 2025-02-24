'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from '@/context/LocationProvider';
import axios from 'axios';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const { location } = useLocation();
    const [current, setCurrent] = useState({
        temperature: 0,
        wind: 0,
        precipitation: 0,
    });
    const [hourly, setHourly] = useState({
        temperature: [],
        wind: [],
        precipitation: [],
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!location) return;

        const fetchWeather = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get("https://api.open-meteo.com/v1/forecast", {
                    params: {
                        latitude: location.lat || 4.21, // Guna default kalau tiada location
                        longitude: location.lon || 101.97,
                        hourly: "temperature_2m,precipitation_probability,wind_speed_10m",
                        timezone: "Asia/Singapore",
                        forecast_days: 1
                    }
                });

                setCurrent({
                    temperature: data.hourly.temperature_2m[0],
                    wind: data.hourly.wind_speed_10m[0],
                    precipitation: data.hourly.precipitation_probability[0],
                });

                setHourly({
                    temperature: data.hourly.temperature_2m,
                    wind: data.hourly.wind_speed_10m,
                    precipitation: data.hourly.precipitation_probability,
                });

            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    return (
        <WeatherContext.Provider value={{ current, hourly, isLoading }}>
            {children}
        </WeatherContext.Provider>
    );
}

export function useWeather() {
    return useContext(WeatherContext);
}
