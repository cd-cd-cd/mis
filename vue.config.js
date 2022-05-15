module.exports={
  transpileDependencies: ['element-ui'],
  // chainWebpack: config => {
  //   // 其他配置
  //   config.entry('main').add('babel-polyfill') // main是入口js文件
  //   // 其他配置
  // },
 devServer:{
    proxy: {
      "/api":{
        target: "http://150.158.130.112:8080",
        changeOrigin: true,
        pathRewrite:{
          '^/api': ""
        }
      }

    }
  }
}