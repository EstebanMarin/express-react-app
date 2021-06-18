export const projects: ({
    displayName: string;
    testEnvironment: string;
    testMatch: string[];
    setupFilesAfterEnv: string[];
    moduleFileExtensions?: undefined;
    moduleNameMapper?: undefined;
} | {
    displayName: string;
    testEnvironment: string;
    testMatch: string[];
    moduleFileExtensions: string[];
    setupFilesAfterEnv: string[];
    moduleNameMapper: {
        "\\.(css|less)$": string;
    };
})[];
