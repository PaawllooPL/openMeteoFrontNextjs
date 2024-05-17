import styles from "@/app/page.module.css"
import Image from "next/image";
export default function CheckWeatherField({ darkMode, hiddenCheckWeather, checkWeatherButtonRef, messageTextRef, setHiddenMessageBox, latitude, longitude, tableHeadRef, tableBodyRef }) {
    return (
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
    );
}


async function LoadWeekWeatherData(latitude, longitude) {
    const baseApiUrl = "https://openmeteoapp.onrender.com/api/v1/weather/7days?";

    const weatherData = await fetch(baseApiUrl + `latitude=${latitude.toFixed(4)}&longitude=${longitude.toFixed(4)}`).then(res => res.json());
    return weatherData;
}
function AssignIconSrcPathBasedOnWeather(weatherCode) {
    if (weatherCode == 0)
        return "";
    if (weatherCode < 4)
        return `<img class="icon" width="30" src="/cloud_sun_solid.svg"/>`;

    if (weatherCode == 45 || weatherCode == 48)
        return `<img class="icon" width="30" src="/smog_solid.svg"/>`;

    if (weatherCode == 51 || weatherCode == 53 || weatherCode == 55)
        return `Drizzle`;

    if (weatherCode == 56 || weatherCode == 57)
        return `Freezing Drizzle`;

    if (weatherCode == 61 || weatherCode == 63 || weatherCode == 65)
        return `<img class="icon" width="30" src="/cloud-rain-solid.svg"/>`;

    if (weatherCode == 66 || weatherCode == 67)
        return `Freezing Rain`;

    if (weatherCode == 71 || weatherCode == 73 || weatherCode == 75)
        return `<img class="icon" width="30" src="/snowflake-regular.svg"/>`;

    if (weatherCode == 77)
        return `<img class="icon" width="30" src="/snowflake-regular.svg"/>`;

    if (weatherCode == 80 || weatherCode == 81 || weatherCode == 82)
        return `<img class="icon" width="30" src="/cloud-showers-water-solid.svg"/>`;

    if (weatherCode == 85 || weatherCode == 86)
        return `<img class="icon" width="30" src="/snowflake-regular.svg"/>`;

    if (weatherCode == 95)
        return `<img class="icon" width="30" src="/cloud-showers-water-solid.svg"/>`;

    if (weatherCode == 96 || weatherCode == 99)
        return `<img class="icon" width="30" src="/cloud-bolt-solid.svg"/>`;

    return "No data";
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
        td_weather.innerHTML = AssignIconSrcPathBasedOnWeather(weatherCode);
        tr_weather.appendChild(td_weather);
    }
    tableBodyRef.current.appendChild(tr_weather);
}
