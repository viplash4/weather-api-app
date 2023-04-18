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
import authenticateToken from '../middlewares/TokenAuth';

const sunsetRouter = Router();

sunsetRouter.get('/ping', async (req, res, next) => {
    try {
        res.send('Server is alive');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

sunsetRouter.get('/random', authenticateToken, async (req, res, next) => {
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
sunsetRouter.get('/filter', authenticateToken, async (req, res, next) => {
    try {
        const count = Number(req.query.count);
        if (isNaN(count)) {
            throw new CustomError(401, 'count must be number');
        }
        const filter = Number(req.query.filter);
        if (isNaN(filter)) {
            throw new CustomError(401, 'filter must be number');
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
        next(error);
    }
});

export default sunsetRouter;
