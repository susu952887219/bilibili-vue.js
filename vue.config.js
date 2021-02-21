module.exports = {
    configureWebpack: {
      resolve:{
        extensions:[],
        alias:{
            //给路径配置别名
          'assets':'@/assets',
          'common':'@/common',
          'components':'@/components',
          'network':'@/network',
          'views':'@/views',
        }
      }
    }
  }
  