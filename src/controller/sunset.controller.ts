import type Coordinates from '../types/coordinates';
import type {
    SunriseSunsetData,
    SunriseSunsetResponse,
} from '../types/sunriseSunsetData';
import { CustomError } from '../middlewares/ErrorHandler';
const API_URL = 'https://api.sunrise-sunset.org/json';

export const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
function isSunriseSunsetResponse(
    response: any
): response is SunriseSunsetResponse {
    return (
        typeof response?.results?.sunrise === 'string' &&
        typeof response.results?.sunset === 'string' &&
        typeof response?.results?.day_length === 'number'
    );
}
export const fetchData = async (
    coord: Coordinates,
    delay = 0
): Promise<SunriseSunsetData> => {
    await wait(delay);
    const date = new Date();
    const lat = coord.latitude;
    const lng = coord.longitude;
    const url = `${API_URL}?lat=${lat}&lng=${lng}&date=${date
        .toISOString()
        .slice(0, 10)}&formatted=0`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok || !isSunriseSunsetResponse(data)) {
        console.log(data);
        throw new CustomError(
            500,
            `Failed to fetch sunrise/sunset times for ${lat}, ${lng}`
        );
    }
    const { sunrise, sunset, day_length } = data.results;

    return { sunrise, sunset, day_length };
};
export const getRandomCoords = () => {
    const lat = Math.random() * (90 + 90) - 90;
    const long = Math.random() * (180 + 180) - 180;
    return { latitude: lat, longitude: long };
};

export const generateCoords = (n: number) => {
    return Array.from({ length: n }, getRandomCoords);
};

export const multiplePointsFetch = async (
    coordinates: Coordinates[],
    chunkSize = 5,
    delay = 0
) => {
    const results: SunriseSunsetData[] = [];
    for (let i = 0; i < coordinates.length; i += chunkSize) {
        const chunk = coordinates.slice(i, i + chunkSize);
        const promises = chunk.map((coord) => fetchData(coord, delay));
        const chunkResults = await Promise.all(promises);
        results.push(...chunkResults);
    }
    return results;
};

export const getMinSunrise = (sunriseSunsetData: SunriseSunsetData[]) => {
    const initialData = sunriseSunsetData[0];
    const minSunrise = sunriseSunsetData.reduce((acc, curr) => {
        if (curr.sunrise < acc.sunrise && curr.day_length !== 0) {
            return curr;
        }

        return acc;
    }, initialData);
    return [minSunrise.sunrise, minSunrise.day_length];
};
export const getMaxSunrise = (sunriseSunsetData: SunriseSunsetData[]) => {
    const initialData = sunriseSunsetData[0];
    const maxSunrise = sunriseSunsetData.reduce((acc, curr) => {
        if (curr.sunrise > acc.sunrise && curr.day_length !== 0) {
            return curr;
        }

        return acc;
    }, initialData);
    return [maxSunrise.sunrise, maxSunrise.day_length];
};
