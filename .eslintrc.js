module.exports = {
  root: true,
  extends: ['@cybozu/eslint-config/presets/node-typescript-prettier'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'import/no-unresolved': 'error',
    'node/no-missing-import': 'off',
  },
};
