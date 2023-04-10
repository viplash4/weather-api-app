export interface SunriseSunsetData {
    sunrise: string;
    sunset: string;
    day_length: number;
}

export interface SunriseSunsetResponse {
    results: SunriseSunsetData;
}
