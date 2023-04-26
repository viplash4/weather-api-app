import { createUser } from '../src/controller/users.controller';

import User from '../src/models/User';

describe('User model', () => {
    beforeAll(async () => {
        await User.sync({ force: true });
    });

    afterAll(async () => {
        await User.drop();
    });

    test('should create a new user', async () => {
        const userData = {
            name: 'Soap',
            email: 'soap01@example.com',
            password: 'password',
            birthDate: '1991-01-01',
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
