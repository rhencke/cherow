import { readFileSync } from 'fs';
import buble from 'rollup-plugin-buble';

const pkg = JSON.parse( readFileSync( 'package.json', 'utf-8' ) );

export default {
  input: `./build/src/${pkg.name}.js`,
  plugins: [
         buble({exclude: './node_modules/**'}),
  ],
  sourceMap: false,
  name: pkg.name,
  output: [
  {
      file: `./dist/${pkg.name}.js`, format: 'umd',
  },
  {
      file: `./dist/${pkg.name}.mjs`, format: 'es',
  }
  ]
};
