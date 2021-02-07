/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	reporters: ['default'],
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/'],
	modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
	coveragePathIgnorePatterns: ['/tests/'],
	verbose: true,
	transform: {
		...tsjPreset.transform,
	},
	testMatch: ['**/*.test.ts'],
};