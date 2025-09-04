const { queryGoogle } = require('./google-query');

describe('Google Query Script', () => {
    test('should export queryGoogle function', () => {
        expect(queryGoogle).toBeDefined();
        expect(typeof queryGoogle).toBe('function');
    });

    test('should handle valid search query', (done) => {
        const testQuery = 'test search';
        
        queryGoogle(testQuery, (error, stdout, stderr) => {
            expect(error).toBeNull();
            expect(stdout).toBeDefined();
            expect(typeof stdout).toBe('string');
            done();
        });
    }, 10000);

    test('should handle empty search query', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const exitSpy = jest.spyOn(process, 'exit').mockImplementation();

        queryGoogle('');

        expect(consoleSpy).toHaveBeenCalledWith('Usage: node google-query.js "your search query"');
        expect(exitSpy).toHaveBeenCalledWith(1);

        consoleSpy.mockRestore();
        exitSpy.mockRestore();
    });

    test('should encode special characters in query', (done) => {
        const testQuery = 'test & special chars';
        
        queryGoogle(testQuery, (error, stdout, stderr) => {
            expect(error).toBeNull();
            expect(stdout).toBeDefined();
            done();
        });
    }, 10000);
});