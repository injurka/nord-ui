/* eslint-disable global-require */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.tsx', './src/**/*.test.tsx', './src/__test__']
      }),
      scss({
        output: true,
        failOnError: true,
        outputStyle: 'compressed'
      }),
      postcss({
        plugins: [
          require('cssnano'),
          require('postcss-mixins'),
          require('stylelint'),
          require('postcss-preset-env')
        ]
      }),
      babel({
        presets: ['@babel/preset-react'],
        exclude: ['node_modules/**', 'example/**', 'stories/**']
      }),
      terser()
    ]
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.scss$/],
    plugins: [dts()]
  }
];
