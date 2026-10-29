// 自托管加载器：只从自己的仓库取代码
let relys = [
    "https://cdn.jsdelivr.net/gh/y249376764/juyue@main/Juying/",
    "https://fastly.jsdelivr.net/gh/y249376764/juyue@main/Juying/",
    "https://raw.githubusercontent.com/y249376764/juyue/main/Juying/",
    "https://gh-proxy.com/https://raw.githubusercontent.com/y249376764/juyue/main/Juying/",
    "https://ghfast.top/https://raw.githubusercontent.com/y249376764/juyue/main/Juying/"
];
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}
function getRely() {
    shuffleArray(relys);
    for (let i = 0; i < relys.length; i++) {
        try {
            let content = fetch(relys[i] + 'SrcJuying.js', { timeout: 4000 });
            if (content && content.indexOf('nowVersion') > -1) {
                return relys[i] + 'SrcJuying.js';
            }
        } catch (e) {}
    }
    return relys[0] + 'SrcJuying.js';
}
