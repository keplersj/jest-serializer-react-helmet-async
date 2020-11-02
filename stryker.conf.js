/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const path = require("path");

const jestConfigFile = path.resolve(__dirname, "./jest.config.js");

module.exports = {
  mutate: ["src/**/*.ts?(x)", "!src/**/*@(.test|.spec|Spec).ts?(x)"],
  testRunner: "jest",
  reporters: ["progress", "clear-text", "html"],
  coverageAnalysis: "off",
  jest: {
    projectType: "custom",
    // Only use the unit test project
    config: require(jestConfigFile).projects[0],
    configFile: jestConfigFile,
    enableFindRelatedTests: true,
  },
};
/* eslint-enable unicorn/prevent-abbreviations */
