let timeTool = require('./utils/common.js').timeTool;


exports.baseConfig = {
    baseUrl:"https://sjtest.gz-sanjie.com",
    // baseUrl:"https://mobileqrsmallprog.gz-sanjie.com",
    baseVersion:"test",
    baseParams : {
      shopNo: 'SP16045920',
      appId: 'AP16045920',
      format: 'json',
      deviceType: 'mweb',
      ver: '1.0',
      timestamp:timeTool.getTimestamp()
    },
     privateKey:'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZelxCvUA18U5C2lii93Uxcw1jACA24uWQkHg32bU8GjmMwHLs/jva3fhzJHeTFcMi1ZvR2TP7q5+58I/y1Qkq/BCxqEbMZeB0RRkTLVi7VE4ialfoXJPTjMH6rnpCQPfxmlCyQE+s7qs4S+CyGIGVl84UbuIhR1f6gxcMV56k4phLEV2SmUGTTqEerRf37XRE2HCtQcw7zXaZam3IhRUnFQT5mO8NXROEQZJY0M78m8yUMWnq+F3VuzRqEVA6BYhUO2dwQIgYhiWfKkPQ/gN5DRcu8RzcnecqsOkUqkM/a8vdRgSxxODn11Tl9rAjL0lND+uac31N2FPiO1cvHNrlAgMBAAECggEAdZk0KE8qbCrBdKgpUnWZ7pHhqAHorSWeEO8hrmm6XJsbjaXIaZ9D7ag3PsKqfKEoLADQrDJpimUutiKFqeNiavVJNVdjKCrHmU94ryEH5EHsvKIPSZPmESrBV3tpYmq1kQJU4sA0TKVzvGcnfE8au6zd0vpDeoxX9TOM7YAVpvBmFOaYkYSkFn/iQqitfHiBaC02/THj+m3wmk4aq5e2zscv6sQ/PPoAbSW/UZvGo2BnXQON0JJkIrRCzd7ovkzQNUVFc41P60DTPT6DoLUmMiDCB6DvXxddTroG5lf9MDOyNOoxui9I81cNhiB8dgs2unlMqZp9lB3cpNvFmMy9AQKBgQDlQyonhP6lRwqwr/UvBIylKbFEIZzDywP+G51r+V30flTE+eyvftox5G4qafhwcYUscrdiYir3yI/KAxEIfi3ZsacBitilsQ6bkbfqGFwqqyw/Xrp//60iSADW0i30m8H/UzEFlzB3CHER7qLDZL0sWsXy9ottcn4Zq1USlMcp7QKBgQCrYJWIuKpdg/8iDa3BCbJ4EebxmcBaJjlyk5YBT6aGIxJlLwBqdHwf3WC9a002s6xUNFg++rXiFv8YqSTJ7g9RoynbWWvx8J5+2MksvZqXzGpYR8a/cpUv3wVH43cHL2JVXa/Rm4hyqyfGwMTsbNbIsuknpjHYEloux/cj1IV12QKBgGzqtrklrtCYapS8U3At6h+BKi0jBtXhuhjbx7MHOkKwTddyoKZTTpfLXScbRyMsW0ddjI/Z8W3cQ6uGP25Ye7Hje2L5Mqms7zKrTMOTJR5ESfYlK9cpgXg62uMz4Q9HfCevvydXx3eVdBo/0+WeE11iFo6x4FVzwkKxqe307pWVAoGAWsdXjkubWtvfmo86WcWkNrvs5E94N4iF565LyDgD0ovjY5upEbrQQSTH6K5dATvdbeEoWXv+OlvKFqsKJLiofqr6MgnFByxZGIIG1l8882nBby/eFG1Cn0/4gSL5WuH7qZJt3o8PkQYelMZpyX7BqyAyJuF/B6B5Csy7mcwqQckCgYAbQsABo5Fj0WCWv8jot30diwEE6wqTmjHE1ifJNfiF/G40kDiNb+aJswYF6b0JHFAxuRK0Dna/QG6rm70DN1sUWZdQGlYnM3ffR48YVmlCkutBmcgKTT1xahf3ZGSDuUHVW7AfuYeT0s5B8oGSXpOP0RFH8IczS7TRGGM0Nl+vIQ==',
  }

   /*生产环境*/
  // exports.baseConfig = {
  //   baseUrl:"https://qrcode.zgtsmk.com",
  //   wsUrl:"wss://qrcode.zgtsmk.com",
  //   baseVersion:"prd",
  //   baseParams:{
  //     shopNo: 'ZGZFM2020101615',
  //     appId: 'ZGAPP2020101615',
  //     deviceType: 'mweb',
  //     ver: '1.0',
  //     timestamp:timeTool.getTimestamp()
  //   },
  //   privateKey:'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBYbVZr4tpgxzereHa9IA6foA03q8m+EUd9S1YRUPYqy/gzYAzQE2o1n4OUGtwgK68ykUIqvdwak9s+3FHw1jrnJE32tj+uBOxoHVoeqLJf3+5gpaeLhtkfBB97hM5HXRW3TgjGnhX0PbNvLCokODsI0Z4xh3yCDJzdgShmTwO1OMjmzXuz/drrtlY3zH7XmQ/EiF/BTEitMkslSyYCDoaY5oxDG9lrzGafqqP7sQs5Ndb3C6+xNX8JamgrUBTDh6kemnLKmnXwDZLSok1CLUuPwHOWvl8JTMrn3ooE8utxwjR+VM7uznZ771hrfk6LnhVPVxptzXpMzb7xGRdZJxNAgMBAAECggEATfbMnInvlOxtWUGVSydEA1E48xfMWdPCWd+dFndmcRYjSWjQhNkp9iXz0GWPy122FRsfVe1HsSTLPM7qztntIaCP04sB7T/dgMGGVEcNFlu27N2/R6qjFJIIPB0d1usPGm450b08Q3tV5YBrYKp4Y/ucz9hf/lJbtL0iBNy4n+l0zJZfiXCsn4nZHTaQgUEmo+wvE/Cn4ULhdTu5cBLwkpuAYTLfIvJMR5QEXphBie8V8RTAPuUpgfbtJkKdYg//hCDej27PRYyNNFoNGHKOOMu0G0EHNWOT76aTIHMwh4WkAwqydpzuNfJRULHJKb1S0vaNoXb0KDLoMlClpWz4qQKBgQDohS2nuc+EIxezr024UMKYmT7Cy9hmlFjSZIGPr0jqc1eGzL9xAlN9cq0WCkYclLlpAdFy3R4n2ur5SJ85n4Abs/YaI+LgtFjiKDVRoNi2ILsw1fP2Oxc92P6SWYBSHshabf5RvTXvT+Y87ylF23Rp1U/41Fzq4bYTzPX5Jge9CwKBgQDU6MTozM4qEnupwCCLUkTAYPzeEaTvbs4IuWphUwza1AW11DvwILk1hdsxKo7ItY9JOOYxpMqLact9AC3FPJTCUDhS+8XQXhnFfQW9VsNljFfgyu5csq2jSOBmI+S3Z9SnwbkvLKLQoAGkOnKfYHJadTeoh4fam4ZbgJKKtFfzBwKBgQDIivTRkITWZp3ur+fMbHspuiJTSBUghBoHe//yuS+eZlS7QqRrB6KSs/Fs7PeDdxJi6tqGwwdbQIkg7+3EeTi4rAI6kXEAdQukIyG5gYznqFtKx31ehaCKCzmlZ+Qw77PFqtCKFzMJcFQXgf6K7bf9/6i16BMr0fiEI2aSuKY7+QKBgQC+5xOgFfuJl9cQJvhHU/XXdV9mkvWLxpOxGOe86mWtVMzl863mqsDGsAYQ+LLcXodixUUKIFOIW80cgOuJXb+Y16sZJS2Cns2G2Yoq8j/zrrohEnRV49Rzg2XJz8dFeDEiVj6AgQpf/AhcxBeAtk7yswW79AIpTqhTJV7AReJSQwKBgFqgAv07jhU8NbfxbLqPNjgA/mCM4+TPLB/zFGlhmU1PUcWxLa4AR83iasp9JwRJ1xbVZ4P00eCgdfHoLKWqJHXu1htRXKz0qC5MrVZtRJON0vQ+3gCy/QzNC5Kmzq7EAbsNJWTCRsMbit3gVbf9fbRShew8N9PNMpKXNTEgt5bb',
  // }

  //TODO:  发版需要修改两个文件 project.config.json  sign.js
  // 测试环境appid wxff00655ff8bd00a9  码上出发
  // 生产环境appid wxa44625983b281fec  自贡通云卡


  //sign.js  ==>  privateKey
  
  exports.indexPage = "pages/index/index";
  
  