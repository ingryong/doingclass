// webpack 설정을 추가
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/assets/scss/common.scss";
          `
      }
    }
  }
}
