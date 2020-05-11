const presets = [
  'module:metro-react-native-babel-preset',
  [
    '@babel/preset-env',
    {
      targets: {
        node: 10,
      },
    },
  ],
];
let plugins = [
  'macros',
  '@babel/plugin-transform-runtime',
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src/'],
      alias: {
        '': './src',
      },
    },
  ],
];

if (process.env.BABEL_ENV === 'dev' || process.env.BABEL_ENV === 'development') {
  plugins = [...plugins, 'functional-hmr'];
} else if (process.env.BABEL_ENV === 'production') {
  plugins = [...plugins, 'transform-remove-console'];
}

module.exports = {
  presets,
  plugins,
};
