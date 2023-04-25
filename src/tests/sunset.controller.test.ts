import { fetchData } from '../controller/sunset.controller';

describe('fetchData', () => {
    it('should fetch data from sunrise-sunset API', async () => {
        const coord = { latitude: 37.7749, longitude: -122.4194 };
        const data = await fetchData(coord);
        expect(data.sunrise).toBeDefined();
        expect(data.sunset).toBeDefined();
        expect(data.day_length).toBeDefined();
    });
});
