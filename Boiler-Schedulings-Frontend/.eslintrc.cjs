module.exports = {
  root: true,
  env: { browser: true, es2020: true,
    API_KEY: undefined,
    AUTH_DOMAIN: undefined,
    PROJECT_ID: undefined,
    STORAGE_BUCKET: undefined,
    MESSAGING_SENDER_ID: undefined,
    APP_ID: undefined,
    MEASUREMENT_ID: undefined,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
