### url-conversion-base64

image url 转换成 base64
image url conversion base64

<a href="https://www.npmjs.com/package/url-conversion-base64"><img src="https://img.shields.io/npm/v/url-conversion-base64.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/url-conversion-base64"><img src="https://img.shields.io/npm/dm/url-conversion-base64.svg?style=flat-square"></a>

### install

```bash
npm install --save url-conversion-base64
```

### use

```js
const urlConversionBase64 = require("url-conversion-base64");

let url = `http://dearzoe.coding.me/blogImg/images/touxiang.jpg`;
//参数 string
async function getImageBase64() {
  let base64 = await urlConversionBase64(url);
  console.log(base64);
}

// 输出 =>
`data:image/png;base64,iVBORw0KG...`;
```
