const path = require('path');
const fs = require('fs')
const classPlugin = require('@babel/plugin-proposal-class-properties')
var prod = process.env.NODE_ENV === 'production';
// 写入环境变量
let fd = fs.openSync('./src/common/env.js', 'w');
fs.writeFileSync(fd,`export default  "${process.env.NODE_ENV}";`);
fs.closeSync(fd);

// 生成 project.config.json
let config = fs.readFileSync('./project.config.json')
    config = JSON.parse(config.toString())
    config.appid = prod ? 'wx8b860345f2a1bbfe' : 'wx8b860345f2a1bbfe'
    config = JSON.stringify(config, null, 2)
fs.writeFileSync('./project.config.json', config)
module.exports = {
  wpyExt: '.wpy',
  cliLogs: !prod,
  static: ['static'],
  build: {
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator',
        '@babel/plugin-proposal-class-properties',
      ]
    }
  },
  plugins: [
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'],
    // baseUrl: process.env.NODE_ENV === 'production' ? 'https://baidu.a.com/' : 'https://bing.cn.com/dev/
  }
}

