import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

const jestConfig = async () => {
  const baseConfig = await createJestConfig(config)();
  return {
    ...baseConfig,
    transformIgnorePatterns: ["/node_modules/(?!(next-safe-action))"],
  };
};

export default jestConfig;
