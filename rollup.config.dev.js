// rollup.config.js

// 解决babel
import babel from 'rollup-plugin-babel';
// 代码压缩
import uglify from 'rollup-plugin-uglify-es'

// 导入modules
import resolve from 'rollup-plugin-node-resolve';

import commonjs from 'rollup-plugin-commonjs';

import builtins from 'rollup-plugin-node-builtins';

import globals from 'rollup-plugin-node-globals';

import replace from 'rollup-plugin-replace';

import obfuscatorPlugin from 'rollup-plugin-javascript-obfuscator';

const getBabelOptions = ({ useESModules }) => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime', { regenerator: false, useESModules }]],
})


export default {
  input: './MonitoringSDK.js',
  // input: './test.js',
  output: {
    file: `./dist/sdk/MonitoringSDK.js`,
    format: 'iife',
    name: "MonitoringSDK",
  },

  plugins: [
    // 注入全局变量
    // replace({
    //   "process.env._keyStr": JSON.stringify(''),
    //   "process.env._Replace_keyStr": JSON.stringify(''),
    // }),
    // 判断环境是否进行代码压缩
    // (process.env.NODE_ENV === 'prod' && uglify()),
    resolve(),
    commonjs(),
    babel(getBabelOptions({ useESModules: true })),
    globals(),
    builtins(),
    // (process.env.NODE_ENV === 'prod' && obfuscatorPlugin({
    //   compact: true,

    // })),
  ]
};