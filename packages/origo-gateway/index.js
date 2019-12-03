/* eslint-disable import/no-extraneous-dependencies */
require('core-js/stable');
require('regenerator-runtime/runtime');
require('@babel/register')({
  rootMode: 'upward',
  presets: [
    [
      '@babel/preset-env',
      {
        // modules: false,
        targets: {
          node: 'current',
        },
      },
    ],
  ],
});
require('./src/index');
