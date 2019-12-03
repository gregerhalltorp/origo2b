import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
// eslint-disable-next-line import/no-unresolved
import json from '@rollup/plugin-json';
import autoExternal from 'rollup-plugin-auto-external';
import globby from 'globby';
import dashify from 'dashify';
import path from 'path';

export default globby.sync('./src/**/index.js').map(input => {
  const componentName = dashify(path.basename(path.dirname(input)));
  return {
    input,
    output: {
      file: `./dist/${componentName}/index.js`,
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
});
