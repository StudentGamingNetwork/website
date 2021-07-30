module.exports = {
    globals: {
        "ts-jest": {
            diagnostics: false
        }
    },
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1"
    },
    preset: "ts-jest",
    testEnvironment: "node",
    testRegex: ".*\\.spec\\.[jt]s$"
};
