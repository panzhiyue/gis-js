/* eslint node/no-unsupported-features/es-syntax: ["error", { ignores: ["modules"] }] */
import pkg from "./package.json";
const external = Object.keys(pkg.dependencies || {});
console.log(external);
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
    plugins: [
    ],
  },
  // Declaration
  {
    input: "src/index.js",
    output: {
      format: "es",
      file: pkg.types
    },
    external,
    plugins: [

    ],
  },
];