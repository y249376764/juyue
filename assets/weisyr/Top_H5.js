function Top_H5() {
	// 默认值设置
	var height = '110';
	var img = null;
	var arr = null;
	var 本地 = '';

	// 参数分类处理
	var hasArray = false;
	var otherArgs = [];

	// 遍历所有参数进行分类
	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		if (Array.isArray(arg)) {
			arr = arg;
			hasArray = true;
		} else {
			otherArgs.push(arg);
		}
	}

	// 处理非数组参数
	for (var j = 0; j < otherArgs.length; j++) {
		var arg = otherArgs[j];
		// 判断是否是高度参数
		if (typeof arg === 'number' || (typeof arg === 'string' && /^\d+$/.test(arg))) {
			height = String(arg);
		}
		// 判断是否是图片参数
		else if (typeof arg === 'string' && (arg.indexOf('http') === 0 || arg.indexOf('file') === 0)) {
			img = arg;
		}
	}

	// 变量处理
	if (MY_PAGE == 1) {
		// 确保HTML文件存在
		本地 = getPath('hiker://files/rules/dzHouse/html/Top_H5.html');
		if (!fileExist(本地)) {
			var 远程x5 = request('https://cdn.jsdelivr.net/gh/y249376764/juyue@main/assets/weisyr/Top_H5.html');
			writeFile(本地, 远程x5);
		}
		
		// 图片处理
		clearVar('Top_H5定义图');
		clearVar('定义图');
		var finalImg = img || 'https://cdn.jsdelivr.net/gh/y249376764/juyue@main/assets/weisyr/img/TopImg0.png';
		putVar('Top_H5定义图', finalImg);
		let 默认图 =getPath('hiker://files/cache/Top_H5默认图.jpg')
		if(!fileExist(默认图)) {
			downloadFile('https://cdn.jsdelivr.net/gh/y249376764/juyue@main/assets/weisyr/img/TopImg0.png', 默认图);
		}
		if (img) {
			putVar('定义图', 'true');
		} else {
			putVar('定义图', 'false')
		}
		
		//获取更新
		function update() {
			let ln= 'hiker://files/rules/dzHouse/html/';
			let wn= 'https://cdn.jsdelivr.net/gh/y249376764/juyue@main/assets/weisyr/';
			let 远程版 = request(wn + 'Top_H5.json');
			let 本地版 = ln + 'Top_H5.json';
			if (request(本地版) != 远程版) {
				let h5 = request(wn+ 'Top_H5.html');
				writeFile(ln + 'Top_H5.html', h5)
				writeFile(本地版, 远程版);
			}
		}
		update()
	}

	// 创建配置对象
	var Top_H5_Arr = {
		desc: 'list&&' + height,
		url: 本地,
		col_type: 'x5_webview_single',
		extra: {
			ua: MOBILE_UA,
			autoPlay: true,
			imgLongClick: false
		}
	};

	// 处理数组参数
	if (hasArray) {
		arr.push(Top_H5_Arr);
		return arr;
	}
	return Top_H5_Arr;
}