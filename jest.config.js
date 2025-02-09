module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json', // Ensure your tsconfig has decorators enabled
        },
    },
}
