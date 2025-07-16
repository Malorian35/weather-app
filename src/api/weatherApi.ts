import axios from 'axios';
import { CurrentWeatherData, DailyForecastData } from '../types/weatherTypes';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (lat: number, lon: number) => {
  if (!API_KEY) throw new Error('API key is not configured');
  
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=ru`),
      axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=ru&cnt=40`)
    ]);

    const dailyForecast = processForecastData(forecastResponse.data.list);

    return {
      current: currentResponse.data,
      daily: dailyForecast.slice(1, 6) 
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const processForecastData = (threeHourData: any[]): DailyForecastData[] => {
  const dailyData: Record<string, DailyForecastData> = {};

  threeHourData.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString('ru-RU');
    
    if (!dailyData[date]) {
      dailyData[date] = {
        dt: item.dt,
        temp: {
          day: item.main.temp,
          night: item.main.temp, 
          min: item.main.temp_min,
          max: item.main.temp_max
        },
        weather: [item.weather[0]],
        wind_speed: item.wind.speed,
        humidity: item.main.humidity,
        pressure: item.main.pressure
      };
    } else {
      const hours = new Date(item.dt * 1000).getHours();
      if (hours >= 18) {
        dailyData[date].temp.night = item.main.temp;
      }
      
      dailyData[date].temp.min = Math.min(dailyData[date].temp.min, item.main.temp_min);
      dailyData[date].temp.max = Math.max(dailyData[date].temp.max, item.main.temp_max);
      
      if (hours >= 11 && hours <= 13) {
        dailyData[date].weather = [item.weather[0]];
      }
    }
  });

  return Object.values(dailyData);
};