const path = require('path');
const HardSource = require('hard-source-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const isSourceMapRequired = mode === 'development';

const hardSource = new HardSource({
  cacheDirectory: path.resolve(
    __dirname,
    'node_modules/.cache/hard-source/[confighash]',
  ),
});

const prettier = new PrettierPlugin();

module.exports = [
  {
    // As node.js stand-alone app
    mode: mode,
    devtool: isSourceMapRequired ? 'source-map' : false,
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist/server'),
      filename: `${mode}.[name].js`,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              declaration: true,
              target: 'esnext',
              sourceMap: isSourceMapRequired,
            },
          },
        },
      ],
    },
    plugins: [
      prettier,
      hardSource,
    ],
  },
  {
    // As UMD style package
    mode: mode,
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist/package'),
      filename: `index.js`,
      library: 'sample-library',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              outDir: path.resolve(__dirname, 'dist/package'),
              declaration: true,
              target: 'esnext',
              sourceMap: true,
            },
          },
        },
      ],
    },
    plugins: [
      prettier,
      hardSource,
    ],
  },
  {
    // As client-side JavaScript
    mode: mode,
    devtool: isSourceMapRequired ? 'source-map' : false,
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist/assets'),
      filename: `${mode}.[name].[contenthash].js`,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules|bower_components)/,
          loaders: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                ],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  target: 'esnext',
                  sourceMap: isSourceMapRequired,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      prettier,
      hardSource,
    ],
  },
];
