export interface WeatherGeoCoordinates {
  name: string;
  local_names: object;
  lat: number;
  lon: number;
  state: string;
  country: string;
}

export interface CurrentWeather {
  weather: Array<{
    id: number;
    main: string;
    description: string;
  }>;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  dt: number;
  calculation_date?: Date;
}
