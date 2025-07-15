import axios from 'axios';
import { City } from '../types/weatherTypes';

const API_KEY = 'd14eaec94a616886e05c4d11eeadf0bb';
const BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct';

export const searchCities = async (query: string): Promise<City[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
};