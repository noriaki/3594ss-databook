module.exports = {
  root: true,
  extends: ['@cybozu/eslint-config/presets/node-typescript-prettier'],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '~': './src/',
        },
      },
    },
  },
};
