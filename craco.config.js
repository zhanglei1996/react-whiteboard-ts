const CracoLessPlugin = require('craco-less');
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  webpack:{
    devtool:'source-map',
    alias:{
        "@": resolve('src')
    },
    module: {
      rules: [
        {
          test: /.(gif|svg|jpg|png)$/,
          use: "file-loader",
        }
      ]
    }
},
devServer:{
  proxy: {
      "/api": {
          target: 'http://124.222.247.155:3001',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
      },
  } 
},
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  loaders: [{

  }]
};