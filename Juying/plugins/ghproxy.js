// 自托管：不再依赖任何第三方加速源
let MIRRORS = [
    "https://cdn.jsdelivr.net/gh/y249376764/juyue@main/",
    "https://fastly.jsdelivr.net/gh/y249376764/juyue@main/",
    "https://raw.githubusercontent.com/y249376764/juyue/main/",
    "https://gh-proxy.com/https://raw.githubusercontent.com/y249376764/juyue/main/",
    "https://ghfast.top/https://raw.githubusercontent.com/y249376764/juyue/main/"
];
function getProxyUrl() {
    return '';
}
function proxyUrl(url) {
    if (!url) return '';
    let pre = 'https://raw.githubusercontent.com/y249376764/juyue/main/';
    if (url.indexOf(pre) == 0) {
        return MIRRORS[0] + url.substring(pre.length);
    }
    return url;
}
