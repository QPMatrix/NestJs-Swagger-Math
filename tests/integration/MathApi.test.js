const request = require('supertest');
const app = require('../../index');
const generateToken = require('../../utils/generate-token');
const validToken = generateToken({username: 'user1'});
const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalidToken";

describe('POST /math/calculate', () => {

    // Test for valid addition
    test('should return 200 and the result for valid addition', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'add')
            .send({a: 5, b: 3});
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(8);
    });

    // Test for large number addition
    test('should handle large numbers correctly for addition', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'add')
            .send({a: 999999999, b: 999999999});
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(1999999998);
    });

    // Test for missing operation header
    test('should return 400 when operation header is missing', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .send({a: 5, b: 3});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.headers should have required property 'operation'");
    });

    // Test for valid subtraction
    test('should return 200 and the result for valid subtraction', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'subtract')
            .send({a: 9, b: 4});
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(5);
    });

    // Test for dividing by zero
    test('should return 400 for division by zero', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'divide')
            .send({a: 5, b: 0});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid input. Cannot divide by zero.");
    });

    // Test for invalid token
    test('should return 401 for invalid JWT token', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${invalidToken}`)
            .set('operation', 'add')
            .send({a: 5, b: 3});
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Invalid or expired token");
    });

    // Test for non-numeric inputs
    test('should return 400 when non-numeric values are passed', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'add')
            .send({a: "foo", b: 5});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.body.a should be number");
    });

    // Test for missing parameters
    test('should return 400 when a parameter is missing', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'add')
            .send({a: 5});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.body should have required property 'b'");
    });

    // Test for invalid operation
    test('should return 400 for an invalid operation', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'invalid_operation')
            .send({a: 5, b: 3});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.headers.operation should be equal to one of the allowed values: add, subtract, multiply, divide");
    });
    // Test for empty body
    test('should return 400 when request body is empty', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'add')
            .send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.body should have required property 'a', request.body should have required property 'b'");
    });
    // Test for invalid JSON format
    test('should return 400 for invalid JSON body', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'add')
            .send('invalid_json');
        expect(res.status).toBe(415);
        expect(res.body.message).toBe("unsupported media type application/x-www-form-urlencoded");
    });
    // Test for missing JWT token
    test('should return 401 when JWT token is missing', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('operation', 'add')
            .send({a: 5, b: 3});
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Authorization header required");
    });
// Test for JWT token without "Bearer" prefix
    test('should return 401 when JWT token is sent without Bearer prefix', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', validToken)  // Missing 'Bearer' prefix
            .set('operation', 'add')
            .send({a: 5, b: 3});
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Authorization header with scheme 'Bearer' required");
    });
// Test for valid subtraction with negative numbers
    test('should return 200 for valid subtraction with negative numbers', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'subtract')
            .send({a: -5, b: 3});
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(-8);
    });
// Test for valid addition with floating-point numbers
    test('should return 200 for valid addition with floating-point numbers', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'add')
            .send({a: 5.5, b: 3.3});
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(8.8);
    });
// Test for case-insensitive operation
    test('should return 200 for case-insensitive operation', async () => {
        const res = await request(app)
            .post('/math/calculate')
            .set('Authorization', `Bearer ${validToken}`)
            .set('operation', 'ADD')  // Uppercase operation
            .send({a: 5, b: 3});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("request.headers.operation should be equal to one of the allowed values: add, subtract, multiply, divide");
    });


});
