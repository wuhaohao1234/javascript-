求字符串长度

function byteLength(str) {
    var num = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i].charCodeAt(i) > 255) {
            num += 2;
        } else {
            num += 1;
        }
    }
    return num;
}