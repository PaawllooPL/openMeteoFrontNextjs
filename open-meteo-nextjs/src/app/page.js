"use client"
// import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.css'
import styles from "./page.module.css";
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MessageBox from '@/components/messageBox';

async function LoadWeekWeatherData(latitude, longitude) {
  const baseApiUrl = "https://openmeteoapp.onrender.com/api/v1/weather/7days?";

  const weatherData = await fetch(baseApiUrl + `latitude=${latitude.toFixed(4)}&longitude=${longitude.toFixed(4)}`).then(res => res.json());
  return weatherData;
}
function PopulateTable(tableHeadRef, tableBodyRef, weatherData) {
  //date
  let tr_date = document.createElement("tr");
  let td_date_header = document.createElement("td");
  td_date_header.innerText = "Date";
  tr_date.appendChild(td_date_header);

  for (let date of weatherData.date) {
      let td_date = document.createElement("td");
      td_date.innerText = date.replaceAll("-", "/");
      tr_date.appendChild(td_date);
  }
  tableHeadRef.current.appendChild(tr_date);

  //max temp
  let tr_maxTemp = document.createElement("tr");
  let td_maxTemp_header = document.createElement("td");
  td_maxTemp_header.innerText = "Max temperature (C)";
  tr_maxTemp.appendChild(td_maxTemp_header);

  for (let maxTemp of weatherData.max_temp) {
      let td_maxTemp = document.createElement("td");
      td_maxTemp.innerText = maxTemp;
      tr_maxTemp.appendChild(td_maxTemp);
  }
  tableBodyRef.current.appendChild(tr_maxTemp);

  //min temp
  let tr_minTemp = document.createElement("tr");
  let td_minTemp_header = document.createElement("td");
  td_minTemp_header.innerText = "Min temperature (C)";
  tr_minTemp.appendChild(td_minTemp_header);

  for (let minTemp of weatherData.min_temp) {
      let td_minTemp = document.createElement("td");
      td_minTemp.innerText = minTemp;
      tr_minTemp.appendChild(td_minTemp);
  }
  tableBodyRef.current.appendChild(tr_minTemp);

  //generated energy
  let tr_generatedEnergy = document.createElement("tr");
  let td_generatedEnergy_header = document.createElement("td");
  td_generatedEnergy_header.innerText = "Generated Energy (Kwh)";
  tr_generatedEnergy.appendChild(td_generatedEnergy_header);

  for (let generatedEnergy of weatherData.generated_energy) {
      let td_generatedEnergy = document.createElement("td");
      td_generatedEnergy.innerText = generatedEnergy;
      tr_generatedEnergy.appendChild(td_generatedEnergy);
  }
  tableBodyRef.current.appendChild(tr_generatedEnergy);

  //weather
  let tr_weather = document.createElement("tr");
  let td_weather_header = document.createElement("td");
  td_weather_header.innerText = "Weather";
  tr_weather.appendChild(td_weather_header);

  for (let weatherCode of weatherData.weather_code) {
      let td_weather = document.createElement("td");
      //function to return HTML code with weather icon path
      // td_weather.innerHTML = AssignIconInnerHTMLBasedOnWeather(weatherCode);
      // tr_weather.appendChild(td_weather);
  }
  tableBodyRef.current.appendChild(tr_weather);
}
export default function Home() {
  const checkWeatherButtonRef = useRef(null);
  const darkModeButton = useRef(null);
  const messageBoxRef = useRef(null);
  const messageTextRef = useRef(null);
  
  const tableHeadRef = useRef(null);
  const tableBodyRef = useRef(null);


  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [message, setMessage] = useState();  
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
            // setLocation({ latitude, longitude });
            setHiddenCheckWeather(false);
            // checkWeatherButtonRef.current.;
            
        }, () => {
          messageTextRef.current.innerText = "Declined location service. Allow or refresh.";
          setHiddenMessageBox(false);
        });
    }
}, []);

  return (
    <main className={`${styles.main} ${darkMode ? "bg-dark" : ""}`}>
      <div className={`${styles.top_bar} ${darkMode ? styles.background_dark_gray : ""}`}>
        <h1 className={darkMode ? "text-light" : ""}>
          Weather App
        </h1>
      </div>
      <div className={`${styles.dark_mode_button_container}`}>
        <div className={`${styles.dark_mode_button_container}`}>
          <button className={`btn ${darkMode ? "bg-secondary text-light" : "bg-dark text-light"} col-8 col-xl-12 shadow-none d-block`} id="dark_mode_button" ref={darkModeButton} onClick={() => {setDarkMode(!darkMode)}}>
            Dark mode on/off
          </button>
        </div>
      </div>
      <MessageBox messageBox={messageBoxRef} messageText={messageTextRef} className={hiddenMessageBox ? "d-none" : "d-flex"} />

      <div className={`${styles.check_weather_container}`}>
        <h3 id='check_weather_header' className={`${darkMode ? "text-light" : ""}`}>Check weather</h3>
        <button id='check_weather_button' className={`btn btn-primary ${hiddenCheckWeather ? "d-none" : "d-block"}`} ref={checkWeatherButtonRef} onClick={async () => {
          //onclick
          messageTextRef.current.innerText = "Loading weather data...";
          setHiddenMessageBox(false)
          
          tableBodyRef.current.innerHTML = "";
          tableHeadRef.current.innerHTML = "";

          console.log(latitude.toFixed(4));
          console.log(longitude.toFixed(4))
          const weatherData = await LoadWeekWeatherData(latitude, longitude);
          PopulateTable(tableHeadRef, tableBodyRef, weatherData);

          setHiddenMessageBox(true);
        }}>
          Click Me !
        </button>
      </div>

      <div className='row'>
        <div className='table-responsive'>
          <table className={`table ${darkMode ? "table-dark" : ""}`} id='weather-table'>
            <thead id='weather-table-head' ref={tableHeadRef}>
              <tr>
                <td>Date</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody id='weather-table-body' ref={tableBodyRef}>
              <tr>
                <td className='w-25'>Max temperature (C)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Min temperature (C)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Generated energy (Kwh)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Weather</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
