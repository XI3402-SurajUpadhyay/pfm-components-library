import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from '@rollup/plugin-json';

import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

export default [
  // browser-friendly UMD build
  // {
  //   input: "src/index.ts",
  //   output: {
  //     name: "pfmComponentsLibrary",
  //     file: pkg.browser,
  //     format: "umd",
  //   },
  //   plugins: [
  //     json(),
  //     resolve(),
  //     commonjs(),
  //     typescript({ tsconfig: "./tsconfig.json" }),
  //   ],
  // },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.ts",
    output: [
      // { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [json(),typescript({ tsconfig: "./tsconfig.json" })],
  },
];

  // "main": "dist/index.cjs.js",
  // "module": "dist/index.esm.js",
  // "browser": "dist/pfm-components-library.umd.min.js",