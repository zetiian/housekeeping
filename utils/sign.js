const jsrsasign = require('./jsrsasign.js')

 function getSign(str) {
//生产
  //  let privateKey = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAK8GvHqp9tNJFrVI9l/xW6PkZ1Gz/u2YdrnmA5Z3dKO0m33+1gNfe9b6PTua6eiJN5d965+d1j/jYoJYakY1iOfXRNcA3I1ZnBxqPCGGYiV1xG2bX1hm9DM3jEa5pvW8Wd4iCiXUGPPqS/FpcsT7al2LMna4FQ2Oc4PFPm6OzflfAgMBAAECgYAwUT++7STCdy7ZpOa+3bZarDcJixMZLDm6YBElfJyqhLVYNv2FuNpLIpG83qssEpVSMOTXD4+R24faS+Yqs6SzRuiwY5aZ5Ocz16gYUm51MpvNJjpMega4nPZzQ1lvZ7XwOBrF4TzKTVtilVSkr70zqGJG6LQqwSWhZiRGhuavYQJBAN6tUB8SltTvHF3aObAXv5VGjYWja5PxJsC6Wxz3GEQAEBJpGafX0L1GzsVODnXy9xtPbB9vQN6diNIGn7FiRuUCQQDJN/CpqAnwXornQQWEIBETXFCwfDZXsVaOt+GgBDdVheWiWXpCSl6htF5X+KZikwd/QS0xbE1RtIzsdX3+6RbzAkAFCfD1Mwt8uAhxSz3g8TihnR4YtxD5IQzacZ0cM6814rZ6ZCxzctvDXLXTGygSnTPgR1TQBUl3gCMXdZTpg6rNAkBI0xUn4ehO9XiiP5cmfZCQiD2v0hS84jLojkZ7ams4abB1dJrZ+R6MucHXZueZD4uME+OuWnsVUhoazl8ebe/fAkAEjfhElucAlNIctcz87DmFEj2T9XxJDOewMdoNCVyhSr6M4fDL8J/pdYssrRJ6spvDDxk6s8/e0fPzVhpqTNtV';
   //测试
   let privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANhmb8QUpNfyLD9SXTUxltC2WgTlKJXmfCzitbi3byKelP861IMAKPdxAs4U/Xl2RP/BwvdCgg2iW5+R4y2HSzql4xLGND2rBI+m4+YEwIYTDleG3ARvIZNbX2aJQo8g93D4SJ3HuaWoHNk3Hs714E3J3MF994mghOgKqhoPR3OXAgMBAAECgYBwSh9e2PN81r5dEUkqbBP9M1JczeiUeCghRnbTZeP2S+G22vkhDPk1BOBWvY+V8mf1ar7XfRxtJL10fMgsfNLspCbWwfkQhTER8eu3/sfkLmYaK+fWb/X0JVIvoPSdCA+QuBIZoioIri7piLaW5/4cfn0aLl7UKcKBlZQaC2JTUQJBAPoINBHSzXJSdr3fYkwXE9qVw42dUGpOdbsRvDGys0IMEvCxRXqRTiN7/P9qZ9y9RSG/tUIpq/FtLDfOWmBJmP8CQQDdkLqMuaVpUjyKJ2/Z/wIVWAfhSoyqKedVSxOBVQ0itAv0w+9HOHmprv39iyNKVM/Y0HJeOp/eRbYWOFY27U1pAkBtdrH1K6kuZ9P8hJPwZBoZFIAsu7a9E+SPJdCSoX3BaK/SGIomgv8Gof29hMQ769EcWWXttXjFldpKBFmk1hPZAkEAg3N0Wj1iN8REiqqvH6S9tbAOrMkv/1zxFJeAMQEm0+oCFeuRMK3+8H8TzbMY8uayka3JzMH3S0YMq84syFWt0QJAdufNOtyKniqpPVMxQ6IzukVfgoZjoGTCzpuY3icbIREWNMCBGBImwnyNyPiWEWvOxQsKjYRMkwESuw+mCiqT1A==';
	let NprivateKey = '-----BEGIN PRIVATE KEY-----' + privateKey + '-----END PRIVATE KEY-----';

	var key = jsrsasign.KEYUTIL.getKey(NprivateKey);
	// 创建 Signature 对象
	let signature = new jsrsasign.KJUR.crypto.Signature({
		alg: "SHA1withRSA"
	});
	// 传入key实例, 初始化signature实例
	signature.init(key);
	// 传入待签明文
	signature.updateString(str);
	// 签名, 得到16进制字符结果
	let a = signature.sign();
	let sign = jsrsasign.hextob64(a);
	// sign = hextob64u(sign);
	return sign;
}
module.exports = {
  getSign
};