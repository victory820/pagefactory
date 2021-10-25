const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  productionSourceMap: false,
  devServer: {
    headers: {},
    // host: '',
    // port: 8080, // 注意端口统一
    https: false, // 区分项目，区分协议
    hot: true,
    open: true, // 自动打开浏览器
    hotOnly: true // 热更新失败也不要刷新页面
  }
}
