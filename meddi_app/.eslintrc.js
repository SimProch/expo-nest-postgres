module.exports = {
  root: true,
  env: {
    "react-native/react-native": true,
  },
  ignorePatterns: [".eslintrc.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "react-native"],
  extends: [
    "plugin:react-native/all",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { ignoreRestSiblings: true, argsIgnorePattern: "^_*" },
        ],
        "react-native/no-raw-text": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { ignoreRestSiblings: true, argsIgnorePattern: "^_*" },
        ],
      },
    },
  ],
};
