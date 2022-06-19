var BASE = {
    /**
     * @description api请求基础路径
     */
    //  http://121.196.44.29:8001/ 预生产
    //  http://121.196.44.29:8999/ 开发
    // http://api.csscmeta.com 生产
    // http://resource.csscmeta.com // 生产图片
    API_DEV: {
      // manager: "http://121.196.44.29:8999",
      manager: " http://121.196.44.29:8999/", // 配置请求路径 DEV
      managerImage: " https://citydemo.oss-cn-shenzhen.aliyuncs.com/"
    },
    API_PROD: {
       // manager: "http://121.196.44.29:8999",
       manager: " http://121.196.44.29:8999/",  // PROD
       managerImage: " https://citydemo.oss-cn-shenzhen.aliyuncs.com/"
    }
  };
