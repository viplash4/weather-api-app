import { generateCoords, multiplePointsFetch, getMinSunrise } from "./getTaskSunset";
import type  Coordinates  from './types/coordinates';
import type  SunriseSunsetData  from './types/sunriseSunsetData';


const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello user');
});

app.get('/ping', (req, res) => {
  res.send('Server is alive');
});
app.get('/sunsets/random', (req, res) => {
  try {
    const count = req.query.count;
    console.log(count);
    res.send(count);
  }
  catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
  
  
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


/*
(async () => {
  const coords: Coordinates[] = generateCoords(3);
  //console.log(coords);
  const data: SunriseSunsetData[] = await multiplePointsFetch(coords);
  console.log(data);
  const minSunrise = getMinSunrise(data);
  console.log(minSunrise);
})();
*/





/*(async () => {
    for (const chunk of chunks) {
      const promises = chunk.map(fetchData);
      const results = await Promise.all(promises);
      console.log("Processed chunk of coordinates:", chunk);
      console.log("Results:", results);

    }
  })();
  (async () => {
  const results = await fetchData({latitude: 36.7201600, longitude: -4.4203400})
  console.log(results);
  })
*/

/*
let earliestSunrise: string | null = null;
chunks.forEach(async (chunk) => {
  const results = await Promise.all(chunk.map(fetchData));
  results.forEach((result) => {
    if (!earliestSunrise || result.sunrise < earliestSunrise) {
      earliestSunrise = result.sunrise;
    }
  });
});
*/