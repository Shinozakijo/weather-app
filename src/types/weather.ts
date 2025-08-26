export interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number };
};