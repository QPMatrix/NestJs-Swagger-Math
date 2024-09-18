const AuthService = require('../../service/AuthService');

describe('AuthService.login', () => {

    // Valid credentials
    test('should return a JWT token for valid credentials', async () => {
        const result = await AuthService.login({ username: 'user1', password: 'user1' });
        expect(typeof result.token).toBe('string');
    });

    // Invalid credentials
    test('should return an error for invalid credentials', async () => {
        await expect(AuthService.login({ username: 'invalidUser', password: 'wrongPassword' }))
            .rejects.toEqual({
                message: "Invalid username or password.",
                status: 401
            });
    });

    // Missing username
    test('should return an error when username is missing', async () => {
        await expect(AuthService.login({ password: 'user1' }))
            .rejects.toEqual({
                message: "Invalid input. Both 'username' and 'password' must be provided.",
                status: 400
            });
    });

    // Missing password
    test('should return an error when password is missing', async () => {
        await expect(AuthService.login({ username: 'user1' }))
            .rejects.toEqual({
                message: "Invalid input. Both 'username' and 'password' must be provided.",
                status: 400
            });
    });
});
