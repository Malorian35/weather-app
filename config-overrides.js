module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    fs: false,
  };
  config.plugins = (config.plugins || []).concat([
    new (require('webpack').DefinePlugin)({
      'process.env': JSON.stringify(process.env),
    }),
  ]);
  return config;
};