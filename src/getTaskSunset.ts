import type Coordinates from "./types/coordinates";
import type SunriseSunsetData from "./types/sunriseSunsetData";

const API_URL = "https://api.sunrise-sunset.org/json";


export const wait = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchData = async (coord: Coordinates, delay = 0) => {
    await wait(delay);
    const date = new Date();
    const lat = coord.latitude;
    const lng = coord.longitude;
    const url = `${API_URL}?lat=${lat}&lng=${lng}&date=${date.toISOString().slice(0, 10)}&formatted=0`;
    const response =  await fetch(url);
    const data = await response.json();
    const { sunrise, sunset, day_length} = data.results;
    return { sunrise, sunset, day_length };
      //.catch(error => console.error(error));
}
export const getRandomCoords = () => {
    const lat = Math.random() * (90 + 90) - 90;
    const long = Math.random() * (180 + 180) - 180;
    return { latitude: lat, longitude: long }
}

export const generateCoords = (n: number) => {
    return Array.from({ length: n }, getRandomCoords);
}

export const multiplePointsFetch = async (coordinates: Coordinates[],chunkSize = 5, delay = 0) =>{
    const results: SunriseSunsetData[] = [];
    for (let i = 0; i < coordinates.length; i += chunkSize) {
        const chunk = coordinates.slice(i, i + chunkSize);
        const promises = chunk.map(coord => fetchData(coord, delay));
        const chunkResults = await Promise.all(promises);
        results.push(...chunkResults);
    }
    
    /*
    for (const chunk of chunks) {
        const promises = chunk.map(coord => fetchData(coord, delay));
        const chunkResults = await Promise.all(promises);
        results.push(...chunkResults);
    }
    */
    return results;
    
}

export const getMinSunrise = (sunriseSunsetData: SunriseSunsetData[]) => {

  const initialData = sunriseSunsetData[0];
  const minSunrise = sunriseSunsetData.reduce((acc, curr) => {
    if (curr.sunrise < acc.sunrise && curr.day_length !== 0) {
      
      return curr;
    } 
    
    return acc;
  }, initialData);
  return [minSunrise.sunrise, minSunrise.day_length];

  //return [sortedData[0].sunrise, sortedData[0].day_length];
}
/*
getMinSunrise working version ->

const sortedData = sunriseSunsetData.sort((a, b) => {
    const aSunrise = new Date(`1970-01-01T${a.sunrise}`);
    const bSunrise = new Date(`1970-01-01T${b.sunrise}`);
    return aSunrise.getTime() - bSunrise.getTime();
  });
  return sortedData[0].sunrise;




export const convertSunriseToTime = (sunrise: string): Date | null => {
    const sunriseParts = sunrise.split(":");
    if (sunriseParts.length !== 3) {
      return null;
    }
  
    const hours = parseInt(sunriseParts[0]);
    const minutes = parseInt(sunriseParts[1]);
    const seconds = parseInt(sunriseParts[2]);
  
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return null;
    }
  
    const today = new Date();
    const sunriseDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes,
      seconds
    );
    return sunriseDate;
};

export const getMinSunrise = (results: SunriseSunsetData[]): Date | null => {
    let minSunrise: Date | null = null;
    for (const result of results) {
      const sunrise = result.sunrise;
      if (sunrise != null) {
        const sunriseDate = convertSunriseToTime(sunrise);
        if (sunriseDate != null) {
          if (minSunrise == null || sunriseDate < minSunrise) {
            minSunrise = sunriseDate;
          }
        }
      }
    }
    return minSunrise;
};
*/
