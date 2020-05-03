module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'max-len': ["error", {"code": 120}],
    semi: [2, "always", {"omitLastInOneLineBlock": true}],
    'function-paren-newline': ["error", "never"],
    "import/prefer-default-export": 0
  },
};
