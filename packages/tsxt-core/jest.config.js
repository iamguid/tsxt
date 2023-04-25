/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist", "dist-tests"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        babelConfig: true,
      },
    ],
  },
};
