const AuthService = require('../../service/AuthService');

describe('AuthService.login', () => {
    test('should return a JWT token as a string', async () => {
        const result = await AuthService.login({ username: 'user1', password: 'user1' });
        expect(typeof result.token).toBe('string');
    });

    test('should return an error for invalid login credentials', async () => {
        await expect(AuthService.login({ username: 'invalid', password: 'invalid' }))
            .rejects.toEqual({
                message: "Invalid username or password.",
                code: 401
            });
    });
});
