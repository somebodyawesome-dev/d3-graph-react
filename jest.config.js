/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/package/src'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/package/tsconfig.test.json' }],
    // d3 v3 micro-packages ship ESM only and must be transpiled for jest
    '^.+\\.(js|mjs)$': ['babel-jest', { presets: [['@babel/preset-env', { targets: { node: 'current' } }]] }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(?:d3-[a-z]+|lodash-es|internmap)/)'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/test/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
};
