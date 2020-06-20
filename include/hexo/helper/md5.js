/**
* MD5 Hash Helper
* @description Calculate the MD5 hash value of a string
* @example
*     <%- md5(data) %>
*/
const crypto = require('crypto');

hexo.extend.helper.register('md5', function (data) {
    return crypto.createHash('md5').update(data).digest("hex");
});