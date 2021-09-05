const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

const variables =  require('./src/variables')

module.exports = {
  outputDir: 'dist', // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
  lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
  transpileDependencies: [
    /* string or regex */
  ], // 是否为生产环境构建生成sourceMap?

  productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  configureWebpack: () => {}, // CSS 相关选项

  // 处理svg
  chainWebpack: config => {
    // 加载svg
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/svg')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
  },

  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        plugins: [
          require('postcss-nested'),
          require('postcss-simple-vars')({ variables }),
          require('postcss-px2rem-exclude')({
            remUnit: 35,
            exclude: /node_modules|folder_name/i
          }),
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false
  },

  pluginOptions: {}
}
