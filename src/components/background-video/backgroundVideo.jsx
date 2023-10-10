'use client'
import React, { useEffect, useState } from "react";
import styles from "./backgroundVideo.module.css";

const weatherVideos = {
    "Clear": "/sun-clear-weather.mp4",
    "Partly cloudy": "/cloudy-weather.mp4",
    "Light rain": "/night-rain.mp4",
    // Add more conditions and video sources as needed
};

export default function BackgroundVideo({ weatherConditionText }) {
    const [videoSource, setVideoSource] = useState();

    useEffect(() => {
        const newVideoSource = weatherVideos[weatherConditionText] || "/default-video.mp4";
        setVideoSource(newVideoSource);
        console.log("condition:", newVideoSource);
    }, [weatherConditionText]);


    return (
        <video key={videoSource} autoPlay loop muted className={styles.video}>
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}


