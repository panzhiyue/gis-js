/* eslint node/no-unsupported-features/es-syntax: ["error", { ignores: ["modules"] }] */

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import image from "@rollup/plugin-image";
import pkg from "./package.json";
const extensions = [".ts", ".mjs", ".js", ".json"];


const external = Object.keys(pkg.dependencies || {});
console.log(external);
export default [
  // Bundle
  {
    input: "src/index.ts",
    output: [{
        format: "cjs",
        file: pkg.main,
        exports: "auto",
      },
      {
        format: "es",
        file: pkg.module,
      },

    ],
    external,
    plugins: [
      externals({
        deps: true
      }),
      // replace({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
      json(),
      image(),
      resolve({
        jsnext: true
      }),
      typescript(),
      commonjs(),

      babel(),
    ],
  },
  // Declaration
  {
    input: "src/index.ts",
    output: {
      format: "es",
      file: pkg.types
    },
    external,
    plugins: [
      externals({
        deps: true
      }),
      // replace({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
      json(),
      image(),
      resolve({
        jsnext: true
      }),
      typescript(),
      commonjs(),

      babel({ babelHelpers: "bundled", extensions }),

    ],
  },
];