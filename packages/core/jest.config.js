/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('../../jest.config.base');
const packageJson = require('./package.json');

module.exports = {
  ...base,
  roots: ['<rootDir>'],
  coveragePathIgnorePatterns: [
    ...base.coveragePathIgnorePatterns,
    '<rootDir>/test',
  ],
  name: packageJson.name,
  displayName: packageJson.name,
};
