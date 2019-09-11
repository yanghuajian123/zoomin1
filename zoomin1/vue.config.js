"use strict";
const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("lib", resolve("src/common"))
      .set("com", resolve("src/components"))
      .set("img", resolve("src/images"))
      .set("ser", resolve("src/services"))
      .set("assets", resolve("src/assets"));
  },
  productionSourceMap: true,
  assetsDir: "static",
  devServer: {
    port: 8080
  }
  // baseUrl:'/',
  // devServer:{
  //     host:'localhost',
  //     port:8080,
  //     assetsSubDirectory: 'static',
  //     assetsPublicPath: '/'
  // }
};
console.log(process.env.NODE_ENV);
