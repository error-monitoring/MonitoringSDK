module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["ie >= 8", "chrome >= 52"]
        }
      }
    ],
  ],
  plugins: [
    "@babel/plugin-transform-destructuring",
    "babel-plugin-array-includes",
    "@babel/plugin-transform-for-of",
    // ["@babel/plugin-proposal-decorators", { legacy: true }],
    // "@babel/plugin-proposal-function-sent",
    // "@babel/plugin-proposal-export-namespace-from",
    // "@babel/plugin-proposal-numeric-separator",
    // "@babel/plugin-proposal-throw-expressions",
    // "@babel/plugin-syntax-dynamic-import",
    // "@babel/plugin-syntax-import-meta",
    // ["@babel/plugin-proposal-class-properties", { loose: false }],
    // "@babel/plugin-proposal-json-strings"
  ]
};
