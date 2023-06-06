import React, { useState } from "react";
import "./Weather.css";

type WeatherData = {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string }[];
};

const Weather = () => {
  // 都市名、天気情報の状態管理
  const [city, setCity] = useState("");
  const [WeatherData, setWeatherData] = useState<WeatherData | null>(null);

  // APIの取得
  const fetchWeather = async (city: string) => {
    const apiKey = process.env.REACT_APP_Weather_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data: WeatherData = await response.json();

    data.main.temp = data.main.temp - 273.15;
    setWeatherData(data);
  };

  // フォームが送信されたらfetchWeather関数を実行する。ページのレンダリングはevent.preventDefault();でキャンセルする。
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchWeather(city);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={city}
          // 値が変わる度、地域の状態を更新する
          onChange={(e) => setCity(e.target.value)}
          placeholder="例：東京"
        />
        <button type="submit">検索</button>
      </form>
      {/* WeatherDataがtrueの場合天気情報を表示する */}
      {WeatherData && (
        <div className="weather-info">
          <h2>{WeatherData.name}</h2>
          <p>
            Temperature: {WeatherData.main.temp.toFixed(2)}°C Humidity:{" "}
            {WeatherData.main.humidity}% Description:{" "}
            {WeatherData.weather[0].description}
          </p>
        </div>
      )}
    </>
  );
};

export default Weather;
