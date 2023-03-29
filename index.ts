const apiUrl = "https://api.sunrise-sunset.org/json";
const date = new Date();

interface Coordinates {
  latitude: number;
  longitude: number;
}
/*
const lat = 37.7749;
const lng = -122.4194;

const url = `${apiUrl}?lat=${lat}&lng=${lng}&date=${date.toISOString().slice(0, 10)}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    const { sunrise, sunset } = data.results;
    console.log(`Sunrise at ${sunrise}, Sunset at ${sunset}`);
  })
  .catch(error => console.error(error));
*/
/*
function getRandomCoord(): number {
  return Math.random() * 360 - 180;
}

function generateRandomCoords(n: number):[number,number][]{
  const coords: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    coords.push([getRandomCoord(), getRandomCoord()]);
  }
  return coords;
}
*/

const getRandomCoords = () => {
  const radius = 10000
  const x0 = 0
  const y0 = 0
  const u = Math.random()
  const v = Math.random()
  const w = radius * Math.sqrt(u)
  
  
  const x = w * Math.cos(2 * Math.PI * v)
  const y = w * Math.sin(2 * Math.PI * v)
  
  return { latitude: x + x0, longitude: y + y0 }
}

const coordinates = Array.from({ length: 100 }, getRandomCoords)

const fetchData = (coord: Coordinates) => {
  const date = new Date();
  const lat = coord.latitude;
  const lng = coord.longitude;
  const url = `${apiUrl}?lat=${lat}&lng=${lng}&date=${date.toISOString().slice(0, 10)}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const { sunrise, sunset } = data.results;
    console.log(`Sunrise at ${sunrise}, Sunset at ${sunset}`);
  })
  .catch(error => console.error(error));
}


