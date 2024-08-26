import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postCSS from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    treeshake: 'smallest',
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      postCSS({
        plugins: [require('autoprefixer')],
      }),
      babel({
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript', // Include TypeScript preset
        ],
      }),

      // { browser: true, dedupe: ['react', 'react-dom'] }

      terser(),
      replace({
        preventAssignment: false,
        'process.env.NODE_ENV': '"production"',
      }),
    ],
    external: [...Object.keys(pkg.peerDependencies || {})],
  },
];
