export interface WeatherData {
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; humidity: number };
  sys: { country: string };
  wind: { speed: number };
  name: string;
}

export interface weatherInterface {
  weatherLoading: boolean;
  error: boolean;
  data: WeatherData | null; 
}