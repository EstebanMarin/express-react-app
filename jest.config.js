module.exports = {
  projects: [
    {
      displayName: "backend",
      testEnvironment: "node",
      testMatch: ["<rootDir>/server/**/*.test.js"],
      setupFilesAfterEnv: ["<rootDir>/testUtils/setupTests.js"],
    },
    {
      displayName: "frontend",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/src/**/*.test.js"],
      moduleFileExtensions: ["js", "json"],
      setupFilesAfterEnv: ["<rootDir>/testUtils/setupTests.js"],
      moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/testUtils/styleMock.js",
      },
    },
  ],
};
