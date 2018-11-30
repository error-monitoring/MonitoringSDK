module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["ie >= 8", "chrome >= 52"]
        }
      }
    ]
  ]
};
