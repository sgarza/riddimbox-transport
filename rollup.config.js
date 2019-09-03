import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import {
  version,
  author,
  name,
  main,
  license,
  description,
  moduleName,
  module as moduleFile
} from "./package.json";

const banner = `\
/**
 * ${name} v${version}
 * ${description}
 *
 * @author ${author}
 * @license ${license}
 * @preserve
 */
`;

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: moduleFile,
        format: "esm",
        sourcemap: true,
        banner
      },
      {
        file: main,
        format: "umd",
        sourcemap: true,
        name: moduleName,
        banner
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**"
      })
    ]
  }
];
