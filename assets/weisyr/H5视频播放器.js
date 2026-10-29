function H5视频播放器(arr) {
	var 本地 = getPath('hiker://files/rules/dzHouse/html/短剧.html');
	if (fileExist(本地) == false) {
		var 远程x5 = request('https://cdn.jsdelivr.net/gh/y249376764/juyue@main/assets/weisyr/短剧.html');
		if (远程x5.indexOf("swiper") > 0) {
			writeFile(本地, 远程x5);
		} else {
			confirm({
				title: '❌错误提示',
				content: '播放器导入出错'
			})
		}
	}
	
	let load =['css/swiper-bundle.css', 'js/swiper-bundle.min.js', 'js/jquery.min.js', 'js/hls.min.js'];
	let path= getPath('hiker://files/rules/dzHouse/html/');
	let path_web = 'https://cdn.jsdelivr.net/gh/y249376764/juyue@main/assets/weisyr/';
	load.forEach(it =>{
		if (fileExist(path+it) == false) {
			writeFile(path+it, request(path_web+it))
		}
	})

	//获取更新
	function update() {
		let ln = getPath('hiker://files/rules/dzHouse/html/')
		let wn = 'https://cdn.jsdelivr.net/gh/y249376764/juyue@main/assets/weisyr/';
		let 远程版 = request(wn + 'H5视频播放器.json');
		let 本地版 = ln + 'H5视频播放器.json';
		if (request(本地版) != 远程版) {
			let h5 = request(wn + '短剧.html');
			writeFile(ln + '短剧.html', h5)
			writeFile(本地版, 远程版);
			confirm({
				title: '科兴三针短剧',
				content: '更新成功',
			})
		}
	}
	update()

	arr.push({
		desc: 'float&&100%',
		url: 本地,
		col_type: 'x5_webview_single',
		extra: {
			ua: MOBILE_UA,
			autoPlay: true,
			imgLongClick: false,
		}
	})
}