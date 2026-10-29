// 自托管加载器：只从自己的仓库取代码
let relys = [
    "https://cdn.jsdelivr.net/gh/y249376764/juyue@main/Juyue/",
    "https://fastly.jsdelivr.net/gh/y249376764/juyue@main/Juyue/",
    "https://raw.githubusercontent.com/y249376764/juyue/main/Juyue/",
    "https://gh-proxy.com/https://raw.githubusercontent.com/y249376764/juyue/main/Juyue/",
    "https://ghfast.top/https://raw.githubusercontent.com/y249376764/juyue/main/Juyue/"
];
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}
function getRely() {
    shuffleArray(relys);
    for (let i = 0; i < relys.length; i++) {
        try {
            let content = fetch(relys[i] + 'SrcJu.js', { timeout: 4000 });
            if (content && content.indexOf('nowVersion') > -1) {
                return relys[i] + 'SrcJu.js';
            }
        } catch (e) {}
    }
    return relys[0] + 'SrcJu.js';
}
