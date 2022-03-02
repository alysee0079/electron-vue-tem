(function (win) {
    let tfShareConfig = {
      title: "谭飞官方商城",
      desc: "更舒服的职场时装",
      link: "https://malltest.osa.com/mobile/index#/",
      imgUrl: 'https://malltest.osa.com/images/defaultImages/logo%20160X160.png'
    }
    win.tfShareConfig = tfShareConfig;
    win.updateTfShareConfig = function (config) {
      win.tfShareConfig = {
        title: config.title || "谭飞官方商城",
        desc: config.desc || "更舒服的职场时装",
        link: config.link || "https://malltest.osa.com/mobile/index#/",
        imgUrl: config.imgUrl || 'https://malltest.osa.com/images/defaultImages/logo%20160X160.png'
      };
    }
    win.getTfShareConfig = function () {
      return win.tfShareConfig;
    }
  })(window);