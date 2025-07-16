export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface CurrentWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  dt: number;
}

export interface DailyForecastData {
  dt: number;
  temp: {
    day: number;
    night: number;
    min: number;
    max: number;
  };
  weather: Weather[];
  wind_speed: number;
  humidity: number;
  pressure: number;
}