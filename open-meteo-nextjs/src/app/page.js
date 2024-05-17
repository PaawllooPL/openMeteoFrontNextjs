"use client"
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.css'
import styles from "./page.module.css";
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MessageBox from '@/components/messageBox';
import TopBar from '@/components/topBar';
import DarkModeButton from '@/components/darkModeButton';
import CheckWeatherField from '@/components/checkWeatherField';
import WeatherTable from '@/components/weatherTable';


export default function Home() {
  const checkWeatherButtonRef = useRef(null);
  const darkModeButton = useRef(null);
  const messageBoxRef = useRef(null);
  const messageTextRef = useRef(null);
  
  const tableHeadRef = useRef(null);
  const tableBodyRef = useRef(null);


  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  // const [message, setMessage] = useState();  
  const [darkMode, setDarkMode] = useState(false);
  const [hiddenCheckWeather, setHiddenCheckWeather] = useState(true);
  const [hiddenMessageBox, setHiddenMessageBox] = useState(true);

  useEffect(() => {
    if('geolocation' in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            setLongitude(longitude)
            setLatitude(latitude);
            setHiddenCheckWeather(false);
            
        }, () => {
          messageTextRef.current.innerText = "Declined location service. Allow or refresh.";
          setHiddenMessageBox(false);
        });
    }
}, []);

  return (
    <main className={`${styles.main} ${darkMode ? "bg-dark" : ""}`}>
      <TopBar darkMode={darkMode}/>
      <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} darkModeButtonRef={darkModeButton}/>
      <MessageBox messageBox={messageBoxRef} messageText={messageTextRef} className={hiddenMessageBox ? "d-none" : "d-flex"} />
      <CheckWeatherField 
        darkMode={darkMode} 
        hiddenCheckWeather={hiddenCheckWeather} 
        checkWeatherButtonRef={checkWeatherButtonRef}
        messageTextRef={messageTextRef}
        setHiddenMessageBox={setHiddenMessageBox}
        latitude={latitude}
        longitude={longitude}
        tableHeadRef={tableHeadRef}
        tableBodyRef={tableBodyRef}
      />
      <WeatherTable 
        darkMode={darkMode}
        tableHeadRef={tableHeadRef}
        tableBodyRef={tableBodyRef}
      />
    </main>
  );
}
