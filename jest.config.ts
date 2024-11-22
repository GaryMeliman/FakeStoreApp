module.exports = {
    preset: 'react-native',
    transform: {
        '^.+\\.(js)$': ['babel-jest', { plugins: ['babel-plugin-syntax-hermes-parser'] }],
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: [
        "js",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node",
        "android.js",
        "ios.js"
    ],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|react-native-.*|@react-native-community|react-native-safe-area-context|react-native-paper|react-redux|@react-navigation|expo|@expo|react-clone-referenced-element|@unimodules)/)',
    ],
    moduleNameMapper: {
        "^react-native$": "react-native",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
