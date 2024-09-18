const request = require('supertest');
const app = require('../../index'); // Adjust path to your app entry point
const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzI2NjkwNzIwLCJleHAiOjE3MjY2OTE2MjB9.nsf4RwcndgiCDggLXcVqZRM2oc6cKfHMYJFq8AoFfZE"
const token =
describe('POST /math/calculate', () => {

    // Test for successful addition operation
    test('should return 200 and the result for valid addition', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${token}`) // Replace with valid token
            .set('operation', 'add')
            .send({
                a: 5,
                b: 3
            });
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(8);
    });

    // Test for successful subtraction operation
    test('should return 200 and the result for valid subtraction', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${token}`) // Replace with valid token
            .set('operation', 'subtract')
            .send({
                a: 9,
                b: 4
            });
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(5);
    });

    // Test for successful multiplication operation
    test('should return 200 and the result for valid multiplication', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${token}`) // Replace with valid token
            .set('operation', 'multiply')
            .send({
                a: 3,
                b: 7
            });
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(21);
    });

    // Test for successful division operation
    test('should return 200 and the result for valid division', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${token}`) // Replace with valid token
            .set('operation', 'divide')
            .send({
                a: 12,
                b: 4
            });
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(3);
    });

    // Test for division by zero
    test('should return 400 when dividing by zero', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${token}`) // Replace with valid token
            .set('operation', 'divide')
            .send({
                a: 12,
                b: 0
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid input. Cannot divide by zero.");
    });

    // Test for invalid input (non-numeric values)
    test('should return 400 when non-numeric values are provided', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${token}`)
            .set('operation', 'add')
            .send({
                a: 'abc',
                b: 5
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.body.a should be number");
    });


    // Test for missing authorization header
    test('should return 401 when Authorization header is missing', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('operation', 'add')
            .send({
                a: 5,
                b: 3
            });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Authorization header required');
    });

    // Test for invalid JWT token
    test('should return 403 for invalid or expired token', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer <invalid-or-expired-token>`)
            .set('operation', 'add')
            .send({
                a: 5,
                b: 3
            });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid or expired token');
    });


    // Test for invalid operation
    test('should return 400 for invalid operation', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${token}`)
            .set('operation', 'invalid_operation')
            .send({
                a: 5,
                b: 3
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.headers.operation should be equal to one of the allowed values: add, subtract, multiply, divide");
    });


});
