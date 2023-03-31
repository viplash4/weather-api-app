const apiUrl = "https://api.sunrise-sunset.org/json";
const date = new Date();

interface Coordinates {
  latitude: number;
  longitude: number;
}


const lat = 37.7749;
const lng = -122.4194;
const url = `${apiUrl}?lat=${lat}&lng=${lng}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    const { sunrise, sunset } = data.results;
    console.log(`Sunrise at ${sunrise}, Sunset at ${sunset}`);
  })
  .catch(error => console.error(error));