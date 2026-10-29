function header(arr, rule, caseData) {
	var X5二级 = getPath('hiker://files/rules/dzHouse/html/二级X5样式.html');
	if (fileExist(X5二级) == false) {
		var 远程二级 = request('https://cdn.jsdelivr.net/gh/y249376764/juyue@main/assets/weisyr/二级X5样式.html');
		if (远程二级.indexOf("bg_maker") > 0) {
			writeFile(X5二级, 远程二级);
		} else {
			confirm({
				title: '❌错误提示',
				content: '二级样式文件导入出错'
			})
		}
	}
	addListener('onClose', $.toString(() => {
		clearVar('X5二级加载');
		clearVar('二级样式数据');
	}));

	putVar('主题颜色', getItem('主题颜色', '#F4A7B9'))
	/*
	var data = {
		片名: rule.片名 || '',
		图片: rule.图片 || '',
		年份: rule.年份 || '',
		类型: rule.类型 || '',
		状态: rule.状态 || '',
		附加: rule.附加 || '', //里面用<br>换行
	}
	putVar('二级样式数据', data);
*/

	function escapeURL(str) {
	  return str.replace(/&/g, '@AND@').replace(/#/g, '@HASH@')
	}
	let input = escapeURL(JSON.stringify(rule));
	if(!caseData) let caseData={};
	let caseobj;
	try {
		caseobj = escapeURL(JSON.stringify(getCaseData()))
	} catch(e) {
		caseobj= {}
	}
	let height_set = getPath('hiker://files/cache/x5二级高度.json');
	let MaxH = JSON.parse(request(getPath('hiker://files/cache/屏幕高度.json'))||'755')
	let height='list&&'+(Math.ceil(JSON.parse(request(height_set)||'39')/100*MaxH));
	let Arr = [{
		desc: height,
		url: X5二级+"?url="+input+'&case='+caseobj,
		col_type: 'x5_webview_single',
		extra: {
			ua: MOBILE_UA,
			autoPlay: true,
			imgLongClick: false,
			showProgress: false,
			/*
			js: $.toString((rule)=>{
				fba.putVar('二级样式数据', JSON.stringify(rule));
				let ALLPath = fba.parseLazyRule($$$().lazyRule(() => {
					return getPath('hiker://files/');
				}))
				let MaxH = window.screen.height;
				fba.writeFile(ALLPath+'cache/屏幕高度.json', JSON.stringify(MaxH));
			}, rule),
			jsLoadingInject: true,
			*/
			id: 'x5新样式'
		}
	}];
	if (arr) arr.push(Arr[0]);
	return arr || Arr
}