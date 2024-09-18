const MathService = require('../../service/MathService');

describe('MathService.calculate', () => {
    test('should add two numbers', async () => {
        const result = await MathService.calculate({a: 5, b: 4}, 'add');
        expect(result.result).toBe(9);
    });

    test('should return error for invalid operation', async () => {
        await expect(MathService.calculate({a: 5, b: 4}, 'invalid'))
            .rejects.toEqual(
                expect.objectContaining({
                message: "Invalid operation. Allowed values are 'add', 'subtract', 'multiply', 'divide'.",
                code: 400
            }));
    });
    test('should return error when dividing by zero', async () => {
        await expect(MathService.calculate({a: 5, b: 0}, 'divide'))
            .rejects.toEqual(
            expect.objectContaining({
                message: "Invalid input. Cannot divide by zero.",
                code: 400
            })
        );
    });
});
