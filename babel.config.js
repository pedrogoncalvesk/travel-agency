module.exports = api => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["react-native-web", { commonjs: true }]],
  };
};
