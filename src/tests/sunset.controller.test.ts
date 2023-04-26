import {
    fetchData,
    generateCoords,
    getRandomCoords,
    multiplePointsFetch,
} from '../controller/sunset.controller';

describe('fetchData', () => {
    it('should fetch data from sunrise-sunset API', async () => {
        const coord = { latitude: 37.7749, longitude: -122.4194 };
        const data = await fetchData(coord);
        expect(data.sunrise).toBeDefined();
        expect(data.sunset).toBeDefined();
        expect(data.day_length).toBeDefined();
    });
});
describe('generateCoords', () => {
    it('should return an array of the specified length', () => {
        const length = 5;
        const result = generateCoords(length);
        expect(result.length).toBe(length);
    });
});
describe('getRandomCoords', () => {
    test('returns random coordinates within expected range', () => {
        const result = getRandomCoords();
        expect(result.latitude).toBeGreaterThanOrEqual(-90);
        expect(result.latitude).toBeLessThanOrEqual(90);
        expect(result.longitude).toBeGreaterThanOrEqual(-180);
        expect(result.longitude).toBeLessThanOrEqual(180);
    });
});
describe('multiplePointsFetch', () => {
    test('multiplePointsFetch returns data for all provided coordinates', async () => {
        const coords = [
            { latitude: 40.7128, longitude: -74.006 },
            { latitude: 51.5074, longitude: -0.1278 },
            { latitude: 35.6895, longitude: 139.6917 },
        ];
        const results = await multiplePointsFetch(coords);
        expect(results.length).toBe(coords.length);
        results.forEach((result) => {
            expect(result).toHaveProperty('sunrise');
            expect(result).toHaveProperty('sunset');
        });
    });
});
