import axios from 'axios';
import { City } from '../types/weatherTypes';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'http://api.openweathermap.org/geo/1.0';

export const searchCities = async (query: string): Promise<City[]> => {
  if (!API_KEY) throw new Error('API key is not configured');
  
  try {
    const response = await axios.get(
      `${BASE_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    return response.data.map((city: any) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
};