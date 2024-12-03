import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import clear from '../assets/clear.png'
import search_icon from '../assets/search_icon.png'
import clouds from '../assets/clouds.png'
import dizzle from '../assets/dizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {
    const inputRef=useRef()
    const [weatherData,setWeatherData]= useState(false);
    const allIcons={
      "01d":clear,
      "01n":clear,
      "02d":clouds,
      "02n":clouds,
      "03d":clouds,
      "03n":clouds,
      "04d":dizzle,
      "04n":dizzle,
      "09d":rain,
      "09n":rain,
      "10d":rain,
      "10n":rain,
      "13d":snow,
      "13n":snow,

    }

    const search = async (city)=>{
      if(city===""){
        alert("Please Enter City Name");
        return;
      }
       try {
        const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok){
          alert(data.message);
          return;
        }
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear;
        setWeatherData({
          humidity:data.main.humidity,
          windSpeed:data.wind.speed,
          temperature:Math.floor(data.main.temp),
          location:data.name,
          icon:icon
        })
       } catch (error) {
          setWeatherData(false);
          console.error("Error in fetching the Data");
          
       }
    }
       useEffect(()=>{
        search("Dhanbad");
       },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt="" className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity} alt="" />
            <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind} alt="" />
            <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>

        </>:<></>}
    </div>
  )
}


export default Weather
