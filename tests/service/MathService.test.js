const MathService = require('../../service/MathService');

describe('MathService.calculate', () => {

    // Test for valid addition
    test('should add two numbers correctly', async () => {
        const result = await MathService.calculate({a: 5, b: 3}, 'add');
        expect(result.result).toBe(8);
    });

    // Test for valid subtraction
    test('should subtract two numbers correctly', async () => {
        const result = await MathService.calculate({a: 9, b: 4}, 'subtract');
        expect(result.result).toBe(5);
    });

    // Test for invalid operation
    test('should return an error for an invalid operation', async () => {
        await expect(MathService.calculate({a: 5, b: 3}, 'invalid'))
            .rejects.toEqual(expect.objectContaining({
                message: "Invalid operation. Allowed values are 'add', 'subtract', 'multiply', 'divide'.",
                status: 400
            }));
    });

    // Test for division by zero
    test('should return an error when dividing by zero', async () => {
        await expect(MathService.calculate({a: 5, b: 0}, 'divide'))
            .rejects.toEqual(expect.objectContaining({
                message: "Invalid input. Cannot divide by zero.",
                status: 400
            }));
    });

    // Test for non-numeric inputs
    test('should return an error for non-numeric input', async () => {
        await expect(MathService.calculate({a: 'abc', b: 5}, 'add'))
            .rejects.toEqual(expect.objectContaining({
                message: "Invalid input. Both 'a' and 'b' must be numbers.",
                status: 400
            }));
    });
});
