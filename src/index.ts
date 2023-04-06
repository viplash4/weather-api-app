import { generateCoords, multiplePointsFetch, getMinSunrise, getMaxSunrise } from "./getTaskSunset";
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
    (async () => {
      const coords: Coordinates[] = generateCoords(count);
      const data: SunriseSunsetData[] = await multiplePointsFetch(coords);
      //console.log(data);
      res.send(data);
    })();
    

  }
  catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/sunsets/filter', (req, res) => {
  try {
    const count = req.query.count;
    const filter = req.query.filter;
    (async () => {
      const coords: Coordinates[] = generateCoords(count);
      const data: SunriseSunsetData[] = await multiplePointsFetch(coords);
      //console.log(data);
      console.log(data);
      if (filter == 1){
        const filteredData = getMinSunrise(data);
        res.send(filteredData);
      }
      else {
        const filteredData = getMaxSunrise(data);
        res.send(filteredData);
      }

    })();
    

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
