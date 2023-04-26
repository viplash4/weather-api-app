import { createUser } from '../controller/users.controller';

import User from '../models/User';

describe('User model', () => {
    beforeAll(async () => {
        await User.sync({ force: true });
    });

    afterAll(async () => {
        await User.drop();
    });

    test('should create a new user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            birthDate: '1990-01-01',
        };

        const user = await createUser(userData);

        expect(user).toMatchObject({
            id: expect.any(Number),
            name: userData.name,
            email: userData.email,
            birthDate: userData.birthDate,
        });
    });
});
