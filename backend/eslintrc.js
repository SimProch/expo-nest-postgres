module.exports = {
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'sonarjs', 'jest', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, argsIgnorePattern: '^_*' },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': 'allow-with-description' },
    ],
    'no-async-promise-executor': 'off',
    '@typescript-eslint/no-floating-promises': ['warn', { ignoreVoid: true }],
    '@typescript-eslint/restrict-template-expressions': [
      'warn',
      {
        allowAny: false,
        allowNullish: false,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      { overrides: { constructors: 'off' } },
    ],
    'no-console': 'error',
    'jest/prefer-expect-assertions': 'off',
    'jest/prefer-comparison-matcher': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-lowercase-title': [
      'error',
      {
        ignore: ['describe'],
      },
    ],
    'jest/consistent-test-it': [
      'error',
      {
        fn: 'it',
        withinDescribe: 'it',
      },
    ],
    'jest/no-focused-tests': 'error',
  },
  overrides: [
    {
      files: ['*.test.ts', '*.controller.ts'],
      rules: {
        'sonarjs/no-identical-functions': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
};
