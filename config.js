let timeTool = require('./utils/common.js').timeTool;


exports.baseConfig = {
    baseUrl:"https://sjtest.gz-sanjie.com",
    baseVersion:"test",
    baseParams : {
      shopNo: 'ST20192102',
      appId: 'STP201902',
      deviceType: 'mweb',
      ver: '1.0',
      timestamp:timeTool.getTimestamp()
    }
  }
   /*生产环境*/
  // exports.baseEV = {
  //   baseUrl:"https://mobileqrh5.gz-sanjie.com:1004/api/service",
  //   baseVersion:"prd"
  //   baseParams : {
    //   shopNo: 'STGJ20200001',
    //   appId: 'STGJP20200002',
    //   deviceType: 'mweb',
    //   ver: '1.0',
    //   timestamp:timeTool.getTimestamp()
  //   }
  // }

  
  exports.indexPage = "pages/index/index";
   /*测试环境*/
  
  