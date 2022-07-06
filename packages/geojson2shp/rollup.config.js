/* eslint node/no-unsupported-features/es-syntax: ["error", { ignores: ["modules"] }] */
import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs"
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
const external = Object.keys(pkg.dependencies || {});
const extensions = [".ts", ".mjs", ".js", ".json"];
export default [
  // Bundle
  {
    input: "src/index.js",
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
    plugins: [],
  },
  // Declaration
  {
    input: "src/index.js",
    output: {
      format: "iife",
      file: "lib/index.browser.js",
      name: 'geojson2shp', // 此处修改为希望包挂在window上的名称
    },
    external,
    plugins: [
      // externals({
      //   deps: true
      // }),
      // replace({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
      // json(),
      // resolve({
      //   jsnext: true
      // }),
      commonjs(),

      // babel({
      //   babelHelpers: "bundled",
      //   extensions
      // }),
    ],
  },
];