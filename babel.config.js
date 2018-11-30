module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["ie >= 8", "chrome >= 52"]
        },
      }
    ]
  ],
  plugins:["babel-plugin-array-includes"]
};
