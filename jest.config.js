/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const base = require('./jest.config.base');

// eslint-disable-next-line no-undef
module.exports = {
  ...base,
  projects: ['<rootDir>/packages/core' /*, '<rootDir>/packages/login'*/],
};
