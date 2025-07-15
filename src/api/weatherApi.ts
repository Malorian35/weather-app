import axios from 'axios';
import { WeatherData } from '../types/weatherTypes';

const API_KEY = 'd14eaec94a616886e05c4d11eeadf0bb'; 
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        exclude: 'minutely,hourly,alerts',
        units: 'metric',
        lang: 'ru',
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};