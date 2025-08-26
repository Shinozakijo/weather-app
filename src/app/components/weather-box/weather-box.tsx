import React from "react";
import styles from "./weather-box.module.css";
import type { WeatherData } from "@/types/weather";

type Props = {
    weather: WeatherData
}

export default function WeatherBox({ weather }: Props) {
    return (
        <div className={styles.box}>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Description: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
    )
}