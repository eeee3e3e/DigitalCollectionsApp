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
      manager: "https://apitest.csscmeta.com", // 配置请求路径 DEV
      // managerImage: "https://citydemo.oss-cn-shenzhen.aliyuncs.com/"
      managerImage: "https://oss.csscmeta.com/"
    },
    API_PROD: {
      //  manager: "http://121.196.44.29:8999",
       manager: "https://apitest.csscmeta.com",  // PROD
      //  managerImage: "https://citydemo.oss-cn-shenzhen.aliyuncs.com/"
       managerImage: "https://oss.csscmeta.com/"
    }
  };
