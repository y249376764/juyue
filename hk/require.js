// 自托管代码入口（只指向自己的仓库）
let list = [
    "https://cdn.jsdelivr.net/gh/y249376764/juyue@main/Juying/SrcJuying.js",
    "https://raw.githubusercontent.com/y249376764/juyue/main/Juying/SrcJuying.js",
    "https://gh-proxy.com/https://raw.githubusercontent.com/y249376764/juyue/main/Juying/SrcJuying.js"
];
let relyfile = "";
for (let i = 0; i < list.length; i++) {
    try {
        if (fileExist('hiker://files/libs/' + md5(list[i]) + '.js')) { relyfile = list[i]; break; }
        let c = request(list[i], { timeout: 4000 });
        if (c && c.indexOf('nowVersion') > -1) { relyfile = list[i]; break; }
    } catch (e) {}
}
