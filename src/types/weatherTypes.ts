export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  name?: string;
}

export interface DailyForecastData {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  weather: Weather[];
  wind_speed: number;
  summary?: string;
}

export interface WeatherApiResponse {
  current: CurrentWeatherData;
  daily: DailyForecastData[];
}

export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}