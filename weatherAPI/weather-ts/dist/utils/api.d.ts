export interface WeatherData {
    city: string;
    temperature: number;
    weather: string;
}
export declare function getWeatherByCity(city: string): Promise<WeatherData>;
export declare function getWeatherByCoords(latitude: number, longitude: number): Promise<WeatherData>;
//# sourceMappingURL=api.d.ts.map