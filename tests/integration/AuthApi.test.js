const request = require('supertest');
const app = require('../../index'); // Adjust path to your app entry point

describe('POST /auth/login', () => {

    // Valid credentials
    test('should return 200 for valid credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'user1', password: 'user1' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    // Invalid credentials
    test('should return 401 for invalid credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'invalidUser', password: 'wrongPassword' });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid username or password.");
    });

    // Missing username
    test('should return 400 when username is missing', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ password: 'user1' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.body should have required property 'username'");
    });

    // Missing password
    test('should return 400 when password is missing', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'user1' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.body should have required property 'password'");
    });

    // Missing both credentials
    test('should return 400 for missing both username and password', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.body should have required property 'username', request.body should have required property 'password'");
    });
});
