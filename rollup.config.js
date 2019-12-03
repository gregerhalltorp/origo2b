const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
// eslint-disable-next-line import/no-unresolved
const json = require('@rollup/plugin-json');
const autoExternal = require('rollup-plugin-auto-external');

module.exports = {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    autoExternal(),
    commonjs({
      namedExports: {
        'apollo-server': ['gql'],
        '@apollo/federation': ['buildFederatedSchema'],
        '@tcne/react-utils/common': ['valueIn'],
        '@tcne/react-utils/server': ['crypto'],
      },
    }),
    resolve({
      preferBuiltins: true,
    }),
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
