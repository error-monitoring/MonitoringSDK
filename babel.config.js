module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["ie >= 6", "chrome >= 52"]
        }
      }
    ]
  ],
  plugins: [
    "babel-plugin-array-includes",
    "@babel/plugin-transform-for-of"
  ]
};
