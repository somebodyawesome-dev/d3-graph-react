import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postCSS from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';
function injectImport() {
  return {
    name: 'inject-import',
    renderChunk(code) {
      const importStatement = `import './index.css';\n`;
      return importStatement + code;
    },
  };
}
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
      typescript({
        tsconfig: './tsconfig.json',
      }),
      postCSS({
        extract: true,
        minimize: true,
        // modules: false,
        extensions: ['.css'],
        inject: true,
        plugins: [require('tailwindcss'), require('autoprefixer')],
      }),
      injectImport(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript', // Include TypeScript preset
        ],
      }),
      nodeResolve(),
      commonjs(),

      terser(),
      replace({
        preventAssignment: false,
        'process.env.NODE_ENV': '"production"',
      }),
    ],
    external: [...Object.keys(pkg.peerDependencies || {})],
  },
];
