// Rollup configuration for the full build

import noderesolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import buble from "rollup-plugin-buble";
import sourcemaps from "rollup-plugin-sourcemaps";

export default {
  input: "dist/index.js",
  output: [
    {
      file: "dist/utilscesium.iife.js",
      format: "iife",
      sourcemap: true,
      name: "utilscesium",
    },
    {
      file: "dist/utilscesium.esm.js",
      format: "esm",
      sourcemap: true,
      name: "utilscesium",
    },
    {
      file: "dist/utilscesium.cjs.js",
      format: "cjs",
      sourcemap: true,
      name: "utilscesium",
    },
    {
      file: "dist/utilscesium.umd.js",
      format: "umd",
      sourcemap: true,
      name: "utilscesium",
    },
    {
      file: "dist/utilscesium.amd.js",
      format: "amd",
      sourcemap: true,
      name: "utilscesium",
    },
    {
      file: "dist/utilscesium.system.js",
      format: "system",
      sourcemap: true,
      name: "utilscesium",
    },
  ],
  plugins: [
    noderesolve(),
    commonjs(),
    buble(),
    uglify(), //代码压缩
    sourcemaps(),
  ],
};
