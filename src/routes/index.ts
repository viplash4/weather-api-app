import { Router } from 'express';
import {
    generateCoords,
    multiplePointsFetch,
    getMinSunrise,
    getMaxSunrise,
} from '../controller/sunset.controller';
import Coordinates from '../types/coordinates';
import { SunriseSunsetData } from '../types/sunriseSunsetData';
import { CustomError } from '../middlewares/ErrorHandler';

export const index = Router();

index.get('/ping', async (req, res) => {
    res.send('Server is alive');
});

index.get('/sunsets/random', async (req, res, next) => {
    try {
        const count = Number(req.query.count);
        if (isNaN(count)) {
            throw new CustomError(401, 'must be number');
        }
        const coords: Coordinates[] = generateCoords(count);
        const data: SunriseSunsetData[] = await multiplePointsFetch(coords);
        //console.log(data);
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
index.get('/sunsets/filter', async (req, res) => {
    try {
        const count = Number(req.query.count);
        if (isNaN(count)) {
            throw new Error('count must be number');
        }
        const filter = Number(req.query.filter);
        if (isNaN(filter)) {
            throw new Error('filter must be number');
        }

        const coords: Coordinates[] = generateCoords(count);
        const data: SunriseSunsetData[] = await multiplePointsFetch(coords);
        //console.log(data);
        console.log(data);
        if (filter == 1) {
            const filteredData = getMinSunrise(data);
            res.send(filteredData);
        } else {
            const filteredData = getMaxSunrise(data);
            res.send(filteredData);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
